import User from "../models/usermodels.js";
import { Router } from "express";

export const createUser = async (req , res) => {
    try {
    const createNewUser = await User.create(req.body)
    res.status(200).json(createNewUser)
    }
    catch (error) {
        res.status(499).json({
            message: "Error: Hubo un error al crear su usuario. Inténtelo de nuevo",
            error: "Client Error: Bad Request",
            status: "400"
        })
    }
}