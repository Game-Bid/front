export type GameServerNum = {
  id: number;
  name: string;
  active: boolean;
};

export type GameServer = {
  id: number;
  name: string;
  active: boolean;
  gameServerNums?: GameServerNum[];
};

export type Game = {
  id: number;
  name: string;
  iconUrl: string;
  imageUrl: string;
  active: boolean;
  gameServers?: GameServer[];
};

export type GameList = Game[];
