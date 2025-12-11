const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post("/", async(req, res) =>{

    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
        // res.status(200).json("Data save successfully");
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server error");
    }
});

router.get("/",async(req, res)=>{
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(5000).json({err: "Internal server error"});
    }
});

// find the particular workType like chef, waiter, manager

router.get("/:workType", async(req, res) =>{
    try {
        const workType = req.params.workType;
        // validation
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work:workType});
            console.log(response);
            res.status(200).send(response);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:id", async(req, res) =>{
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedData,{
            new:true,
            runValidators:true,
        });

        if(!response){
            res.status(404).send("Person not found");
        }

        console.log("Data Updated");
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async(req, res) =>{
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).send("Person not found");
        }

        res.status(200).send("Person Deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;