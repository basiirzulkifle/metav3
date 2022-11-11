import React, { useEffect, useState, useLayoutEffect } from "react";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";

const AudioBcg = () => {
  var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const audio = document.getElementById("playAudio") as HTMLAudioElement | null;

  const [isAudio, setAudio] = useState<any>(true);

  useLayoutEffect(() => {
    if (!isAudio) audio?.pause();
    if (isAudio) audio?.play();
  }, [isAudio]);

  return (
    <>
      <audio
        autoPlay
        controls
        loop
        style={{ position: "relative", zIndex: "100", display: "none" }}
        id="playAudio"
      >
        <source src="audio/bcg.mp3" />
      </audio>
      <Button
        sx={{
          color: "white",
        }}
        variant="text"
        startIcon={isAudio ? <MusicOffIcon /> : <MusicNoteIcon />}
        onClick={() => {
          isAudio ? setAudio(false) : setAudio(true);
        }}
      >
        {isAudio ? "Off Music" : "On Music"}
      </Button>
    </>
  );
};

export default AudioBcg;
