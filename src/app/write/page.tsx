// "use client";

import React from "react";
import WriteContent from "@/components/write/WriteContent";
import { getGames } from "@/utils/games/getGames";
const Page = async () => {
  // const res = await fetch(`http://localhost:3000/api/games`, {
  //   cache: "force-cache",
  // });
  // const { result: games } = await res.json();

  const { result: games } = await getGames();

  return <WriteContent games={games} />;
};

export default Page;
