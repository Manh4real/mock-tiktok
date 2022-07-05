import React from "react";

// icons
import { FiMoreVertical } from "react-icons/fi";

// components
import Popper from "_/components/Popper";
import CustomButton from "_/components/CustomButton";

// variables
import { INCOMMON_MENU_LIST } from "./constants";

const More = () => {
  return (
    <Popper menu={INCOMMON_MENU_LIST}>
      <CustomButton unset>
        <FiMoreVertical />
      </CustomButton>
    </Popper>
  );
};

export default More;
