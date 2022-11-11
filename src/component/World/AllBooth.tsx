import { Button } from "@mui/material";
import { Find, Group, HTML, Model } from "lingo3d-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ScrollDialog from "../ScrollDialog";
import TouchAppTwoToneIcon from "@mui/icons-material/TouchAppTwoTone";

const AllBooth = ({ sendDataToParent }: { sendDataToParent: any }) => {
  const [mouseOver, setMouseOver] = useState<any>(false);
  const [open, setOpen] = useState(false);
  const [boothState, setboothState] = useState({ id: 0 });
  const [modalState, setModalState] = useState<any>(false);

  useEffect(() => {
    if (open && mouseOver) {
      const a = window.document.getElementById("modal");
      a?.click();
      setMouseOver(false);
    }

    if (!mouseOver) {
      setOpen(false);
    }
  }, [open, mouseOver, boothState]);

  return (
    <>
      <Group x={-19723.33} z={3087.87}>
        <Model
          name="booth1"
          src="booth/booth1.glb"
          physics="map"
          scale={5}
          rotationY={180.0}
          y={239.7}
          z={-744.87}
        ></Model>

        <Model
          name="booth1"
          src="booth/booth1.glb"
          physics="map"
          scale={5}
          rotationY={180.0}
          x={21.91}
          y={215.7}
          z={2875.6}
        ></Model>

        <Model
          name="booth1+"
          src="booth/booth1.glb"
          physics="map"
          scale={5}
          rotationY={180.0}
          x={0.0}
          y={226.62}
          z={55.96}
        ></Model>

        <Model
          name="booth3"
          src="booth/booth3.glb"
          physics="map"
          scale={5}
          rotationY={180.0}
          y={240.09}
          x={346.54}
          z={1316.34}
        ></Model>
      </Group>

      <Model
        name="booth2"
        src="booth/booth2.glb"
        physics="map"
        scale={5}
        rotationY={180.0}
        y={210.24}
        z={5287.29}
        x={-19485.42}
      >
        <Find
          name="G-__579423.001"
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}
          onClick={() => {
            setOpen(true);
            // setBoothId({ id: 1 });
            sendDataToParent({ id: 1 });
          }}
        >
          {mouseOver && (
            <HTML>
              <div>
                <Button
                  sx={{
                    color: "white",
                    px: 1,
                    background: " rgba( 255, 255, 255, 0.25 )",
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur( 4px )",
                    borderRadius: "10px",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                  }}
                  variant="text"
                  size="small"
                  endIcon={<TouchAppTwoToneIcon />}
                >
                  Click
                </Button>
              </div>
            </HTML>
          )}
        </Find>
      </Model>
    </>
  );
};

export default AllBooth;
