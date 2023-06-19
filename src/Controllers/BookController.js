import { BookModel } from "../Models/BookModel.js";

export const getBooks = async (req,res) => {
    try {
        const books = await BookModel.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getBook = async (req,res) => {
    try {
        const {id} = req.params
        const book = await BookModel.findById(id)
        if(!book){
            return res.status(404).json(`book with ID: ${id} not found`)
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const createBook = async (req,res) => {
    try {
        const book = await BookModel.create(req.body)
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const updateBook = async (req,res) => {
    try {
        const {id} = req.params
        const book = await BookModel.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new: true}
        )
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}

export const deleteBook = async (req,res) => {
    try {
        const {id} = req.params
        const book = await BookModel.findByIdAndDelete(id)
        if(!book){
            return res.status(404).json(`book with ID: ${id} not found`)
        }
        res.status(200).json("book successfully removed.")
    } catch (error) {
        res.status(500).json({message:"An error has ocurred."})
    }
}
