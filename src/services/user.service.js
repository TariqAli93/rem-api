import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Utils
import { hashPassword, comparePassword } from "../utils/password.utils.js";

export const registerUser = async (userData) => {
    const { username, password, role } = userData;

    //check if the user already exists
    const user = await prisma.users.findUnique({
        where: {
            username,
        },
    });

    if (user) {
        throw new createHttpError.Conflict("User already exists!");
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    //create the user
    const newUser = await prisma.users.create({
        data: {
            username,
            password: hashedPassword,
            role: role || "EMPLOYEE", //default role is employee
        },
    });

    return newUser;
};

export const loginUser = async (userData) => {
    const { username, password } = userData;

    //check if the user exists
    const user = await prisma.users.findUnique({
        where: {
            username,
            is_deleted: false,
        },
    });

    //if user not found
    if (!user) {
        throw new createHttpError.NotFound("User not found!");
    }

    //if use is deactivated
    if (user.is_active === false) {
        throw new createHttpError.Forbidden("User is deactivated!");
    }

    //if user is banned
    if (user.is_banned === true) {
        throw new createHttpError.Forbidden("User is banned!");
    }

    //compare the passwords
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
        throw new createHttpError.Unauthorized("Invalid credentials!");
    }

    return user;
};
