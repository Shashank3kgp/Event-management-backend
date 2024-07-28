const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        date: {type: Date, required:true},
        name: {type: String, required:true},
        location: {type: String, requird:true},
        description: {type: String, required: true},
        userId: mongoose.Schema.Types.ObjectId,
        eventId: mongoose.Schema.Types.ObjectId
    }
)

module.exports = mongoose.model('Event', eventSchema);