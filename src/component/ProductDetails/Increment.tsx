import { ButtonGroup, Button } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

const Increment = (props: string | FieldHookConfig<any>) => {
  const [field, , helpers] = useField(props);

  const { value } = field;
  const { setValue } = helpers;
  return (
    <ButtonGroup
      size="large"
      variant="text"
      color="inherit"
      sx={{ border: "1px solid", borderColor: "grey.400" }}
    >
      <Button
        key="three"
        disabled={value <= 1}
        onClick={() => setValue(value - 1)}
        sx={{ pr: 0.75, pl: 0.75, minWidth: "0px !important" }}
      >
        <RemoveIcon fontSize="inherit" />
      </Button>
      <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
        {value}
      </Button>
      <Button
        key="one"
        onClick={() => setValue(value + 1)}
        sx={{ pl: 0.75, pr: 0.75, minWidth: "0px !important" }}
      >
        <AddIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
};

export default Increment;
