import bcrypt from "bcryptjs";
import UserSchema from "../models/UserSchema.js";
import { generateToken } from "../utils/GenerateToken.js";

import { UserInputError, ForbiddenError, AuthenticationError } from "apollo-server-express";
import validator from "validator"; // For email validation


export const UserRegisterService = async (input) => {
    const { name, email, password } = input;

    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    // user exists?
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await UserSchema.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
    });

    const token = generateToken(user);

    return {
        user,
        token,
    };
}


export const UserLoginService = async (input) => {

    const { email, password } = input;

    if (!email) throw new Error("Email is required");

    if (!password) throw new Error("Password is required");

    const user = await UserSchema.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = generateToken(user);

    return {
        user,
        token,
    };
}




export const UserORAdminUpdateService = async (userId, input, currentUser) => {

    // ----------------------
    // Authentication & Authorization
    // ----------------------
    if (!currentUser) throw new AuthenticationError("Authentication required");

    // Users can update their own profile OR admins can update any user
    if (currentUser._id.toString() !== userId && !currentUser.isAdmin) {
        throw new ForbiddenError("You are not allowed to update this user");
    }

    // ----------------------
    // Check if user exists
    // ----------------------
    const user = await UserSchema.findById(userId);
    if (!user) throw new UserInputError("User not found");

    // ----------------------
    // Validate input & filter allowed fields
    // ----------------------
    const updateData = {};

    if (input.name) {
        if (typeof input.name !== "string" || input.name.trim() === "") {
            throw new UserInputError("Name must be a non-empty string");
        }
        updateData.name = input.name.trim();
    }

    if (input.email) {
        if (!validator.isEmail(input.email)) {
            throw new UserInputError("Invalid email address");
        }
        updateData.email = input.email.trim().toLowerCase();
    }

    if (Object.keys(updateData).length === 0) {
        throw new UserInputError("No valid fields provided to update");
    }

    // ----------------------
    // Atomic update
    // ----------------------
    const updatedUser = await UserSchema.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });

    return updatedUser;
};