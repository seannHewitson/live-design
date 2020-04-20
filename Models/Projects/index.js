const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Projects = new Schema({
    SessionID: {
        type: String
    },
    Title: {
        type: String
    },
    CSS: {
        type: String
    },
    HTML: {
        type: String
    },
    DateCreated: {
        type: Date
    }
}, {
    collection: 'Projects'
});

module.exports = mongoose.model('Project', Projects);