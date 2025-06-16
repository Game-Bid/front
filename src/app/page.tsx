import React from "react";
import Pagination from "@/components/common/Pagination";
import SearchBox from "@/components/main/SearchBox";

const Page = () => {
  return  <div className={'h-full w-screen'}>
    <div className="flex flex-col flex-center  w-full max-w-[1200px] m-auto ">
      <SearchBox />
      <Pagination lastPage={20}/>
    </div>
  </div>;
};

export default Page;
