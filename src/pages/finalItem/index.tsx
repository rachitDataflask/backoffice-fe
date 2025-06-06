import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import RHFTextField from "../../components/RHF/RHFTextField";
import IconButton from "@mui/material/IconButton";
import PlusIcon from "@mui/icons-material/Add"; 
import CloseIcon from "@mui/icons-material/Close";

import {
  useGetBuildingListQuery,
  useGetLocationListQuery,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useLazyGetSubBuildingListQuery,
  useGetItemsListByIDQuery,
  useAddFinalItemMutation,
} from "../../redux/api/api";

import { toast } from "react-toastify";

const FinalItem = () => {
const unitOptionsBySubServiceName: Record<string, { label: string; value: string }[]> = {
  // ─── Electrical ───
  "Lighting":           [{ label: "Watt", value: "Watt" }],
  "Power":       [{ label: "Amp",  value: "Amp"  }],
  "Containment":        [{ label: "Core",   value: "Core"   }],
  "Equipment":        [{ label: "KW",   value: "KW"   }],

  // ─── HVAC ───
  "Chilled Water System": [{ label: "TR", value: "TR" }],
  "VRF / VRV":           [
                           { label: "TR", value: "TR" },
                           { label: "HP", value: "HP" },
                         ],
  "Direct Expansion":     [{ label: "TR", value: "TR" }],
  "Ventilation":   [{ label: "CFM", value: "CFM" }],

  // ─── Fire Fighting ───
  "Hydrant System":       [{ label: "mm", value: "mm" }],
  "Sprinkler System":     [{ label: "mm", value: "mm" }],
  "Fire Extinguisher":    [{ label: "Kg", value: "Kg" }],

  // ─── Plumbing ───
  "Water Supply":         [{ label: "Lpm", value: "Lpm" }],
  "Drainage":      [{ label: "Lpm", value: "Lpm" }],
  "Pump Room Access":     [{ label: "Lpm", value: "Lpm" }],
  "Piping System":        [{ label: "Lpm", value: "Lpm" }],
};
// ↑↑↑ end REPLACEMENT ↑↑↑


    // new state to hold all added capacities
  const [capacities, setCapacities] = useState<number[]>([]);

  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const methods_2 = useForm();
  const {
    formState: { isSubmitting: isSubmitting_2 },
    reset: resetForm_2,
  } = methods_2;
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: subServiceListByID } = useGetSubServiceListByIDQuery(
    { service_id: newSelectedService },
    { skip: !newSelectedService }
  );

  const selectedSubService = watch("sub_service");
  
  const subServiceID = selectedSubService?.value;
   const {
    data: itemsById,
  } = useGetItemsListByIDQuery(
    { sub_service_id: subServiceID },
    { skip: !subServiceID }
  );
  console.log("RAW itemsById:", itemsById);
const itemUnitOptions =
    unitOptionsBySubServiceName[selectedSubService?.label as string] || [];
    console.log("selectedSubService", selectedSubService);
