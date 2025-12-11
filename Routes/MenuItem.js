const express = require('express');
const menuRouter = express.Router();
const Menuitem = require('../models/MenuItem');
const { reverse } = require('lodash');

menuRouter.post("/",async(req, res) =>{
    try {
        const menu = req.body;
        const newMenu = new Menuitem(menu);
        const response = await newMenu.save();  // this line to save data in database
        console.log(response);
        res.status(200).json(response);
        
    } catch (er) {
        console.log(err);
        res.status(500).send("Internal Server error", err);
    }
});

menuRouter.get("/", async(req, res) =>{
    try{
        const data = await Menuitem.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).send("Error ", err);
    }
    
});

menuRouter.get('/:taste', async(req, res) =>{
    try {
        const taste = req.params.taste;

        const menuItem = await Menuitem.find({taste:taste});

        if(!menuItem){
            return res.status(404).send("tasted item is not found");
        }

        res.status(200).send(menuItem);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

menuRouter.put('/:id', async(req, res)=>{
    try {
        const menuId = req.params.id;
        const updatedMenu = req.body;

        const response = await Menuitem.findByIdAndUpdate(menuId, updatedMenu, {
            new:true,
            runValidators:true,
        });

        if(!response){
            res.status(404).send("Menu not found");
        }

        console.log(response);
        res.status(200).send("Menu is updated successfully");

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server error");
    }
});

menuRouter.delete("/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const response = await Menuitem.findByIdAndDelete(id);

        if(!response){
            res.status(404).send("Menu Item not found");
        }
        console.log(response);
        res.status(200).send("Menu Item Deleted Successfully")
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server error");
    }
})

module.exports = menuRouter;