const express=require("express");
const mongoose=require("mongoose");

const taskModel=require("../models/task.js");

//get all tasks
const getAllTasks=async (req,res)=>{
    try{
        const task=await taskModel.find({});
        res.status(200).json({task});
    }
    catch(err){
        res.status(500).json({msg:err});
    }
}


//create task
const createTask=async (req,res)=>{
    try{
        const task=await taskModel.create(req.body);
        res.status(201).json({task});
    }
    catch(err){
        res.status(500).json({msg:err});
    }
}


//get task based on id
const getTask=async (req,res)=>{
    try{
        const {id:taskID}=req.params;
        const task=await taskModel.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`no task with id : ${taskID}`});
        }
        res.status(200).json({task});
    }
    catch(err){
        res.status(500).json({msg:err});
    }
}


//update task with the help of id
const updateTask=async (req,res)=>{
    try{
        const {id:taskId}=req.params;
        const task=await taskModel.findOneAndUpdate({_id:taskId},req.body,{
            new:true, //return new task
            runValidators:true //run mongoose validators
        });
        if(!task){
            return res.status(404).json({msg:`no task with id : ${taskId}`});
        }
        res.status(200).json({ task });
    }catch(err){
        res.status(500).json({msg:err});
    }
}


//delete task with the help of id
const deleteTask=async (req,res)=>{
    try{
        const {id:taskId}=req.params;
        const task=await taskModel.findOneAndDelete({_id:taskId});
        if(!task){
            return res.status(404).json({msg:`no task with id : ${taskId}`});
        }
        // res.status(200).json({task});
        res.status(200).json({task:null, status:"success"});
    }catch(err){
        res.status(500).json({msg:err});
    }
}


module.exports={ getAllTasks,createTask,getTask,updateTask,deleteTask };