console.log("itemUnitOptions", itemUnitOptions);
console.log("subServiceID:", subServiceID);



  const { data: locationListData } = useGetLocationListQuery({});
  const { data: buildingList } = useGetBuildingListQuery({});
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [addFinalItem] = useAddFinalItemMutation();

  const [renderComp, setRenderComp] = useState({
    location: true,
    building: true,
  });

  const handleRenderCopm = (value: any) => {
    if (value === "BUILDING") {
      setRenderComp({
        location: true,
        building: true,
      });
    }
  };

  const serviceOptions = Array.isArray(serviceList?.data)
    ? serviceList?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const subServiceOptions = Array.isArray(subServiceListByID?.data)
    ? subServiceListByID?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const rawItemsArray = 
   Array.isArray(itemsById?.data)
     ? itemsById.data
     : Array.isArray(itemsById?.data?.data)
     ? itemsById.data.data
     : [];

 const itemByIdList = rawItemsArray.map((item: any) => ({
   label: item.name || "Unknown",
   value: item.id,
   calculation_type: item.calculation_type,
 }));

  const locationOptions = Array.isArray(locationListData?.data)
    ? locationListData?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const buildingOptions = Array.isArray(buildingList?.data)
    ? buildingList?.data?.map((item: any) => ({
        label: item.type || "Unknown",
        value: item.id,
      }))
    : [];

  const item = watch("item");
  const subServiceCheck = watch("sub_service");
  const serviceCheck = watch("service");
  const buildingCheck = watch("building");

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-items",
      body: {
        location_id: form2Payload?.location?.value,
        building_id: form2Payload?.building?.value,
        service_id: form2Payload?.service?.value,
        sub_service_id: form2Payload?.sub_service?.value,
        item_id: form2Payload?.item?.value,
        item_data: {
        ...data,
        capacities: capacities, // add the array here
        },
      },
    };

    try {
      const resp: any = await addFinalItem(payload).unwrap();
      if (resp.status === 200) {
        toast.success("Item added successfully");
        reset();
        resetForm_2();
        setShowSecondForm(false);
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const sections = [
    "Section",
    "Capacities",
    "Item Unit",
    "Measuring Unit",
    "Description",
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Item Form</h2>
      </Box>

      <Box className="h-[70vh] overflow-y-scroll py-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitForm1)}>
            <Box className="flex gap-4 mb-4 flex-wrap">
              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="service"
                  options={serviceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Service"
                  rules={{ required: "This field is required" }}
                  onInputChange={(event: any, value: any) => {
                    setValue("service", value);
                    setValue("sub_service", null);
                    setValue("item", null);
                    setSelectedBuilding(null);
                  }}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="sub_service"
                  options={subServiceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Sub Service"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) => {
                    setValue("sub_service", value);
                    setValue("item", null);
                    handleRenderCopm(null);
                    setValue("building", null);
                    setSelectedBuilding(null);
                  }}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="item"
                  options={itemByIdList}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Item"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) => {
                    handleRenderCopm(value?.calculation_type);
                    setValue("item", value);
                    setValue("location", null);
                  }}
                />
              </FormControl>
            </Box>
            {item && (
              <Box className="flex gap-4 mb-4 flex-wrap">
                {/* {renderComp.location && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="location"
                      options={locationOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Location"
                      rules={{ required: "This field is required" }}
                    />
                  </FormControl>
                )} */}

                {renderComp.building && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="building"
                      value={selectedBuilding || null}
                      options={buildingOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Building"
                      rules={{ required: "This field is required" }}
                      onChange={(event: any, value: any) => {
                        setSelectedBuilding(value || null);
                        if (value?.value) setValue("building", value);
                      }}
                    />
                  </FormControl>
                )}
              </Box>
            )}
            <Box className="flex justify-start py-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-[20.5rem] h-12"
                disabled={!(serviceCheck?.value && subServiceCheck?.value)}
              >
                Next
              </Button>
            </Box>
          </form>
        </FormProvider>

        {showSecondForm && (
          <FormProvider {...methods_2}>
            <form
              className="py-2"
              onSubmit={methods_2.handleSubmit(onSubmitForm2)}
            >
               {/* 2) Hidden “capacities” registration */}
  <input
    type="hidden"
    {...methods_2.register("capacities", {
      validate: () =>
        capacities.length > 0 || "Add at least one capacity before submitting",
    })}
  />
  {methods_2.formState.errors.capacities && (
    <p style={{ color: "red", fontSize: "0.875rem" }}>
     {String(methods_2.formState.errors.capacities.message)}
    </p>
  )}
              <Box className="grid grid-cols-4 gap-4 mb-4">
                <RHFTextField
                  name="Section"
                  type="number"
                  label="Section"
                  rules={{ required: "This field is required" }}
                />
                 {/* ↓↓↓ Capacity with add‐button starts here ↓↓↓ */}
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <RHFTextField
        name="capacityInput"
        type="number"
        label="Capacity"
        
      />
      {/* Add IconButton right next to the input */}
      <IconButton
        size="small"
        color="primary"
        onClick={() => {
          const current = methods_2.getValues("capacityInput");
          if (current !== undefined && current !== null && current !== "") {
            setCapacities((prev) => [...prev, Number(current)]);
            methods_2.setValue("capacityInput", ""); // clear the input
          }
        }}
      >
        <PlusIcon /> {/* or use any “+” icon you import */}
      </IconButton>
    </Box>
    {/* Render all added capacities below the input */}
    {capacities.length > 0 && (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {capacities.map((c, idx) => (
          <Box
            key={idx}
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {c}
            <IconButton
              size="small"
              onClick={() => {
                setCapacities((prev) =>
                  prev.filter((_v, i) => i !== idx)
                );
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    )}
  </Box>
  {/* ↑↑↑ Capacity with add‐button ends here ↑↑↑ */}

               <RHFAutocomplete
  name="Item Unit"
  label="Item Unit"
  options={itemUnitOptions}
  getOptionLabel={(option) => option?.label || ""}
  isOptionEqualToValue={(option: { value: any; }, value: { value: any; }) => option?.value === value?.value}
  rules={{ required: "This field is required" }}
/>


                <RHFTextField
                  name="Measuring Unit"
                  type="number"
                  label="Measuring Unit"
                  rules={{ required: "This field is required" }}
                />
                
              </Box>
              {/* 👇 New row for Description field */}
<Box className="grid grid-cols-4 gap-4 mb-4">
  <RHFTextField
    name="Description"
    type="text"
    label="Description"
    rules={{ required: "This field is required" }}
  />
</Box>
              <Box className="mb-4 my-4">
                <Box className="flex justify-start py-4">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className="w-[20.5rem] h-12"
                    disabled={isSubmitting_2}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </>
  );
};

export default FinalItem;
