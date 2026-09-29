const generateRandomString = (length = 32) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
};


export const generateFakeJWT = (username) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    username,
    role: "user",
    iat: now,
    exp: now + 24 * 60 * 60,
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  const signature = generateRandomString(32);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};


export const decodeFakeJWT = (token) => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));

    return payload;
  } catch (error) {
    return null;
  }
};


export const isTokenValid = (token) => {
  const payload = decodeFakeJWT(token);

  if (!payload) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  return payload.exp > currentTime;
};