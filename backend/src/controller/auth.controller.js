const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registeruser(req,res) {

    const  {username , email , password , role = "user"} = req.body;

    const isuserexist = await usermodel.findOne({
       $or : [ 
        { username} , 
       { email}
]  
  })

  if(isuserexist){
    return res.status(409).json({
        message: "User already exists"
    })
  }

  const hash  = await bcrypt.hash(password, 10)
    
  const user = await usermodel.create({
    username,
    email,
    password : hash,
    role
  })

  const token  = jwt.sign({
    id: user._id,
    role: user.role,
  } , process.env.JWT_SECRET)

  res.cookie("token" , token)

  res.status(201).json({
message: "user registered successfully",
user: {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
}
  })
}


async  function loginuser(req,res){
    const{identifier,password} = req.body;

    const user = await usermodel.findOne({
        $or: [
            {username : identifier},
            {email : identifier}
        ]
    })

    if(!user) { 
        return res.status(401).json({
            message: "User does not exists"
        })
    }

    const ispassvalid = await bcrypt.compare(password , user.password);

    if(!ispassvalid) { 
        return res.status(401).json({
            message: " Invalid password"
        })
    }

    const token = jwt.sign({
     id: user._id,
     role: user.role
    } , process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(200).json({
        message: "logged in successfully",
        user: { 
            id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
        }
    })
}

async function userme(req,res){
     
    const id = req.user.id;

    const user = await usermodel.findById(id);
   

    if(!user){
        return res.status(404).json({
            message: "no user "
        })
    }

    res.status(200).json({
        message: "this is me the user",
        user: { 
            id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
        }
    })
}

// async function artistme(req,res){
     
//     const id = req.user.id;

//     const artist = await usermodel.findbyId(id);
   

//     if(!artist){
//         return res.status(404).json({
//             message: "no artist "
//         })
//     }

//     res.status(200).json({
//         message: "this is me the artist",
//         artist: { 
//             id: artist._id,
//     username: artist.username,
//     email: artist.email,
//     role: artist.role,
//         }
//     })
// }




async function logout(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"logged out"})
}

module.exports = {registeruser , loginuser , logout ,userme }