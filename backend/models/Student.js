const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true,
    },
    std:{
        type:Number,
        required:true
    },
    joiningDate:{
        type:Date,
        default:Date.now
    },
    fees:{
        type:Number,
        required:true
    },
    feeDay:{
        type:Number
    },
    isAdvancedPay:{
        type:Boolean,
        required:true
    },
    paid:[
        {
            month:{
                type:Number,
                min:0,
                max:11
            },
            date:{
                type:Date,
                default:Date.now
            },

        }
    ]
})

module.exports = mongoose.model('students',StudentsSchema);