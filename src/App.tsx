// import {
  // Cube,
  //   Dummy,
  //   Model,
  //   Setup,
  //   SvgMesh,
  //   ThirdPersonCamera,
  //   World,
  //   types,
  //   usePreload,
  //   useWindowSize,
  //   Stats,
  //   DirectionalLight,
  //   Find,
  //   HTML,
  //   useSpring,
  //   Trigger,
  //   Group,
  //   Circle,
  //   Audio,
  //   Editor,

  //   Library,
  //   Toolbar,
  //   SceneGraph,
// } from "lingo3d-react";
import {
  Cube,
  Circle,
  DirectionalLight,
  Dummy,
  Find,
  Group,
  HTML,
  Model,
  Setup,
  Stats,
  SvgMesh,
  ThirdPersonCamera,
  Trigger,
  types,
  usePreload,
  LingoEditor,
  useSpring,
  useWindowSize,
  World,
  Plane
} from "lingo3d-react";

import { useLayoutEffect, useRef, useState } from "react";
import "./App.css";

import { Button, Stack, ThemeProvider } from "@mui/material";

import TouchAppTwoToneIcon from "@mui/icons-material/TouchAppTwoTone";

import PreLoader from "./component/PreLoader";
import ScrollDialog from "./component/ScrollDialog";
import LinearWithValueLabel from "./component/LinearWithValueLabel";
import AudioBcg from "./component/AudioBcg";
import PopInstruction from "./component/PopInstruction";

import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import AllBooth from "./component/World/AllBooth";
// import AddToCartButton from "./component/User/AddToCartButton";

import theme from "./style/theme";
// import {
//   Cube,
//   Circle,
//   DirectionalLight,
//   Dummy,
//   Find,
//   Group,
//   HTML,
//   Model,
//   Setup,
//   Stats,
//   SvgMesh,
//   ThirdPersonCamera,
//   Trigger,
//   types,
//   usePreload,
//   LingoEditor,
//   useSpring,
//   useWindowSize,
//   World,
// } from "lingo3d-react";

