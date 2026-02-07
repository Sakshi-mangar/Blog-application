// const jwt = require("jsonwebtoken");
// const authMiddleware = async(req, res, next) => {
//   try {
//     const authheader =req.headers.Authorization
//     if (!authheader) {
//       res.status(401).json({ message: "Access Denied, No Token Provided" });
//     }
//     const token = authheader.split(" ")[1];
//     const decoded = await jwt.verify(token, process.env.Private_Key);
//     req.header = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({message:"Invalid Token"})
//   }
// };
// module.exports=authMiddleware
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => 
{
  try 
  {
    // ✅ 1. Header key must be lowercase
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER =>", req.headers.authorization);

    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied, No Token Provided" });
    }

    // ✅ 2. Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    // ✅ 3. Verify token (no await needed)
    const decoded = jwt.verify(token, process.env.Private_key);
    

    // ✅ 4. Attach decoded user properly
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
