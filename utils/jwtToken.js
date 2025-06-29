export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const days = parseInt(process.env.COOKIE_EXPIRE.replace("d", ""));

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // or true if always using HTTPS
      sameSite: "None",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
