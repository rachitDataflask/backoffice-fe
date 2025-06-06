import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import {
  useAddFinalProductMutation,
  useGetServiceListQuery,
  useGetLocationListQuery,
  useGetProductSubServiceListQuery,
  useGetProductListQuery,
  useGetManufacturerListQuery,
  useGetProductSubServiceListByIDQuery,
  useGetProductListByIDQuery,
} from "../../redux/api/api";

import { toast } from "react-toastify";
import RHFTextField from "../../components/RHF/RHFTextField";

// import Lighting from "./electrical/Lighting";
// import Power from "./electrical/Power";
// import Cables from "./electrical/Cables";
// import Panels from "./electrical/Panles";
import UPS from "./electrical/Equipment/UPS";
import DB from "./electrical/Equipment/DB";
import DG from "./electrical/Equipment/DG";
// import Fans from "./hvac/Fans";
import Chiller from "./hvac/Chiller";
import AHU from "./hvac/AHU";
// import ODU from "./hvac/ODU";
// import IDU from "./hvac/IDU";
// import Pumps from "./fireFighting/Pumps";
// import Hydrant from "./fireFighting/Hydrant";
// import Sprinkler from "./fireFighting/Sprinkler";
// import FireExtinguisher from "./fireFighting/FireExtinguisher";
// import Drainage from "./plumbing/Drainage";
// import WaterSupply from "./plumbing/WaterSupply";
// import Manufacturer from "../manufacturer";

import Recessed from "./electrical/Lighting/Recessed";
import Batten from "./electrical/Lighting/Batten";
import LED from "./electrical/Lighting/LED";
import Bulkhead from "./electrical/Lighting/Bulkhead";
import Flood from "./electrical/Lighting/Flood";
import Surface from "./electrical/Lighting/Surface";
import Street from "./electrical/Lighting/Street";
import Suspended from "./electrical/Lighting/Suspended";
import Landscape from "./electrical/Lighting/Landscape";
import Floresent from "./electrical/Lighting/Floresent";
import HiBay from "./electrical/Lighting/HiBay";
import LowBay from "./electrical/Lighting/LowBay";
import Solar from "./electrical/Lighting/Solar";
import Tunnel from "./electrical/Lighting/Tunnel";
import Switch from "./electrical/Power Supply/Switch";
import Socket from "./electrical/Power Supply/Socket";
import MDB from "./electrical/Equipment/MDB";
import AMF from "./electrical/Equipment/AMF";
import MLP from "./electrical/Equipment/MLP";
import EPP from "./electrical/Equipment/EPP";
import EMLP from "./electrical/Equipment/EMLP";
import PAP from "./electrical/Equipment/PAP";
import ACDB from "./electrical/Equipment/ACDB";
import FPP from "./electrical/Equipment/FPP";
import WPP from "./electrical/Equipment/WPP";
import GDPanel from "./electrical/Equipment/GDPanel";
import Escalator from "./electrical/Equipment/Escalator";
import XLPE from "./electrical/Containment/XLPE";
import FRLSZH from "./electrical/Containment/FRLSZH";
import LSZH from "./electrical/Containment/LSZH";
import Casset from "./hvac/Casset";
import CSU from "./hvac/CSU";
import FanCoilUnit from "./hvac/FanCoilUnit";
import ODU from "./hvac/ODU";
import AxialFan from "./hvac/AxialFan";
import InLine from "./hvac/InLine";
import Propeller from "./hvac/Propeller";
import Exhaust from "./hvac/Exhaust";
import WaterFireEx from "./fireFighting/WaterFireEx";
import CO2FireEx from "./fireFighting/CO2FireEx";
import ABCFireEx from "./fireFighting/ABCFireEx";

