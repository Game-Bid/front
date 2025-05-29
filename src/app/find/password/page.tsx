"use client";

import FindPwdForm from "@/components/find/password/FindPwdForm";
import FindPwdResult from "@/components/find/password/FindPwdResult";
import React, { useState } from "react";

const Page = () => {
  const [showResult, setShowResult] = useState(false);

  return (
    <div>
      {!showResult ? (
        <FindPwdForm onSuccess={() => setShowResult(true)} />
      ) : (
        <FindPwdResult />
      )}
    </div>
  );
};

export default Page;
