import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { IconButton, Slide } from "@mui/material";
import { getAllProduct } from "../api/productApi";
import CloseIcon from "@mui/icons-material/Close";
import CardFeed from "./CardFeed";
import Zoom from "@mui/material/Zoom";
import { TransitionProps } from "@mui/material/transitions";
import AddToCartTable from "./User/AddToCartTable";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      ref={ref}
      {...props}
      direction="up"
      in={props.in}
      mountOnEnter
      unmountOnExit
    />
    // <Zoom
    //   in={true}
    //   // style={{ transitionDelay: true ? "100ms" : "0ms" }}
    //   ref={ref}
    //   {...props}
    // />
  );
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ScrollDialog({
  setModalState,
  htmlFor,
  boothState,
  dataContent,
}: {
  setModalState: any;
  htmlFor: any;
  boothState: any;
  dataContent: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const matches = useMediaQuery("(max-width:425px)");

  const handleClickOpen = () => {
    setOpen(true);
    setModalState(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalState(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button id="modal" sx={{ display: "none" }} onClick={handleClickOpen}>
        Open
      </Button>
      <Button
        id="modalInstruction"
        sx={{ display: "none" }}
        onClick={handleClickOpen}
      >
        Open
      </Button>
      <BootstrapDialog
        TransitionComponent={Transition}
        // fullScreen
        sx={{
          flexWwrap: "wrap",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        // maxWidth={htmlFor === "navBar" ? "xl" : "lg"}
        maxWidth={"xl"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {/* {htmlFor == "instruction" && "Singapore Food Festival - Watch"}
          {htmlFor == "product" && "products"} */}

          {htmlFor === "video" && "video"}
          {htmlFor === "booth" && "booth"}
          {htmlFor === "navBar" && "List of Your Cart"}
        </BootstrapDialogTitle>

        <DialogContent
          sx={{ display: "flex", justifyContent: "center" }}
          dividers={scroll === "paper"}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ display: "inline-grid" }}
          >
            {htmlFor === "navBar" && (
              <>
                <AddToCartTable data={dataContent} />
              </>
            )}

            {htmlFor === "booth" && boothState?.id != 0 && (
              <Stack
                spacing={1}
                sx={{
                  display: " flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  bgcolor: "#f5f5f5",
                }}
              >
                <CardFeed data={boothState?.id} />
              </Stack>
            )}

            {htmlFor === "video" && (
              <iframe
                width={matches ? "100%" : "560"}
                height={matches ? "100%" : "315"}
                src="https://www.youtube.com/embed/0YO89ssEmq4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
