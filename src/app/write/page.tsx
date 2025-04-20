"use client";

import React from "react";
import WriteContent from "@/components/write/WriteContent";
import { useGames } from "@/hooks/fetcher/game/getGames";

const Page = () => {
  const { data, error } = useGames();
  const games = data?.result;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <WriteContent games={games} />;
};

export default Page;
