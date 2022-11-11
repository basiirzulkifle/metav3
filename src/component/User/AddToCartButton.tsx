import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { getAddToCartByUserId } from "../../api/productApi";
import { Stack } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const AddToCartButton = ({ sendDataToParent }: { sendDataToParent: any }) => {
  const [totalAddToCartNumber, setAddToCartNumber] = useState<any>();

  const [mouseOver, setMouseOver] = useState<any>(false);
  const [open, setOpen] = useState(false);
  const [boothState, setboothState] = useState({ id: 0 });
  const [modalState, setModalState] = useState<any>(false);

  const refreshApi = () => {
    getAddToCartByUserId(1).then((res: any) => {
      if (res?.data != null) {
        setAddToCartNumber(res);
      }
    });
  };

  useEffect(() => {
    if (open) {
      const a = window.document.getElementById("modal");
      a?.click();
    }

    if (!mouseOver) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (totalAddToCartNumber == null) {
      refreshApi();
    }
  }, [totalAddToCartNumber]);

  return (
    <>
      {" "}
      <Stack>
        <Button
          id="buttonAddToCartRefresh"
          onClick={refreshApi}
          sx={{
            display: "none",
          }}
        >
          {" "}
        </Button>
        <IconButton
          onClick={() => {
            setOpen(true);
            sendDataToParent({
              htmlFor: "navBar",
              data: totalAddToCartNumber?.data,
            });
          }}
          aria-label="cart"
          sx={{
            color: "#fff",
            margin: 2,
            zIndex: 1000,
            bgcolor: "#ff6f00",
          }}
        >
          <StyledBadge
            badgeContent={totalAddToCartNumber?.data?.length}
            color="secondary"
          >
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Stack>
    </>
  );
};

export default AddToCartButton;
