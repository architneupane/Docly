var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)

const docSchema = mongoose.Schema({
    title: String,
    content: {
        type:String,
        default:"",
    },
    uploadedBy: String,
    date:{
        type:Date,
        default: Date.now
    },
    lastUpdate:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('document', docSchema)