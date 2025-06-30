import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import {
  useAddFinalDesignsMutation,
  useGetActionsListByIDQuery,
  useGetBuildingListQuery,
  useGetLocationListQuery,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useLazyGetLevelsListQuery,
  useLazyGetRoomsListQuery,
  useLazyGetSubBuildingListQuery,
} from "../../redux/api/api";

import { toast } from "react-toastify";
import VentilationElevated from "./ventilation/VentilationElevated";
import VentilationDepot from "./ventilation/VentilationDepot";
import VentilationUnderground from "./ventilation/VentilationUnderground";
import VentilationDataCenter from "./ventilation/VentilationDataCenter";
import VentilationHotel from "./ventilation/VentilationHotel";
import VentilationMall from "./ventilation/VentilationMall";
import VentilationOffice from "./ventilation/VentilationOffice";
import VentilationResidential from "./ventilation/VentilationResidential";
import VentilationSchool from "./ventilation/VentilationSchool";
import DailuxElevated from "./dailux/DailuxElevatedStation";
import DailuxUnderground from "./dailux/DailuxUndergroundStation";
import DailuxDepot from "./dailux/DailuxDepotStation";
import CableElevated from "./cableSizing/CableElevated";
import CableUnderground from "./cableSizing/CableUnderground";
import CableDepot from "./cableSizing/CableDepot";
import CableResidential from "./cableSizing/CableResidential";
import CableOffice from "./cableSizing/CableOffice";
import CableDataCenter from "./cableSizing/CableDataCenter";
import CableHotel from "./cableSizing/CableHotel";
import CableMall from "./cableSizing/CableMall";
import CableSchool from "./cableSizing/CableSchool";
import HeatLoadElevated from "./heatLoad/HeatLoadElevated";
import HeatLoadUnderground from "./heatLoad/HeatLoadUnderground";
import HeatLoadDepot from "./heatLoad/HeatLoadDepot";
import ElectricalPanelElevated from "./equipmentLoad/ElectricalPanelElevated";
import ElectricalPanelUnderground from "./equipmentLoad/ElectricalPanelUnderground";
import ElectricalPanelDepot from "./equipmentLoad/ElectricalPanelDepot";
import ElectricalPanelResidential from "./equipmentLoad/ElectricalPanelResidential";
import ElectricalPanelOffice from "./equipmentLoad/ElectricalPanelOffice";
import ElectricalPanelDataCenter from "./equipmentLoad/ElectricalPanelDataCenter";
import ElectricalPanelHotel from "./equipmentLoad/ElectricalPanelHotel";
import ElectricalPanelMall from "./equipmentLoad/ElectricalPanelMall";
import ElectricalPanelSchool from "./equipmentLoad/ElectricalPanelSchool";
import PlumbingWaterDemandDepot from "./plumbingWaterDemand/PlumbingWaterDemandDepot";
import PlumbingWaterDemandElevated from "./plumbingWaterDemand/PlumbingWaterDemandElevated";
import PlumbingWaterDemandUnderground from "./plumbingWaterDemand/PlumbingWaterDemandUnderground";
import PlumbingWaterDemandResidential from "./plumbingWaterDemand/PlumbingWaterDemandResidential";
import PlumbingWaterDemandOffice from "./plumbingWaterDemand/PlumbingWaterDemandOffice";
import PlumbingWaterDemandDataCenter from "./plumbingWaterDemand/PlumbingWaterDemandDataCenter";
import PlumbingWaterDemandHotel from "./plumbingWaterDemand/PlumbingWaterDemandHotel";
import PlumbingWaterDemandMall from "./plumbingWaterDemand/PlumbingWaterDemandMall";
import PlumbingWaterDemandSchool from "./plumbingWaterDemand/PlumbingWaterDemandSchool";
import DrainageDepot from "./drainagePipeSizing/DrainageDepot";
import DrainageElevated from "./drainagePipeSizing/DrainageElevated";
import DrainageUnderground from "./drainagePipeSizing/DrainageUnderground";
import DrainageResidential from "./drainagePipeSizing/DrainageResidential";
import DrainageOffice from "./drainagePipeSizing/DrainageOffice";
import DrainageDataCenter from "./drainagePipeSizing/DrainageDataCenter";
import DrainageHotel from "./drainagePipeSizing/DrainageHotel";
import DrainageMall from "./drainagePipeSizing/DrainageMall";
import DrainageSchool from "./drainagePipeSizing/DrainageSchool";
import PlumbingHeadlossElevated from "./plumbingHeadLoss/PlumbingHeadlossElevated";
import PlumbingHeadlossUnderground from "./plumbingHeadLoss/PlumbingHeadlossUnderground";
import PlumbingHeadlossDepot from "./plumbingHeadLoss/PlumbingHeadlossDepot";
import PlumbingHeadlossResidential from "./plumbingHeadLoss/PlumbingHeadLossResidential";
import PlumbingHeadlossOffice from "./plumbingHeadLoss/PlumbingHeadLossOffice";
import PlumbingHeadlossDataCenter from "./plumbingHeadLoss/PlumbingHeadLossDataCenter";
import PlumbingHeadlossHotel from "./plumbingHeadLoss/PlumbingHeadLossHotel";
import PlumbingHeadlossMall from "./plumbingHeadLoss/PlumbingHeadLossMall";
import PlumbingHeadlossSchool from "./plumbingHeadLoss/PlumbingHeadLossSchool";
import PlumbingWaterSupplyPipeSizingDepot from "./pumbingWaterSupplyPipeSizing/PlumbingWaterSupplyPipeSizingDepot";
import PlumbingWaterSupplyPipeSizingElevated from "./pumbingWaterSupplyPipeSizing/PlumbingWaterSupplyPipeSizingElevated";
import PlumbingWaterSupplyPipeSizingUnderground from "./pumbingWaterSupplyPipeSizing/PlumbingWaterSupplyPipeSizingUnderground";
import PlumbingWaterSupplyPipeSizingResidential from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingResidential";
import PlumbingWaterSupplyPipeSizingOffice from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingOffice";
import PlumbingWaterSupplyPipeSizingDataCenter from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingDataCenter";
import PlumbingWaterSupplyPipeSizingHotel from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingHotel";
import PlumbingWaterSupplyPipeSizingMall from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingMall";
import PlumbingWaterSupplyPipeSizingSchool from "./pumbingWaterSupplyPipeSizing/PumbingWaterSupplyPipeSizingSchool";
import FireHeadlossElevated from "./FireHeadloss/FireHeadlossElevated";
import FireHeadlossUnderground from "./FireHeadloss/FireHeadlossUnderground";
import FireHeadlossDepot from "./FireHeadloss/FireHeadlossDepot";
import FireHeadlossResidential from "./FireHeadloss/FireHeadlossResidential";
import FireHeadlossOffice from "./FireHeadloss/FireHeadlossOffice";
import FireHeadlossDataCenter from "./FireHeadloss/FireHeadlossDataCenter";
import FireHeadlossHotel from "./FireHeadloss/FireHeadlossHotel";
import FireHeadlossMall from "./FireHeadloss/FireHeadlossMall";
import FireHeadlossSchool from "./FireHeadloss/FireHeadlossSchool";
import PlumbingRainWaterPipeDropDepot from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropDepot";
import PlumbingRainWaterPipeDropElevated from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropElevated";
import PlumbingRainWaterPipeDropUnderground from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropUnderground";
import PlumbingRainWaterPipeDropResidential from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropResidential";
import PlumbingRainWaterPipeDropOffice from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropOffice";
import PlumbingRainWaterPipeDropDataCenter from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropDatacenter";
import PlumbingRainWaterPipeDropHotel from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropHotel";
import PlumbingRainWaterPipeDropMall from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropMall";
import PlumbingRainWaterPipeDropSchool from "./plumbingRainWaterPipeDropping/PlumbingRainWaterPipeDropSchool";
import SeepagePumpSizingUnderground from "./seepagePumpSizing/SeepagePumpSizingUnderground";
import SeepagePumpSizingElevated from "./seepagePumpSizing/SeepagePumpSizingElevated";
import SeepagePumpSizingDepot from "./seepagePumpSizing/SeepagePumpSizingDepot";
import SeepagePumpSizingResidential from "./seepagePumpSizing/SeepagePumpSizingResidential";
import SeepagePumpSizingOffice from "./seepagePumpSizing/SeepagePumpSizingOffice";
import SeepagePumpSizingDataCenter from "./seepagePumpSizing/SeepagePumpSizingDataCenter";
import SeepagePumpSizingHotel from "./seepagePumpSizing/SeepagePumpSizingHotel";
import SeepagePumpSizingMall from "./seepagePumpSizing/SeepagePumpSizingMall";
import SeepagePumpSizingSchool from "./seepagePumpSizing/SeepagePumpSizingSchool";
import PlumbingRWHDepot from "./plumbingRWH/PlumbingRWHDepot";
import PlumbingRWHElevated from "./plumbingRWH/PlumbingRWHElevated";
import PlumbingRWHUnderground from "./plumbingRWH/PlumbingRWHUnderground";
import PlumbingRWHResidential from "./plumbingRWH/PlumbingRWHResidential";
import PlumbingRWHOffice from "./plumbingRWH/PlumbingRWHOffice";
import PlumbingRWHDataCenter from "./plumbingRWH/PlumbingRWHDataCenter";
import PlumbingRWHHotel from "./plumbingRWH/PlumbingRWHHotel";
import PlumbingRWHMall from "./plumbingRWH/PlumbingRWHMall";
import PlumbingRWHSchool from "./plumbingRWH/PlumbingRWHSchool";
import DailuxResidential from "./dailux/DialuxResidential";
import DailuxOffice from "./dailux/DialuxOffice";
import DailuxDataCenter from "./dailux/DialuxDataCenter";
import DailuxHotel from "./dailux/DialuxHotel";
import DailuxMall from "./dailux/DialuxMall";
import DailuxSchool from "./dailux/DialuxSchool";
import HeatLoadResidential from "./heatLoad/HeatLoadResidential";
import HeatLoadOffice from "./heatLoad/HeatLoadOffice";
import HeatLoadDataCenter from "./heatLoad/HeatLoadDataCenter";
import HeatLoadHotel from "./heatLoad/HeatLoadHotel";
import HeatLoadMall from "./heatLoad/HeatLoadMall";
import HeatLoadSchool from "./heatLoad/HeatLoadSchool";

