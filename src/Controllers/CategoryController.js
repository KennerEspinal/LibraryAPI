import { CategoryModel } from "../Models/CategoryModel.js";

export const getCategories = async (req,res) => {
    try {
        const categories = await CategoryModel.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getCategory = async (req,res) => {
    try {
        const {id} = req.params
        const category = await CategoryModel.findById(id)
        if(!category){
            return res.status(404).json(`category with ID: ${id} not found`)
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const createCategory = async (req,res) => {
    try {
        const category = await CategoryModel.create(req.body)
        res.status(201).json(category)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const updateCategory = async (req,res) => {
    try {
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new: true}
        )
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const deleteCategory = async (req,res) => {
    try {
        const {id} = req.params
        const category = await CategoryModel.findByIdAndDelete(id)
        if(!category){
            return res.status(404).json(`category with ID: ${id} not found`)
        }
        res.status(200).json("category successfully removed.")
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}
