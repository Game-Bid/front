import { IconList } from ".";
import { cn } from "../_utils/clsx";
import ICONS from "./Constants";

type IconProps = {
  icon: IconList;
  className?: string;
  fill?: string;
  stroke?: string;
};

const CustomIcon = ({ icon, className, fill, stroke }: IconProps) => {
  const iconData = ICONS[icon];
  const svgOptions = iconData.svgOptions || {};

  return (
    <svg
      className={cn("fill-current", className)}
      viewBox={svgOptions.viewBox || "0 0 20 20"}
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
      {...svgOptions}
    >
      {iconData.icon}
    </svg>
  );
};

export default CustomIcon;
export type { IconProps };