const FinalDesign = () => {
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
  const actionsById = useGetActionsListByIDQuery(
    { sub_service_id: subServiceID },
    { skip: !subServiceID }
  );

  const { data: locationListData } = useGetLocationListQuery({});
  const { data: buildingList } = useGetBuildingListQuery({});
  const [fetchSubBuildings, { data: subBuildingListData }] =
    useLazyGetSubBuildingListQuery();
  // const [fetchLevels, { data: levelsListData }] = useLazyGetLevelsListQuery();
  // const [fetchRooms, { data: roomListData }] = useLazyGetRoomsListQuery();
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedSubBuilding, setSelectedSubBuilding] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [addFinalDesigns] = useAddFinalDesignsMutation();

  const [renderComp, setRenderComp] = useState({
    loaction: false,
    building: false,
    sub_building: false,
    // level: false,
    // room: false,
  });

  const handleRenderCopm = (value: any) => {
    if (value) {
      setRenderComp({
        loaction: true,
        building: true,
        sub_building: false,
        // level: false,
        // room: false,
      });
    }
    // else if (value === "SUB_BUILDING") {
    //   setRenderComp({
    //     loaction: true,
    //     building: true,
    //     sub_building: true,
    //     level: false,
    //     room: false,
    //   });
    // } else if (value === "LEVEL") {
    //   setRenderComp({
    //     loaction: true,
    //     building: true,
    //     sub_building: true,
    //     level: true,
    //     room: false,
    //   });
    // } else if (value === "ROOM") {
    //   setRenderComp({
    //     loaction: true,
    //     building: true,
    //     sub_building: true,
    //     level: true,
    //     room: true,
    //   });
    // }
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

  const actionByIdList = Array.isArray(actionsById?.data?.data)
    ? actionsById.data?.data.map((item: any) => {
        return {
          label: item.name || "Unknown",
          value: item.id,
          calculation_type: item.calculation_type,
        };
      })
    : [];

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

  const subBuildingOptions = Array.isArray(subBuildingListData?.data)
    ? subBuildingListData?.data
        ?.filter((item: any) => item.building_id === selectedBuilding?.value)
        .map((item: any) => ({
          label: item.type || "Unknown",
          value: item.id,
        }))
    : [];

  // const levelsOptions =
  //   levelsListData?.data
  //     ?.filter(
  //       (item: any) => item.sub_building_id === selectedSubBuilding?.value
  //     )
  //     .map((item: any) => ({
  //       label: item.name || "Unknown",
  //       value: item.id,
  //     })) || [];

  // const roomOptions =
  //   roomListData?.data
  //     ?.filter((item: any) => item.level_id === selectedLevel?.value)
  //     .map((item: any) => ({
  //       label: item.name || "Unknown",
  //       value: item.id,
  //     })) || [];

  const action = watch("action");
  const subServiceCheck = watch("sub_service");
  const buildingCheck = watch("building");

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-designs",
      body: {
        service_id: form2Payload?.service?.value,
        sub_service_id: form2Payload?.sub_service?.value,
        action_id: form2Payload?.action?.value,
        location_id: form2Payload?.location?.value,
        building_id: form2Payload?.building?.value,
        ...(selectedSubBuilding?.value && {
          sub_building_id: selectedSubBuilding?.value,
        }),
        ...(selectedLevel?.value && { level_id: selectedLevel?.value }),
        ...(selectedRoom?.value && { room_id: selectedRoom?.value }),
        calculation_type: form2Payload?.action?.calculation_type,
        action_data: data,
      },
    };
    try {
      const resp: any = await addFinalDesigns(payload).unwrap();
      if (resp.status === 3031) {
        toast.success(resp.message);
      }
      reset();
      resetForm_2();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Design Form</h2>
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
                    setValue("action", null);
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
                  onInputChange={(event: any, value: any) => {
                    setValue("sub_service", value);
                    setValue("action", null);
                    handleRenderCopm(null);
                    setValue("building", null);
                    setSelectedBuilding(null);
                  }}
                  disabled={!watch("service")}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="action"
                  options={actionByIdList}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Action"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) => {
                    handleRenderCopm(value?.calculation_type);
                    setValue("action", value);
                    setValue("location", null);
                  }}
                  disabled={!watch("sub_service")}
                />
              </FormControl>
            </Box>

            <Box className="flex gap-4 mb-4 flex-wrap">
              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="location"
                  options={locationOptions}
                  getOptionLabel={(option) =>
                    option?.label
                      ? option.label.replace(/\b\w/g, (char: any) =>
                          char.toUpperCase()
                        )
                      : ""
                  }
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Location"
                  rules={{ required: "This field is required" }}
                />
              </FormControl>
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
                    setSelectedSubBuilding(null);
                    setSelectedLevel(null);
                    setSelectedRoom(null);
                    if (value?.value) {
                      fetchSubBuildings({ building_id: value.value });
                    }
                    setValue("building", value);
                  }}
                />
              </FormControl>
            </Box>

            <Box className="flex justify-start py-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-[20.5rem] h-12"
                disabled={!selectedBuilding}
                // disabled={
                //   action?.calculation_type !== "BUILDING" &&
                //   action?.calculation_type !== "SUB_BUILDING" &&
                //   action?.calculation_type !== "LEVEL" &&
                //   action?.calculation_type !== "ROOM" &&
                //   selectedBuilding?.label !== "Underground Metro Station" &&
                //   selectedBuilding?.label !== "Elevated Metro Station" &&
                //   selectedBuilding?.label !== "Depot"
                // }
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
              <Box className="mb-4 my-4">
                {subServiceCheck?.label === "Lighting" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <DailuxElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <DailuxUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <DailuxDepot />}
                    {buildingCheck?.label === "Residential" && (
                      <DailuxResidential />
                    )}
                    {buildingCheck?.label === "Office" && <DailuxOffice />}
                    {buildingCheck?.label === "Data Center" && (
                      <DailuxDataCenter />
                    )}
                    {buildingCheck?.label === "Hotel" && <DailuxHotel />}
                    {buildingCheck?.label === "Mall" && <DailuxMall />}
                    {buildingCheck?.label === "Academic" && <DailuxSchool />}
                  </>
                )}
                {subServiceCheck?.label === "Equipment" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <ElectricalPanelElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <ElectricalPanelUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && (
                      <ElectricalPanelDepot />
                    )}
                    {buildingCheck?.label === "Residential" && (
                      <ElectricalPanelResidential />
                    )}
                    {buildingCheck?.label === "Office" && (
                      <ElectricalPanelOffice />
                    )}
                    {buildingCheck?.label === "Data Center" && (
                      <ElectricalPanelDataCenter />
                    )}
                    {buildingCheck?.label === "Hotel" && (
                      <ElectricalPanelHotel />
                    )}
                    {buildingCheck?.label === "Mall" && <ElectricalPanelMall />}
                    {buildingCheck?.label === "Academic" && (
                      <ElectricalPanelSchool />
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Ventilation" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <VentilationElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <VentilationUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <VentilationDepot />}
                    {buildingCheck?.label === "Residential" && (
                      <VentilationResidential />
                    )}
                    {buildingCheck?.label === "Office" && <VentilationOffice />}
                    {buildingCheck?.label === "Data Center" && (
                      <VentilationDataCenter />
                    )}
                    {buildingCheck?.label === "Hotel" && <VentilationHotel />}
                    {buildingCheck?.label === "Mall" && <VentilationMall />}
                    {buildingCheck?.label === "Academic" && (
                      <VentilationSchool />
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Containment" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <CableElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <CableUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <CableDepot />}
                    {buildingCheck?.label === "Residential" && (
                      <CableResidential />
                    )}
                    {buildingCheck?.label === "Office" && <CableOffice />}
                    {buildingCheck?.label === "Data Center" && (
                      <CableDataCenter />
                    )}
                    {buildingCheck?.label === "Hotel" && <CableHotel />}
                    {buildingCheck?.label === "Mall" && <CableMall />}
                    {buildingCheck?.label === "Academic" && <CableSchool />}
                  </>
                )}
                {subServiceCheck?.label === "VRF / VRV" && (
                  <>
                    {action?.label === "heat load" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <HeatLoadElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <HeatLoadUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && <HeatLoadDepot />}

                        {buildingCheck?.label === "Residential" && (
                          <HeatLoadResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <HeatLoadOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <HeatLoadDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && <HeatLoadHotel />}
                        {buildingCheck?.label === "Mall" && <HeatLoadMall />}
                        {buildingCheck?.label === "Academic" && (
                          <HeatLoadSchool />
                        )}
                      </>
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Direct Expansion" && (
                  <>
                    {action?.label === "heat load" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <HeatLoadElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <HeatLoadUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && <HeatLoadDepot />}

                        {buildingCheck?.label === "Residential" && (
                          <HeatLoadResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <HeatLoadOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <HeatLoadDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && <HeatLoadHotel />}
                        {buildingCheck?.label === "Mall" && <HeatLoadMall />}
                        {buildingCheck?.label === "Academic" && (
                          <HeatLoadSchool />
                        )}
                      </>
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Chilled Water System" && (
                  <>
                    {action?.label === "heat load" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <HeatLoadElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <HeatLoadUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && <HeatLoadDepot />}

                        {buildingCheck?.label === "Residential" && (
                          <HeatLoadResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <HeatLoadOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <HeatLoadDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && <HeatLoadHotel />}
                        {buildingCheck?.label === "Mall" && <HeatLoadMall />}
                        {buildingCheck?.label === "Academic" && (
                          <HeatLoadSchool />
                        )}
                      </>
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Water Supply" && (
                  <>
                    {action?.label === "plumbing water demand" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <PlumbingWaterDemandElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <PlumbingWaterDemandUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <PlumbingWaterDemandDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <PlumbingWaterDemandResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <PlumbingWaterDemandOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <PlumbingWaterDemandDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <PlumbingWaterDemandHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <PlumbingWaterDemandMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <PlumbingWaterDemandSchool />
                        )}
                      </>
                    )}

                    {action?.label === "head loss calculation" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <PlumbingHeadlossElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <PlumbingHeadlossUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <PlumbingHeadlossDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <PlumbingHeadlossResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <PlumbingHeadlossOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <PlumbingHeadlossDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <PlumbingHeadlossHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <PlumbingHeadlossMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <PlumbingHeadlossSchool />
                        )}
                      </>
                    )}

                    {action?.label === "plumbing water supply pipe sizing" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <PlumbingWaterSupplyPipeSizingElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <PlumbingWaterSupplyPipeSizingUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <PlumbingWaterSupplyPipeSizingDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <PlumbingWaterSupplyPipeSizingResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <PlumbingWaterSupplyPipeSizingOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <PlumbingWaterSupplyPipeSizingDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <PlumbingWaterSupplyPipeSizingHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <PlumbingWaterSupplyPipeSizingMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <PlumbingWaterSupplyPipeSizingSchool />
                        )}
                      </>
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Drainage" && (
                  <>
                    {action?.label === "drainage pipe sizing" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <DrainageElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <DrainageUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && <DrainageDepot />}
                        {buildingCheck?.label === "Residential" && (
                          <DrainageResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <DrainageOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <DrainageDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && <DrainageHotel />}
                        {buildingCheck?.label === "Mall" && <DrainageMall />}
                        {buildingCheck?.label === "Academic" && (
                          <DrainageSchool />
                        )}
                      </>
                    )}

                    {action?.label === "plumbing rainwater pipe drop" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <PlumbingRainWaterPipeDropElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <PlumbingRainWaterPipeDropUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <PlumbingRainWaterPipeDropDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <PlumbingRainWaterPipeDropResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <PlumbingRainWaterPipeDropOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <PlumbingRainWaterPipeDropDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <PlumbingRainWaterPipeDropHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <PlumbingRainWaterPipeDropMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <PlumbingRainWaterPipeDropSchool />
                        )}
                      </>
                    )}

                    {action?.label === "seepage pump sizing underground" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <SeepagePumpSizingElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <SeepagePumpSizingUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <SeepagePumpSizingDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <SeepagePumpSizingResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <SeepagePumpSizingOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <SeepagePumpSizingDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <SeepagePumpSizingHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <SeepagePumpSizingMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <SeepagePumpSizingSchool />
                        )}
                      </>
                    )}

                    {action?.label === "plumbing rwh" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <PlumbingRWHElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <PlumbingRWHUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <PlumbingRWHDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <PlumbingRWHResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <PlumbingRWHOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <PlumbingRWHDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <PlumbingRWHHotel />
                        )}
                        {buildingCheck?.label === "Mall" && <PlumbingRWHMall />}
                        {buildingCheck?.label === "Academic" && (
                          <PlumbingRWHSchool />
                        )}
                      </>
                    )}
                  </>
                )}
                {subServiceCheck?.label === "Hydrant System" && (
                  <>
                    {action?.label === "headloss calculation" && (
                      <>
                        {buildingCheck?.label === "Elevated Metro Station" && (
                          <FireHeadlossElevated />
                        )}
                        {buildingCheck?.label ===
                          "Underground Metro Station" && (
                          <FireHeadlossUnderground />
                        )}
                        {buildingCheck?.label === "Depot" && (
                          <FireHeadlossDepot />
                        )}
                        {buildingCheck?.label === "Residential" && (
                          <FireHeadlossResidential />
                        )}
                        {buildingCheck?.label === "Office" && (
                          <FireHeadlossOffice />
                        )}
                        {buildingCheck?.label === "Data Center" && (
                          <FireHeadlossDataCenter />
                        )}
                        {buildingCheck?.label === "Hotel" && (
                          <FireHeadlossHotel />
                        )}
                        {buildingCheck?.label === "Mall" && (
                          <FireHeadlossMall />
                        )}
                        {buildingCheck?.label === "Academic" && (
                          <FireHeadlossSchool />
                        )}
                      </>
                    )}
                  </>
                )}
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

export default FinalDesign;
