import USER from "../models/user.js";
import { cmppass, hashpassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async( req, res) => {
    try {

        const {name, email, password, phone, address} = req.body;
        if(!name)
            return res.send( { message: 'Fill all fields'} );
        if(!email)
            return res.send( { message: 'Fill all fields'} );
        if(!password)
            return res.send( { message: 'Fill all fields'} );
        if(!phone)
            return res.send( { message: 'Fill all fields'} );
        if(!address)
            return res.send( { message: 'Fill all fields'} );

        const exuser = await USER.findOne({email});

        if(exuser)
        {
            return res.status(200).send({
                success: false,
                message: 'Email already registered, please log in'
            })
        }

        const hpass = await hashpassword(password)

        const nuser = await new USER({
            name,
            email,
            phone,
            address,
            password: hpass
        }).save();

        res.status(201).send({
            success: true,
            message: 'User created',
            nuser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Registration Error',
            error 
        })
    }
}


export const loginController = async( req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
              success: false,
              message: "Invalid email or password",
            });
          }

          const user = await USER.findOne({ email });
         
          if (!user) {
            return res.status(404).send({
              success: false,
              message: "Account not found",
            });
          }

          const match = cmppass(password, user.password);
          if (!match) {
            return res.status(200).send({
              success: false,
              message: "Invalid Password",
            });
          }

          //token time :(
          const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

          res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              adddress: user.address,
            },
            token,
          });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Login Error",
          error,
        });
    }
}




export const testController = async (req, res, next) => {
  try {
    res.send({message : "Protected"})

  } catch (error) {
    console.log(error);
  }
};