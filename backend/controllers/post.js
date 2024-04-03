const { Member } = require('../model')
const {cloudinary} = require('../config')

const addMembers = async (req, res) => {
    try {
        const { body } = req;
        const { name, email, avator } = body;
        if (!name || !email || !avator) {
            return res.send({ success: false, message: 'Please provide all values' });
        }
        if (!/@gmail\.com$/.test(email)) {
            return res.send({ success: false, message: 'Email must be a Gmail address' });
        }
        const uploadedAvatar = await cloudinary.cloudinary.uploader.upload(avator,(res,err) => {
            console.log('image upload successfully')
        });
        const addMember = new Member({
            name,
            email,
            avator: uploadedAvatar.secure_url,
        });
        await addMember.save();
        return res.send({ success: true, message: 'Member added successfully', response: addMember });
    } catch (error) {
        console.error('Error:', error);
        return res.send({ success: false, message: 'Something went wrong' });
    }
};
const deleteMember = async (req, res) => {
    try {
        const { body } = req
        const { _id } = body
        if (!_id) {
            return res.send({ success: false, message: 'please provide member ID' })
        }
        const dltMember = await Member.findByIdAndDelete(_id)
        if (!dltMember) {
            return res.send({ success: false, message: 'member not found' })
        }
        return res.send({ success: true, message: 'delete member successfully' })
    } catch (error) {
        console.log('error', error)
        return res.send({ success: false, message: 'something went wrong' })
    }
}
const updateMember = async (req, res) => {
    try {
        const { body } = req;
        const { _id, name, email, avator } = body;
        if (!_id || !name || !email || !avator) { 
            return res.send({ success: false, message: 'Please provide all values' });
        }
        const uploadedAvatar = await cloudinary.cloudinary.uploader.upload(avator); 
        const updMember = await Member.findByIdAndUpdate(
            _id,
            { name, email, avator: uploadedAvatar.secure_url },
            { new: true }
        );
        if (!updMember) {
            return res.send({ success: false, message: 'Member not found' });
        }
        return res.send({ success: true, message: 'Member updated successfully', response: updMember });
    } catch (error) {
        console.log('Error:', error);
        return res.send({ success: false, message: 'Something went wrong' });
    }
};

module.exports = {
    addMembers,
    deleteMember,
    updateMember
}