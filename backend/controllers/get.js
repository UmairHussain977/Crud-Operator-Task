const { Member } = require('../model')

const getAlltMembers = async (req, res) => {
    try {
        const getMembers = await Member.find()
        return res.send({ success: true, response: getMembers })
    } catch (error) {
        console.log('error', error)
        return res.send({ success: false, message: 'something went wrong' })
    }
}

module.exports = {
    getAlltMembers
}