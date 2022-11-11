import React from "react";
import { Button, Stack, useMediaQuery } from "@mui/material";

const PreLoader = ({ hanldeVideo }: { hanldeVideo: any }) => {
  const matches = useMediaQuery("(max-width:425px)");

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: " center",
          alignItems: "center",
        }}
      >
        <video
          style={{
            objectFit: matches ? "contain" : "cover",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
          }}
          playsInline
          autoPlay
          muted
          loop
        >
          <source
            src="https://i-smart.com.sg/media/video_DF4CD5BF_FE06_521E_41E1_6D638FF0C353_en.mp4"
            type="video/mp4"
          />
        </video>
        <Button
          sx={{ mt: "70vh" }}
          variant="contained"
          size="medium"
          onClick={() => {
            hanldeVideo();
          }}
        >
          Skip Video
        </Button>
      </Stack>
    </>
  );
};

export default PreLoader;
