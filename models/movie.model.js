const mongoose = require('mongoose')


const MoviesSchema = new mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    title:{
        type:String,
        required:[true, "{PATH} is required"],
        minlength: [3, "{PATH} must be atleast 10 characters long"]
    } ,
    img:{
        type:String,
        required:[true, "{PATH} is required"],
    } ,
    rating:{
        type:Number,
        min:[1, "Rating must be atleast 1"],
        max:[5, "Rating cant be more than 5"],
    },
    comments:{
        type:String,
        required:[true, "{PATH} is required"],
        minlength: [3, "{PATH} must be atleast 3 characters long"]
    } ,
    genre:{
        type:String,
        required:[false, "{PATH} is required"],
    
    } ,
    cast:{
        type:Boolean,
        default:true,
        
    } ,
    length:{
        type:Boolean,
        default:true,
        
    } ,
    credits:{
        type:Boolean,
        default:true,
        
    } 
},{timestamps:true});



const Movies = mongoose.model('movies', MoviesSchema);

module.exports = Movies

