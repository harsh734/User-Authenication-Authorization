// auth , isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res, next) =>{
    try{
        const token = req.body.token ;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload); 
            req.user =payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });

        }
        next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wronog while verifying the task',
        });
    }
}

exports.isStudent= (req,res,next) =>{
    try{
        if(req.user.role !== "Student" ){
            return res.status(401).json({
                success:false,
                message:'This is a Protected route for a student',

            });

        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isAdmin = (req,res, next) =>{

    try{
        if(req.user.role !== "Admin" ){
            return res.status(401).json({
                success:false,
                message:'This is a Protected route for a Admin',

            });

        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}