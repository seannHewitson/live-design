const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Templates = new Schema({
    SessionID: {
        type: String
    },
    Title: {
        type: String
    },
    HTML: {
        type: String
    },
    JavaScript: {
        type: String
    },
    DateCreated: {
        type: Date
    }
}, {
    collection: 'Templates'
});

module.exports = mongoose.model('Template', Templates);