import JWT from "jsonwebtoken"
import USER from "../models/user.js";


export const reqsignin = async(req,res,next) => {
    
    try {
        const dec = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = dec;
        next();
        
    } catch (error) {
        console.log(error);
    }

}

export const isAdmin = async (req, res, next) => {
    try {
      const user = await USER.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };