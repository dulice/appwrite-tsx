import * as z from "zod";

export const signupForm = z.object({
    name: z.string().min(2, {message: "Too short"}),
    username: z.string().min(2, {message: "Too short"}),
    email: z.string().email({message: "Email is not valid"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const signinForm = z.object({
    email: z.string().email({message: "Email is not valid"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export const postFormValidation = z.object({
    caption: z.string().min(2, {message: "Captions must be at least 2 characters"}),
    file: z.custom<File[]>(),
    location: z.string(),
    tags: z.string(),
    userId: z.string(),
})

export const userFormValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, {message: "Too short"}),
    username: z.string().min(2, {message: "Too short"}),
    email: z.string().email({message: "Email is not valid"}),
    bio: z.any(),
})