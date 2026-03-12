import jwt from "jsonwebtoken";

const resetToken = (email) => {
  const resetToken = jwt.sign(
    {email},
    process.env.RESET_TOKEN_SECRET,
    {expiresIn: "10m"}

  );
  return resetToken
}
export default resetToken;