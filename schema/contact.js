const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = new schema({

    name: String,
    lastName: String,
    emailAddress: {
        type: Array,
        required: true,
        unique: true,
        trim: true
    },
    contactNumber: {
        type : Array
    }
},{ collection: 'Contacts'})

module.exports = mongoose.model('Contact', contactSchema);