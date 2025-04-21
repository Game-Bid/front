const adjectives = ["멋진", "행복한", "빠른", "귀여운", "조용한"];
const animals = ["호랑이", "고양이", "토끼", "강아지", "펭귄"];

export const generateRandomNickname = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = String(Math.floor(Math.random() * 1000)).padStart(3, "0");

  return `${adj}${animal}${number}`;
};