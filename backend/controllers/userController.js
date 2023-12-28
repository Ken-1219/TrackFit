const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//function to create JWT tokens for authentication
const createToken = (_id)=>{
    const token = jwt.sign({_id},process.env.SECRET, {expiresIn: '3d'} );
    return token;
}

//login user controller
const loginUser = async (req,res)=>{

    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);

        const token = createToken(user._id);
        
        res.status(200).json({email, token});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}



//signup user controller 
const signupUser = async (req,res)=>{
    const  {email , password} = req.body;

    try{
        const user = await User.signup(email, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}



module.exports = {loginUser, signupUser};
