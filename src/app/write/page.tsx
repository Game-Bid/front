"use client";

import React from "react";
import WriteContent from "@/components/write/WriteContent";
import { useGetGames } from "@/hooks/fetcher/game/useGetGames";

const Page = () => {
  const { data, error } = useGetGames();
  const games = data?.result;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <WriteContent games={games} />;
};

export default Page;