const FinalProduct = () => {
  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const methods_2 = useForm();
  const {
    formState: { isSubmitting: isSubmitting_2 },
    reset: resetForm_2,
  } = methods_2;

  const { data: locationListData } = useGetLocationListQuery({});

  // API Calls
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const serviceId = selectedService?.value;

  const { data: productSubServices } = useGetProductSubServiceListByIDQuery(
    { service_id: serviceId },
    { skip: !serviceId }
  );

  const selectedProductSubService = watch("product_sub_service");
  const productSubServiceId = selectedProductSubService?.value;

  const { data: products } = useGetProductListByIDQuery(
    { product_sub_service_id: productSubServiceId },
    { skip: !productSubServiceId }
  );

  // console.log("Products data:", products);

  const selectedProduct = watch("product");
  const productId = selectedProduct?.value;

  const { data: manufacturers } = useGetManufacturerListQuery(
    { product_id: productId },
    { skip: !productId }
  );

  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [addFinalProduct] = useAddFinalProductMutation();

  const [renderComp, setRenderComp] = useState({
    location: true,
  });

  // Options for dropdowns
  const serviceOptions =
    serviceList?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const productSubServiceOptions =
    productSubServices?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const productOptions =
    products?.data?.map((item: any) => ({
      label: `${item.name} (${item.capacity} ${item.unit})`,
      value: item.id,
    })) || [];

  const manufacturerOptions =
    manufacturers?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const locationOptions = Array.isArray(locationListData?.data)
    ? locationListData?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-products",
      body: {
        service_id: form2Payload?.service?.value,
        product_sub_service_id: form2Payload?.product_sub_service?.value,
        product_id: form2Payload?.product?.value,
        manufacturer_id: form2Payload?.manufacturer?.value,
        product_data: data,
      },
    };

    try {
      const resp: any = await addFinalProduct(payload).unwrap();
      if (resp.status === 200) {
        toast.success("Product added successfully");
        reset();
        resetForm_2();
        setShowSecondForm(false);
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // Reset dependent fields when parent field changes
  const handleServiceChange = (value: any) => {
    setValue("service", value);
    setValue("product_sub_service", null);
    setValue("product", null);
    setValue("manufacturer", null);
  };

  const handleProductSubServiceChange = (value: any) => {
    setValue("product_sub_service", value);
    setValue("product", null);
    setValue("manufacturer", null);
  };

  const handleProductChange = (value: any) => {
    setValue("product", value);
    setValue("manufacturer", null);
  };

  // Render appropriate form fields based on product subservice
  const renderProductFields = () => {
    const productSubService = watch("product_sub_service")?.label;
    // const product = watch("product")?.label;

    const fullLabel = watch("product")?.label;
    const productName = fullLabel?.split("(")[0]?.trim();

    // if (productSubService === "Lighting") {
    //   return <Lighting />;
    // } else if (productSubService === "Power Supply") {
    //   return <Power />;
    // } else if (productSubService === "Containment") {
    //   return <Cables />;
    // } else if (productSubService === "Equipment") {
    //   return <Panels />;
    // } else if (productSubService === "UPS") {
    //   return <UPS />;
    // } else if (productSubService === "DG") {
    //   return <DG />;
    // } else if (productSubService === "DB") {
    //   return <DB />;
    // } else if (productSubService === "Fans") {
    //   return <Fans />;
    // } else if (productSubService === "Chiller") {
    //   return <Chiller />;
    // } else if (productSubService === "AHU") {
    //   return <AHU />;
    // } else if (productSubService === "ODU") {
    //   return <ODU />;
    // } else if (productSubService === "IDU") {
    //   return <IDU />;
    // } else if (productSubService === "Pump Room Accessories") {
    //   return <Pumps />;
    // } else if (productSubService === "Hydrant System") {
    //   return <Hydrant />;
    // } else if (productSubService === "Sprinkler System") {
    //   return <Sprinkler />;
    // } else if (productSubService === "Fire Extinguisher") {
    //   return <FireExtinguisher />;
    // } else if (productSubService === "Water Supply") {
    //   return <WaterSupply />;
    // } else if (productSubService === "Drainage System") {
    //   return <Drainage />;
    // }

    if (productName === "Recessed Light") {
      return <Recessed />;
    } else if (productName === "Batten Light") {
      return <Batten />;
    } else if (productName === "LED Down Light") {
      return <LED />;
    } else if (productName === "Bulkhead Light") {
      return <Bulkhead />;
    } else if (productName === "Flood Light") {
      return <Flood />;
    } else if (productName === "Surface Light") {
      return <Surface />;
    } else if (productName === "Street Light") {
      return <Street />;
    } else if (productName === "Suspended Light") {
      return <Suspended />;
    } else if (productName === "Landscape Light") {
      return <Landscape />;
    } else if (productName === "Floresent Light") {
      return <Floresent />;
    } else if (productName === "High Bay Light") {
      return <HiBay />;
    } else if (productName === "Low Bay Light") {
      return <LowBay />;
    } else if (productName === "Solar Light") {
      return <Solar />;
    } else if (productName === "Tunnel Light") {
      return <Tunnel />;
    } else if (productName === "Switch") {
      return <Switch />;
    } else if (productName === "Socket") {
      return <Socket />;
    } else if (productName === "Distribution Board") {
      return <DB />;
    } else if (productName === "Diesel Generator") {
      return <DG />;
    } else if (productName === "UPS") {
      return <UPS />;
    } else if (productName === "Main Distribution Board") {
      return <MDB />;
    } else if (productName === "AMF") {
      return <AMF />;
    } else if (productName === "Main Lighting Panel") {
      return <MLP />;
    } else if (productName === "Emergency Power Panel") {
      return <EPP />;
    } else if (productName === "Emergency Main Lighting Panel") {
      return <EMLP />;
    } else if (productName === "PAP") {
      return <PAP />;
    } else if (productName === "Air Conditioning Distribution Board") {
      return <ACDB />;
    } else if (productName === "Fire Pump Panel") {
      return <FPP />;
    } else if (productName === "Water Pump Panel") {
      return <WPP />;
    } else if (productName === "DG Panel") {
      return <GDPanel />;
    } else if (productName === "Escalator Panel") {
      return <Escalator />;
    } else if (productName === "XLPE Cable") {
      return <XLPE />;
    } else if (productName === "FRLSZH Cable") {
      return <FRLSZH />;
    } else if (productName === "LSZH Cable") {
      return <LSZH />;
    } else if (productName === "Air Handling Unit") {
      return <AHU />;
    } else if (productName === "Air Cooled Chiller") {
      return <Chiller />;
    } else if (productName === "Water Cooled Chiller") {
      return <Chiller />;
    } else if (productName === "Ceiling Suspended Unit") {
      return <CSU />;
    } else if (productName === "Cassette Type Unit") {
      return <Casset />;
    } else if (productName === "Fan Coil Unit") {
      return <FanCoilUnit />;
    } else if (productName === "Outdoor Unit") {
      return <ODU />;
    } else if (productName === "Axial Fan") {
      return <AxialFan />;
    } else if (productName === "In line Fan") {
      return <InLine />;
    } else if (productName === "Propeller Fan") {
      return <Propeller />;
    } else if (productName === "Exhaust Fan") {
      return <Exhaust />;
    } else if (productName === "Water Type Fire Extinguisher") {
      return <WaterFireEx />;
    } else if (productName === "ABC Type Fire Extinguisher") {
      return <ABCFireEx />;
    } else if (productName === "CO2 Type Fire Extinguisher") {
      return <CO2FireEx />;
    }
    return null;
  };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Product Form</h2>
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
                  onChange={(event: any, value: any) =>
                    handleServiceChange(value)
                  }
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="product_sub_service"
                  options={productSubServiceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Product Sub Service"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) =>
                    handleProductSubServiceChange(value)
                  }
                  disabled={!watch("service")}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="product"
                  options={productOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Product"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) =>
                    handleProductChange(value)
                  }
                  disabled={!watch("product_sub_service")}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="manufacturer"
                  options={manufacturerOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Manufacturer"
                  rules={{ required: "This field is required" }}
                  disabled={!watch("product")}
                />
              </FormControl>
            </Box>
            {manufacturers && (
              <Box className="flex gap-4 mb-4 flex-wrap">
                {renderComp.location && (
                  <FormControl className="w-1/3">
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
                )}
              </Box>
            )}

            <Box className="flex justify-start py-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-[20.5rem] h-12"
                disabled={!watch("manufacturer")}
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
              <Box className="flex gap-4 mb-4 flex-wrap">
                {renderProductFields()}
              </Box>

              <Box className="flex justify-start py-4">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="w-[20.5rem] h-12"
                  disabled={isSubmitting_2 ? true : false}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </>
  );
};

export default FinalProduct;
