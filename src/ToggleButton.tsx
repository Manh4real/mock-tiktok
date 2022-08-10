import React from "react";
import { useLoginContext } from "./contexts/AppContext";

function ToggleButton() {
  const { setIsLoggedIn } = useLoginContext();

  return (
    <button
      onClick={() => setIsLoggedIn((prev) => !prev)}
      style={{ position: "fixed", top: "5px", left: "5px", zIndex: 999 }}
    >
      Toggle
    </button>
  );
}

export default ToggleButton;
