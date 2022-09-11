import { useLocation } from "react-router";

type LocationState = any;

const useBackgroundLocation = () => {
  const location = useLocation();

  const locationState = location.state as LocationState;
  const backgroundLocation = locationState?.background;

  return { backgroundLocation };
};

export default useBackgroundLocation;
