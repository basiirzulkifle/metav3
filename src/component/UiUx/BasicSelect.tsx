import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

const BasicSelect = ({
  data,
  errors,
  sendDataToParent,
}: {
  data: any;
  errors: any;
  sendDataToParent: any;
}) => {
  const [age, setAge] = React.useState("");
  const [deliveryDate, setDeliveryDate] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);

    const objToPost = { delivery_date: deliveryDate, id: event.target.value };

    sendDataToParent(objToPost as object);
  };

  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Check Availablity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Check Availablity"
          onChange={handleChange}
        >
          {data?.map((item: any, index: any) => {
            return (
              <MenuItem
                key={index}
                value={item?.id}
                onClick={() => {
                  setDeliveryDate(item?.delivery_date);
                }}
              >
                {item?.delivery_date}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Typography
        variant="caption"
        sx={{
          color: "red",
          position: " relative",
          top: "10%",
        }}
      >
        {errors?.delivery_schedule_id}
      </Typography>
    </>
  );
};
export default BasicSelect;
