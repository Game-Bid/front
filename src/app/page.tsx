import React from "react";
import Pagination from "@/components/common/Pagination";

const Page = () => {
  return <div className="flex-center h-screen">
    <Pagination lastPage={20}/>
  </div>;
};

export default Page;
