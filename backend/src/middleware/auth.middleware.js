const jwt =require("jsonwebtoken");

async function authartist(req,res,next){
    const token  = req.cookies.token;

    if(!token){
        console.log("no token");
        return res.status(401).json({
            message: "unauthorised"
        })
    }

    try{

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
        return res.status(403).json({message: "forbidden"})
     }

     req.user = decoded;

     next();
    }
    catch(err){
        console.log(err);
       return res.status(401).json({
        message: "unauthorised",
        err
       })
    }
}

async function authuser(req,res,next){
    const token  = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: " no token"
        })
    }

    try{

     const decoded = jwt.verify(token , process.env.JWT_SECRET);
     

        if(decoded.role !== "user"){
            return res.status(401).json({
                message: "unauthorised not decoded"
            })
        }
           req.user= decoded;

           next()

    } catch(err){
        console.log(err)
   res.status(401).json({
    message: "unauthorised"
   })
    }
}

async function authme(req,res,next){
    const token  = req.cookies.token;

    if(!token){
        console.log("no token");
        return res.status(401).json({
            message: "unauthorised",
          
        })
    }

    try{

        const decoded = jwt.verify(token , process.env.JWT_SECRET);


     req.user = decoded;

     next();
    }
    catch(err){
        console.log(err);
       return res.status(401).json({
        message: "unauthorised",
        err
       })
    }
}

module.exports = {authartist , authuser , authme};