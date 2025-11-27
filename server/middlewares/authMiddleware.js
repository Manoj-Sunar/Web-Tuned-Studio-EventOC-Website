import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";


export const authMiddleware = async ({ req }) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return { user: null };

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserSchema.findById(decoded.id).select("-password");
    return { user };
  } catch (error) {
    return { user: null };
  }
};
