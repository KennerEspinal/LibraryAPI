import { RolModel } from "../Models/RolModel.js";

export const getRols = async (req,res) => {
    try {
        const rols = await RolModel.find()
        res.status(200).json(rols)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getRol = async (req,res) => {
    try {
        const {id} = req.params
        const rol = await RolModel.findById(id)
        if(!rol){
            return res.status(404).json(`rol with ID: ${id} not found`)
        }
        res.status(200).json(rol)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const createRol = async (req,res) => {
    try {
        const rol = await RolModel.create(req.body)
        res.status(201).json(rol)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const updateRol = async (req,res) => {
    try {
        const {id} = req.params
        const rol = await RolModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new: true}
        )
        res.status(200).json(rol)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const deleteRol = async (req,res) => {
    try {
        const {id} = req.params
        const rol = await RolModel.findByIdAndDelete(id)
        if(!rol){
            return res.status(404).json(`rol with ID: ${id} not found`)
        }
        res.status(200).json("rol successfully removed.")
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}
