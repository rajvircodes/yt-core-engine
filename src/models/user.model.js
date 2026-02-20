import mongoose, {Schema} from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true //Index: isse database me search fast ho jata hain (expensive but zaroori hain)
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //clodinary jesi service ka URL yaha store hoga
            required:true,
        },
        coverImage: {
            type:String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId, // REFERENCE : dusare model (video) ki ID store kar rhe hain
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true, 'password is required'] //Custom error message 
        },
        refreshtoken:{
            type:String,// SESSION PERSISTENCE : user ko baar baar login na karna pade isiliye 
        }

    },

    {timestamps:true} //TIMESTAMPS : createdAT and updatedAT fields apbe aap hi ban jayegi 
)
// PRE-SAVE HOOK : Data save hone se just pehle password ko encrypt karne ke liye 
userSchema.pre("save", async function(next) {
    // agar password change nai hua, to hashing skip karo (warna purana haash phirse hash ho jayega)
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

// CUSTOM METHODS : user model me apne khud ke functions add karna 
userSchema.methods.isPasswordCorrect = async function(password){
    // bcrypt plain password aur hashed password ko compare karke true/false data hai 
    return await bcrypt.compare(password, this.password)
}

// ACCESS TOKEN : ye short time ke liye hain (user ki details iske andar hoti hain)
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// REFRESH TOKEN : ye long-time ke liye hai (isme data kam rakhte hai security ke liye)
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)

