const mongoose = require('mongoose')

const membersSchema = new mongoose.Schema({
    name: String,
    email: String,
    avator: String
})

const Member = new mongoose.model('members',membersSchema)

module.exports = Member