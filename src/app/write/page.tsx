"use client";

import React from "react";
import WriteContent from "@/components/write/WriteContent";
import { useGetGames } from "@/hooks/fetcher/game/useGetGames";

const Page = () => {
  const { data } = useGetGames();
  const games = data?.result;

  return <WriteContent games={games} />;
};

export default Page;
