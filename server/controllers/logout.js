const logout = async (req, res, next) => {
  res.clearCookie("connect.sid", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.status(200).json({
    message: "Logout successful",
    status: true
  });
};

export default logout;