const Game = () => {
  const { width } = useWindowSize();
  const dummyRef = useRef<types.Dummy>(null);
  const npcRef = useRef<types.Model>(null);
  const boothRef = useRef<types.Model>(null);

  const [isInstruction, setInstruction] = useState<any>();
  const [running, setRunning] = useState<any>(false);
  const [arrowPosition, setArrowPosition] = useState<any>({ x: 0, y: 0, z: 0 });
  const [mouseOver, setMouseOver] = useState<any>(false);
  const [modalState, setModalState] = useState<any>(false);

  const [isVisible, setVisible] = useState({ state: false, name: "" });
  const [clickedImage, setVideoPlay] = useState<any>(false);

  const [addToCartData, setAddToCartData] = useState<any>();

  const [boothState, setboothState] = useState({ id: 0 });
  const [modal, setModal] = useState(false);
  const [htmlFor, setHtmlFor] = useState<any>();
  const [navBar, setNavBar] = useState<any>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [positionPlayerX, setPositionPlayerX] = useState<any>();
  const [positionPlayerZ, setPositionPlayerZ] = useState<any>();

  const x = searchParams.get("x");
  const z = searchParams.get("z");

  const camX = mouseOver ? 50 : 70;
  const camY = mouseOver ? 90 : 90;
  const camZ = mouseOver ? 200 : 150;

  const xSpring = useSpring({ to: camX, bounce: 0 });
  const ySpring = useSpring({ to: camY, bounce: 0 });
  const zSpring = useSpring({ to: camZ, bounce: 0 });

  //Get value of URL from ENV
  const viteBaseUrl = import.meta.env.VITE_BASE_URL
  //console.log(viteBaseUrl)
  //player movement
  const handleClick = (e: types.MouseEvent) => {
    const dummy = dummyRef.current;
    if (!dummy) return;

    setArrowPosition(e.point);
    dummy.lookTo(e.point.x, undefined, e.point.z, 0.1);
    dummy.moveTo(e.point.x, undefined, e.point.z, 14);
    setRunning(true);

    dummy.onMoveToEnd = () => {
      setRunning(false);
    };
  };

  //Modal control from child com Booth
  const sendDataToParentBooth = (index: any) => {
    if (index?.id != null) {
      setboothState(index);
    }

    if (index?.htmlFor == "navBar") {
      setboothState({ id: 0 });
      setHtmlFor("");

      setAddToCartData(index?.data);
      setNavBar(true);
    }

    setModal(true);
  };

  //Video play when click
  // const loadVideoTexture = (index: any) => {
  //   if(index)
  // } 


  //modal logic
  useLayoutEffect(() => {
    if (modal && mouseOver) {
      const a = window.document.getElementById("modal");
      a?.click();

      setMouseOver(false);
    }

    if (!mouseOver) {
      setModal(false);
    }
  }, [modal, mouseOver]);

  // map player
  useLayoutEffect(() => {
    setPositionPlayerX(x);
    setPositionPlayerZ(z);
  }, [x, z]);

  // console.log("boothRef", boothRef);

  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "white",
          margin: 2,
          zIndex: 1000,

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: " center",
        }}
      >
         {/* <AudioBcg />  */}
        {/* <PopInstruction /> */}
        {/*<AddToCartButton sendDataToParent={sendDataToParentBooth} />*/}
      </Stack>

      <ScrollDialog
        setModalState={setModalState}
        boothState={boothState}
        dataContent={addToCartData}
        htmlFor={
          htmlFor == "video"
            ? "video"
            : boothState?.id > 0
            ? "booth"
            : navBar
            ? "navBar"
            : null
        }
      />

      <World>
        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        <Stats /> 
        <Setup
          //SSAA = bestquality(hit GPU)
          //SMAA = care performace
          // antiAlias="SSAA"

          defaultLightScale={0.4}
          // skybox="skyBox/sky.jpg"
          pixelRatio={5}
        />
        <Model
          ref={boothRef}
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={10}
          scaleY={20}
          scaleZ={20}
          // y={2516.33}
          x={-20145.77}
          y={492.05}
          scale={10}
          src="maps/boothsample-v1.glb"
        />
        <Model
          toon
          src="sky/sky4.glb"
          x={-2956.9}
          z={1.0}
          y={14655.96}
          scale={200.0}
          physics="map"
          animations={{ idle: "sky/sky4.glb" }}
          animation="clouds2_lambert1_0Action"
        ></Model>
        <Model
          // toon
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          // y={2516.33}
          y={2078.72}
          scale={70}
          // original
          // src="maps/cartoonlowpoly14.glb"
          src="maps/tunnel2.glb"
          animation="Object_48Action.002"
          onClick={handleClick}
        />

        {/* 
        ***TV PANEL  difference Z = 1,518.1
        */}
        <Plane
        name="tvkiri01"
        x={-410.94}
        y={191.46}
        z={6074.82}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        // texture={`${viteBaseUrl}img/1SingaporeFoodFestival2022.png`}
        // videoTexture={`${viteBaseUrl}video/1SingaporeFoodFestival2022.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri01" ? "video/1SingaporeFoodFestival2022.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/1SingaporeFoodFestival2022.png" : "img/1SingaporeFoodFestival2022.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri01");
        // }}

        />
        <Plane
        name="tvkiri02"
        x={-410.94}
        y={191.46}
        z={4554.72}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/3Iloomination.png`}
        // videoTexture={`${viteBaseUrl}video/3Iloomination.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri02" ? "video/3Iloomination.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/3Iloomination.png" : "img/3Iloomination.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri02");
        // }}
        />

        <Plane
        name="tvkiri03"
        x={-410.94}
        y={191.46}
        z={3029.62}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/5Curiography.png`}
        // videoTexture={`${viteBaseUrl}video/5Curiography.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri03" ? "video/5Curiography.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/5Curiography.png" : "img/5Curiography.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri03");
        // }}
        />

        <Plane
        name="tvkiri04"
        x={-410.94}
        y={191.46}
        z={1510.52}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/7StarPropertyAwards.png`}
        // videoTexture={`${viteBaseUrl}video/7StarPropertyAwards.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri04" ? "video/7StarPropertyAwards.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/7StarPropertyAwards.png" : "img/7StarPropertyAwards.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri04");
        // }}
        />

        <Plane
        name="tvkiri05"
        x={-410.94}
        y={191.46}
        z={162.42}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/9InternationalConference.png`}
        // videoTexture={`${viteBaseUrl}video/9InternationalConference.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri05" ? "video/9InternationalConference.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/9InternationalConference.png" : "img/9InternationalConference.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri05");
        // }}
        />

        <Plane
        name="tvkiri06"
        x={-410.94}
        y={191.46}
        z={-1360.49}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/11VirtualStationery.png`}
        // videoTexture={`${viteBaseUrl}video/11VirtualStationery.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri06" ? "video/11VirtualStationery.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/11VirtualStationery.png" : "img/11VirtualStationery.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri06");
        // }}
        />
        

        <Plane
        name="tvkiri07"
        x={-410.94}
        y={191.46}
        z={-2880.91}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/13VirtualPhotography.png`}
        // videoTexture={`${viteBaseUrl}video/13VirtualPhotography.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri07" ? "video/13VirtualPhotography.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/13VirtualPhotography.png" : "img/13VirtualPhotography.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri07");
        // }}
        />

        <Plane
        name="tvkiri08"
        x={-410.94}
        y={191.46}
        z={-4404.53}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/15HorizonSquare.png`}
        // videoTexture={`${viteBaseUrl}video/15HorizonSquare.mp4`}  

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri08" ? "video/15HorizonSquare.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/15HorizonSquare.png" : "img/15HorizonSquare.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri08");
        // }}
        />

        <Plane
        name="tvkiri09"
        x={-410.94}
        y={191.46}
        z={-5923.44}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={20}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/17MemeBistroBar.png`}
        // videoTexture={`${viteBaseUrl}video/17MemeBistroBar.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkiri09" ? "video/17MemeBistroBar.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/17MemeBistroBar.png" : "img/17MemeBistroBar.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkiri09");
        // }}
        />

        <Plane
        name="tvkanan01"
        x={735.63}
        y={189.62}
        z={5315.74}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-19.70}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        // texture={`${viteBaseUrl}img/2VirtualPhD.png`}
        videoTexture={`${viteBaseUrl}video/2VirtualPhD.mp4`}

        // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan01" ? "video/2VirtualPhD.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/2VirtualPhD.png" : "img/2VirtualPhD.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan01");
        // }}
        />

        <Plane
        name="tvkanan02"
        x={735.63}
        y={189.62}
        z={3795.46}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/4BYD.png`}
        // videoTexture={`${viteBaseUrl}video/4BYD.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan02" ? "video/4BYD.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/4BYD.png" : "img/4BYD.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan02");
        // }}
        />

        <Plane
        name="tvkanan03"
        x={735.63}
        y={189.62}
        z={2270.09}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/6Environmental.png`}
        // videoTexture={`${viteBaseUrl}video/6Environmental.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan03" ? "video/6Environmental.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/6Environmental.png" : "img/6Environmental.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan03");
        // }}
        />

        <Plane
        name="tvkanan04"
        x={735.63}
        y={189.62}
        z={751.29}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/8SabahVirtualTravelFair.png`}
        // videoTexture={`${viteBaseUrl}video/8SabahVirtualTravelFair.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan04" ? "video/8SabahVirtualTravelFair.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/8SabahVirtualTravelFair.png" : "img/8SabahVirtualTravelFair.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan04");
        // }}
        />

        <Plane
        name="tvkanan05"
        x={735.63}
        y={189.62}
        z={-598.72}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/10VirtualSalesdrMCT.png`}
        // videoTexture={`${viteBaseUrl}video/10VirtualSalesdrMCT.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan05" ? "video/10VirtualSalesdrMCT.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/10VirtualSalesdrMCT.png" : "img/10VirtualSalesdrMCT.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan05");
        // }}
        />

        <Plane
        name="tvkanan06"
        x={735.63}
        y={189.62}
        z={-2117.39}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/12EdenVirtualWorld.png`}
        // videoTexture={`${viteBaseUrl}video/12EdenVirtualWorld.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan06" ? "video/12EdenVirtualWorld.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/12EdenVirtualWorld.png" : "img/12EdenVirtualWorld.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan06");
        // }}
        />

        <Plane
        name="tvkanan07"
        x={735.63}
        y={189.62}
        z={-3642.65}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/14VirtualAngelica.png`}
        // videoTexture={`${viteBaseUrl}video/14VirtualAngelica.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan07" ? "video/14VirtualAngelica.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/14VirtualAngelica.png" : "img/14VirtualAngelica.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan07");
        // }}
        />

      <Plane
        name="tvkanan08"
        x={735.63}
        y={189.62}
        z={-5162.10}
        scaleX={5.73}
        scaleY={3.72}
        rotationY={-20.00}
        // normalScale={{ isVector2: true | 1 | "isVector" }}
        texture={`${viteBaseUrl}img/16VirtualBazaar.png`}
        // videoTexture={`${viteBaseUrl}video/16VirtualBazaar.mp4`}

         // videoTexture={
        //   isVisible?.state == true && isVisible?.name == "tvkanan08" ? "video/16VirtualBazaar.mp4" : null
        // }

        // texture={
        //   isVisible?.state == false ? "img/16VirtualBazaar.png" : "img/16VirtualBazaar.png"
        // }

        // onClick={(e) => {
        //   movePlayer(e, "tvkanan08");
        // }}
        />


         {/* 
        *** End of TV PANEL 
        */}

        <ThirdPersonCamera
          mouseControl={modal && !mouseOver ? false : "drag"}
          active={modal ? false : true}
          lockTargetRotation={false}
          fov={width < 640 ? 110 : 90}
          enableDamping
          innerY={90}
          innerZ={150}
          innerX={70}
          y={100}
          // near={0.01}
          zoom={1}
        >
          <Dummy
            id="player"
            name="player"
            ref={dummyRef}
            scale={3.8}
            src="3dCharacter/back/character.fbx"
            physics="character"
            animations={{
              idle: "3dCharacter/back/BreathingIdle.fbx",
              running: "3dCharacter/back/Running.fbx",
            }}
            animation={running ? "running" : "idle"}
            width={50}
            depth={50}
            // x={positionPlayerX ? positionPlayerX : 0}
            // z={positionPlayerZ ? positionPlayerZ : 0}
            rotationY={180.00}
            //area booth
            // x={-20420.6}
            // y={221.11}
            // z={3651.88}

            //area center
            // x={50}
            // y={194.31}
            // z={50}

            x={0}
            y={221.79}
            z={6693.23}
          />
          {/* <DirectionalLight intensity={0.4} color="white"></DirectionalLight> */}
        </ThirdPersonCamera>
        {running && (
          <SvgMesh
            width={72.99}
            height={100}
            depth={100}
            scaleX={-0.82}
            scaleZ={0.19}
            src="arrow.svg"
            color="#ff4e4e"
            x={arrowPosition.x}
            y={arrowPosition.y + 50}
            z={arrowPosition.z}
            animation={{
              rotationY: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            }}
          />
        )}

        <Group
          //area booth
          x={-20876.51}
          y={152.77}
          z={4501.97}

          //area sff house
          // x={-2400.25}
          // y={1.61}
          // z={5611.74}
        >
          <Circle
            x={-2400.25}
            y={1.61}
            z={5611.74}
            rotationX={270.0}
            scale={2.0}
            opacity={mouseOver ? 1 : 0}
            color={mouseOver ? "#ff0000" : "transparent"}
            normalScale={{ x: 1, y: 1 }}
            innerVisible={true}
          />
          <Trigger
            targetIds="player"
            radius={500}
            onEnter={() => {
              setMouseOver(true);
            }}
            onExit={() => {
              setMouseOver(false);
            }}
          />
        </Group>

        <Model
          ref={npcRef}
          src="npc/npc1.glb"
          physics="character"
          outline={mouseOver}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          scale={3.8}
          rotationY={180.0}
          //area booth
          x={-20876.51}
          y={152.77}
          z={4501.97}
          //center
          // x={-2462.69}
          // y={193.35}
          // z={6111.53}
          animation="Armature|mixamo.com|Layer0"
        >
          <Find
            name="Cube.001"
            onMouseOver={() => {
              setMouseOver(true);
              setboothState({ id: 0 });
              setHtmlFor("video");
            }}
            onMouseOut={() => {
              setMouseOver(false);
              setHtmlFor("");
            }}
            onClick={() => {
              setModal(true);
            }}
          >

          <Find
            name="tvkiri01"
            onClick={() => {
              setVideoPlay(true);
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

        {/* <Cube
          x={-3136.47}
          y={632.18}
          z={-1524.66}
          mass={10}
          physics={"map"}
          slippery={true}
          scale={20.0}
        /> */}

        <AllBooth sendDataToParent={sendDataToParentBooth} />
      </World>
    </>
  );
};

