import React from "react";

// utils
import { fromNow } from "_/config/moment";

interface Props {
  time: number | string;
}

const TimeAgo = ({ time }: Props) => {
  return <span>{fromNow(time)}</span>;
};

export default TimeAgo;
