export const getGames = async () => {
  try {
    const res = await fetch("http://43.200.179.173:8080/api/v1/games");

    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);

    if (!res.ok) {
      return {
        error: "game Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }
    const result = await res.json();

    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "game API 요청 실패", errorMessage: err };
  }
};
