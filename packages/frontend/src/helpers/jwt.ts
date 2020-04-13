interface JwtObject {
  jwt: object;
  expire: number;
}

export const checkTokenValid = (jwtObj: JwtObject) => {
  const now = new Date().getTime();
  if (!jwtObj || !jwtObj.jwt || !jwtObj.expire || now > jwtObj.expire) {
    return false;
  }
  return true;
};
