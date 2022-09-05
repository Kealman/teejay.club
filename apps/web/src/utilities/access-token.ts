export function extractAccessToken(cookie = "") {
  const accessToken = cookie
    .split("; ")
    .map((cookie) => cookie.split("="))
    .find((cookie) => cookie[0] === "accessToken")?.[1];
  return accessToken;
}
