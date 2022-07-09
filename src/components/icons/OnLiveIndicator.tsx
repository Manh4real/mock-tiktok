import React from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

function OnLiveIndicator({ className, width = 32, height = 32 }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16"
        cy="16"
        r="15.25"
        stroke="url(#paint0_linear)"
        strokeWidth="1.5"
      ></circle>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-13.993466666666668"
          y1="16"
          x2="18.006533333333334"
          y2="43.987"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF1764"></stop>
          <stop offset="1" stopColor="#ED3495"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default OnLiveIndicator;