const Loader = () => {
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;
  const [isGameWorld, setGameWorld] = useState(false);
  const mobileVersion = window.matchMedia("(max-width: 425px)");
  const progress = usePreload(
    [
      "sky/sky4.glb",

      "booth/booth1.glb",
      "booth/booth2.glb",
      "booth/booth3.glb",

      "maps/cartoonlowpoly14.glb",

      "npc/npc1.glb",

      "3dCharacter/back/character.fbx",
      "3dCharacter/back/BreathingIdle.fbx",
      "3dCharacter/back/Running.fbx",

      "skyBox/sky.jpg",
    ],
    300000
  );

  return (
    <>
      {progress < 100 && !isGameWorld && (
        <>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={"preloader/aloaderMobile.png"} />
            <LinearWithValueLabel valueItem={Math.round(progress)} />
          </Stack>
        </>
      )}

      {progress == 100 && !isGameWorld && (
        <>
          <Stack sx={{ alignItems: "center" }}>
            <img
              style={{
                position: "relative",
                left: "-1%",
                maxWidth: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                setGameWorld(true);
              }}
              src={
                mobileVersion
                  ? "preloader/preNoticMobile.png"
                  : "preloader/preNotic.png"
              }
            />
            <Button
              sx={{
                mt: 1,
                fontSize: "x-large",
                width: "initial",
              }}
              variant="contained"
              size="large"
              onClick={() => {
                setGameWorld(true);
              }}
            >
              Continue
            </Button>
          </Stack>
        </>
      )}

      {isGameWorld && (
        <>
          <BrowserRouter basename={`/${viteBaseUrl}`}>
            <div className="pt-20">
              <Routes>
                <Route path={`/`} element={<Game />} />
              </Routes>
            </div>
          </BrowserRouter>
        </>
      )}
    </>
  );
};

const App = () => {
  const [isDisableVideo, setVideo] = useState(false);
  const [isDisablePreLoader, setPreLoaderVideo] = useState(true);

  const hanldeVideo = () => {
    setVideo(true);
    setPreLoaderVideo(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-white bg-black"
          style={{ backgroundImage: `url(preloader/preloaderbg.jpg)` }}
        >
          {isDisablePreLoader ? (
            <PreLoader hanldeVideo={hanldeVideo} />
          ) : (
            isDisableVideo == true && <Loader />
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
