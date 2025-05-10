import { useMediaQuery } from "./useMediaQuery";

export default function useDeviceSize() {
  const isLaptop = useMediaQuery("(max-width:1280px)");
  const isTablet = useMediaQuery("(max-width:768px)");
  const isMobile = useMediaQuery("(max-width:480px)");

  return { isLaptop, isTablet, isMobile };
}
