const express = require('express');
const router = express.Router();
const {body, validationResult}=require('express-validator');
var fetchuser = require("../middleware/fetchuser")
const Student = require('../models/Student')

//Router 1 : get all students
router.get('/fetchallstudents',fetchuser,async (req,res)=>{
    try {
        const students = await Student.find({user: req.user.id});
        res.json(students)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Router 2 : get student by id
router.get('/fetchstudent/:id',fetchuser,async (req,res)=>{
    try {
        let student = await Student.findById(req.params.id);
        
        if(!student){
            return res.status(404).send("Student not found");
        }

        if(student.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        res.json({student});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Router 2 : add student
router.post('/addstudent',fetchuser,[
    body('name'),
    body('std'),
    body('joiningDate'),
    body('feeDay'),
    body('fees'),
    body('isAdvancedPay'),
], async (req,res)=>{
    try {
        const  {name, std, joiningDate, feeDay, fees, isAdvancedPay}=req.body;

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()});
        }
        const student = new Student({
            name,std,joiningDate,feeDay,fees,isAdvancedPay,user:req.user.id
        })
        const savedStudent = await student.save()
        res.json(savedStudent)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Router 3 : edit student details
router.put('/updatestudent/:id', fetchuser , async (req, res)=>{
    const  {name, std, joiningDate, feeDay, fees, isAdvancedPay}=req.body;
    try {
        const newStudent = {};
        if(name){newStudent.name = name};
        if(std){newStudent.std = std};
        if(joiningDate){newStudent.joiningDate = joiningDate};
        if(feeDay){newStudent.feeDay = feeDay};
        if(fees){newStudent.fees = fees};
        if(isAdvancedPay){newStudent.isAdvancedPay = isAdvancedPay};

        let student = await Student.findById(req.params.id);
        
        if(!student){
            return res.status(404).send("Student not found");
        }

        if(student.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        student = await Student.findByIdAndUpdate(req.params.id,{$set: newStudent},{new:true});
        res.json({student});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : DELETE existing student

router.delete('/deletestudent/:id', fetchuser, async (req,res)=>{
    try {
        let student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).send("Student not found")
        }

        if(student.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        student = await Student.findByIdAndDelete(req.params.id)
        res.json({"success":"Student has been deleted", student:student});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Router 4 : fees paid

router.put('/fees/:id',fetchuser, async (req,res)=>{
    try {
        
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()})
        }
        let student = await Student.findById(req.params.id);

        if(!student){
            return res.status(404).send("Student not found");
        }

        if(student.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        student.paid.push({
            month: req.body.month,
            date: req.body.date
        })

        await student.save();
        return res.status(200).json({
            success:true,
            message:"fees added"
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router