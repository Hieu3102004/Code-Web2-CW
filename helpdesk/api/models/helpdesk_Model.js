const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const helpdeskSchema = new Schema(
    {
    issueCode: {
        type: String,
        required: 'Issue Code is required'
    },
    responseText: {
        type: String,
        required: 'Response Text is required' 
    },
    category: {
        type: String,
        required: 'Category is required'
    }
},
{collection: 'responses' }
);
module.exports = mongoose.model('Helpdesk', helpdeskSchema);
