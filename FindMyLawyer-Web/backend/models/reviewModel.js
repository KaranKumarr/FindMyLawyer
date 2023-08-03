const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lawyer',
        required: [true, 'Lawyer is required']
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Client is required'],
        ref: 'Client'
    },
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Review', reviewSchema);