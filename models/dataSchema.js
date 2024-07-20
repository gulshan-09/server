const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
    },
    embed_title: {
        type: String,
        trim: true,
    },
    slug_dub: {
        type: String,
        trim: true,
    },
    slug_sub: {
        type: String,
        trim: true,
    },
})




const allData = new mongoose.model('server', dataSchema);


module.exports = allData;