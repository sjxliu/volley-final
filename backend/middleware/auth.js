import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jAuth = token.length < 500;
    let decoded;

    if (token && jAuth) {
      decoded = jwt.verify(token, "testing");

      req.userId = decoded?.id;
    } else {
      decoded = jwt.decode(token);
      req.userId = decoded?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
