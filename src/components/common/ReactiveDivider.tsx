import VerticalDivider from "@/components/common/VerticalDivider";
import Divider from "@/components/my-page/sideMenu/Divider";
import {cn} from "@/_utils/clsx";

interface ReactiveDividerProps {
    verticalClassName?: string;
    horizontalClassName?: string;
}

const ReactiveDivider = ({verticalClassName, horizontalClassName}: ReactiveDividerProps) => {
    return <>
        <div className="block lg:hidden">
            <VerticalDivider className={verticalClassName}/>
        </div>
        <div className={cn('hidden lg:block', horizontalClassName)}>
            <Divider/>
        </div>
    </>
};

export default ReactiveDivider;