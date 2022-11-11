import React, { useEffect, useState } from "react";
import DialogInstruction from "./DialogInstruction";
import ScrollDialog from "./ScrollDialog";

const PopInstruction = () => {
  const [modalState, setModalState] = useState<any>(false);
  const [isInstruction, setInstruction] = useState<any>();

  const a = window.document.getElementById("modalInstruction");

  useEffect(() => {
    setTimeout(() => {
      setInstruction(true);
    }, 5000);
  }, []);

  useEffect(() => {
    a?.click();
  }, [a]);

  console.log("a", a);

  return (
    <>
      {isInstruction && (
        <ScrollDialog
          htmlFor="instruction"
          setModalState={setModalState}
          boothState={undefined}
          dataContent={undefined}
        />
      )}
    </>
  );
};

export default PopInstruction;
