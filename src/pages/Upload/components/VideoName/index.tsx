import clsx from "clsx";
import { BiCheckCircle } from "react-icons/bi";

// styles
import styles from "../../Upload.module.scss";

const VideoName = ({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) => {
  return (
    <div className={clsx("flex-space-between", styles["video__title"])}>
      <div className={clsx("flex-align-center", "text-overflow-elipse")}>
        <span
          className={clsx("flex-center")}
          style={{ marginRight: 3, fontSize: 16, fill: "currentcolor" }}
        >
          <BiCheckCircle />
        </span>
        <span className={clsx("text-overflow-elipse")}>{content}</span>
      </div>
      <span
        className="hover-underlined"
        style={{
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
          marginLeft: 10,
        }}
        onClick={() => {
          onClick();
        }}
      >
        Change video
      </span>
    </div>
  );
};

export default VideoName;
