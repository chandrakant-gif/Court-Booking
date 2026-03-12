import jwt from "jsonwebtoken";

const generateToken = (_id,email,role) => {
  const accessToken = jwt.sign(
    {
      id: _id,
      email: email,
      role: role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
  return accessToken;
}

export default generateToken;