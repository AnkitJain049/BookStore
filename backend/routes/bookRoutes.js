import express from "express";
import {Book} from "../models/booksModel.js";

const router = express.Router();

router.get("/",async(request,response)=>{
    try{
        const books= await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books});
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
});

router.get("/:id",async (request,response)=>{
    try{
        const {id}=request.params;
        const book= await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
})

router.post("/",async(request,response)=>{
    try{
        if(!request.body.author || !request.body.title || !request.body.publishYear){
            return response.status(400).send({message:"Send all required felids"});
        }
        const newBook={
            title:request.body.title,
            publishYear:request.body.publishYear,
            author:request.body.author
        }
        const book=await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

router.put("/:id",async (request,response)=>{
    try{
        if(!request.body.author || !request.body.title || !request.body.publishYear){
            return response.status(400).send({message:"Send all required felids"});
        }
        const {id}=request.params;
        const result= await Book.findByIdAndUpdate(id,request.body,{ new: true });

        if(!result){
            return response.status(404).send({message:"Book not found"});
        }
        return response.status(200).send({message:"Book updated Successfully",data:result});
    }catch(error){
        console.log(error.message);
        return response.status(500).json({message:error.message});
    }
})

router.delete("/:id",async (request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message:"Book not found"});
        }
        return response.status(200).send({message:"Book Deleted Successfully"});
    }catch(error){
        console.log(error.message);
        return response.status(500).json({message:error.message});
    }
});

export default router;