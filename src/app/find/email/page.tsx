"use client";

import FindIdForm from "@/components/find/email/FindIdForm";
import FindIdResult from "@/components/find/email/FindIdResult";
import React, { useState } from "react";

const Page = () => {
  const [resultVisible, setResultVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "" });

  return (
    <>
      {!resultVisible ? (
        <FindIdForm
          onSuccess={(data) => {
            setUserInfo(data);
            setResultVisible(true);
          }}
        />
      ) : (
        <FindIdResult userInfo={userInfo} />
      )}
    </>
  );
};

export default Page;
