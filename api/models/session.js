const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        name: {type: String, required:true},
        email: {type: String, requird:true},
        password: {type: String, required: true} 
    }
)

module.exports = mongoose.model('Session', sessionSchema);