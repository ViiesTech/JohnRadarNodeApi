import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'

class AuthController {

    static Register = async(req, res) => {

        const {name , email, password, tc} = req.body;
        const user = await User.findOne({email: email});

        if(user){
            res.send({"status": "failed", "message": "Email already exists"})

        }else{
            if(name && email && password && tc){
                try{
                    const salt = await bcrypt.genSalt(10)
                    const HashPassword = await bcrypt.hash(password, salt)

                    const CreateAccount = new User({
                        name: name,
                        email: email,
                        password: HashPassword,
                        tc: tc,
                    })

                    CreateAccount.save()

                    const Saved_user = await User.findOne({email: email})


                    const token =  JWT.sign({UserID: Saved_user._id},process.env.SECRET_KEY ,{expiresIn : "30d"})

                    res.send({"status": "true", "message": "Registered successfully", "token":token})

                }catch(e){
                    res.send({"status": "failed", "message": "Resgistration failed", "error" : e.message})

                }
            }else{
                res.send({"status": "failed", "message": "All fields are required"})

            }
        }
    }

    static Login = async(req, res) => {
        const {email, password } = req.body;

        const EmailExist = await User.findOne({email:email})

        if(!EmailExist){
            res.send({"status": "failed", "message": "User Not Exist"})
        }else{
            if(email && password){
                const Mydata = await User.findById(EmailExist._id).select('-password')
                const isHashMatch = bcrypt.compare(password, EmailExist.password)


                if(EmailExist.email === email && isHashMatch){
                    const token = JWT.sign({UserID: EmailExist._id}, "JohnRadarpoiuytrewq", {expiresIn : '30d'})


                    res.send({
                        "status": "Success",
                        "message": "Succesfully loggedin",
                        "token": token,
                        "data" : Mydata
                    })
                }else{
                    res.send({"status": "failed", "message": "Please enter the correct email and password!" })

                }





            }else{
                res.send({"status": "failed", "message": "All Fields are required"})

            }
        }
        
 
    }


    static sendUserPasswordEmail = async(req, res) => {
        const {email} = req.body;

        if(email){
            const user = await User.findOne({ email: email})
            
            if(user){
                const secret = user._id + process.env.SECRET_KEY
                const token = JWT.sign({userID: user._id},secret , {expiresIn: '15m'})

                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}` 

                res.send({"status": "Success","message" :"Password send succesfully", "token" :token, "User_ID" :  user._id})
            }else{
                res.send({"status": "Failed","message" :"Email does not exist"})

            }
        }else{
            res.send({"status": "Failed","message" :"Please enter your email"})

        }
    }

    static resetForgetPassword = async (req, res) => {
        const {password, password_confirmation} = req.body;
        const {id, token} = req.params;
        const user = await user.findById(id)
        if(user){
            const new_secret = user._id + process.env.SECRET_KEY
            try{
                JWT.verify(new_secret)
                if(password && password_confirmation){
                    res.send({"status": "Failed","message" :"All fields are required"})

                    if(password !== password_confirmation){
                        res.send({"status": "Failed","message" :"Password does'nt match"})

                    }else{
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        await UserModel.findByIdAndUpdate(user._id, {$set:{password: hashPassword}}) 

                        res.send({"status": "Failed","message" :"Password Reset Successfully"})

                    }
                }else{
                    res.send({"status": "Failed","message" :"Password Does'nt match"})

                }
            }catch(e){

            }

        }else{
            res.send({"status": "Failed","message" :"User not found"})

        }


     
    }


}


export default AuthController