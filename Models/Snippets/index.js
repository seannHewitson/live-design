const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Snippets = new Schema({
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
    JavaScript: {
        type: String
    },
    DateCreated: {
        type: Date
    }
}, {
    collection: 'Snippets'
});

module.exports = mongoose.model('Snippet', Snippets);