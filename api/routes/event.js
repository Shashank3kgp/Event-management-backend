const express = require('express');
const router = express.Router();
const event = require('../models/event');
const mongoose = require('mongoose');
// required routes for events -- 
// post - create event  get - get all the events put - update the event with specific id  delete - delete the event with the id

router.post('/',async (req,res,next)=>{
    try{
    const info = req.body;
    const newEvent = new event({
       userId: info.userId,
       eventId: mongoose.Types.ObjectId,
       name: info.name,
       date: info.date,
       location: info.location,
       description: info.description
    });
    await newEvent.save();
    }
    catch(error){
        res.status(400).json({
            error: error,
            message: "error"
        })
    }
})

router.get('/',async (req,res,next)=>{
    try{
       const info = req.body;
       event.find()
       .exec()
       .then(
        events=>{
            res.status(200).json({
                count: events.length,
                events: events.map(ev=>{
                    return {
                       name: ev.name,
                       date: ev.date,
                       location: ev.location,
                       description: ev.description
                    }
                })
            })
        }
       )
       .catch((err)=>{
        res.status(400).json({
            error: err,
            message: "error"
        })
       })
    }
    catch(error){
        res.status(400).json({
            error:error,
            message: "error"
        })
    }
})

router.put('/:eventId', async (req, res, next) => {
    try {
        const eventId = req.params.eventId; // Get eventId from URL parameters
        const userId = req.body.userId; // Get user ID from the authenticated user
        // Find the event by ID and check if it belongs to the user
        const event = await Event.findOne({ _id: eventId, userId: userId });
        if (!event) {
            return res.status(404).json({
                message: 'Event not found or you are not authorized to update this event'
            });
        } // we need to check that is the user access to do this or not then according with that we take and do these thigns 
        // Update the event with the new data from the request body
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: req.body }, // Use $set to only update the fields provided in the request body
            { new: true, runValidators: true } // Return the updated document and validate the fields
        );
        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'An error occurred while trying to update the event'
        });
    }
});


router.delete('/:eventId', async (req, res, next) => {
    try {
        const eventId = req.params.eventId; // Get eventId from URL parameters
        const userId = req.body.userId; // Get user ID from the authenticated user
        // Find the event by ID and check if it belongs to the user
        const event = await Event.findOne({ _id: eventId, userId: userId });
        if (!event) {
            return res.status(404).json({
                message: 'Event not found or you are not authorized to delete this event'
            });
        }
        // Delete the event
        await Event.deleteOne({ _id: eventId });
        res.status(200).json({
            message: 'Event deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'An error occurred while trying to delete the event'
        });
    }
});

module.exports = router;