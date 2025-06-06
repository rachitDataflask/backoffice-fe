import { FormControl } from "@mui/material";
import RHFTextField from "../../../../components/RHF/RHFTextField";

const HiBay = () => {
  return (
    <>
      <FormControl className="w-1/4">
        <RHFTextField
          name="model_number"
          label="Model Number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="voltage"
          label="Voltage (V)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="wattage"
          label="Wattage (W)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="lamp_type"
          label="Lamp Type"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="ip_rating_afo"
          label="IP Rating (AFO)"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="ip_rating_mos"
          label="IP Rating (MOS)"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="ik_rating"
          label="IK Rating"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="cri"
          label="Color Rendering Index (CRI)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="lumens_per_watt"
          label="Lumens per Watt"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="lamp_lifetime"
          label="Lamp Lifetime (Hours)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="compliance_standards"
          label="Compliance with Standards"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="price"
          label="Price (₹)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default HiBay;
