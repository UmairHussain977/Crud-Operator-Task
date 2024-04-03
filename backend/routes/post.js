const express = require('express')
const router = express.Router()
const { addMembers, deleteMember, updateMember } = require('../controllers/post')

router.post('/add-new-members', addMembers)
router.post('/delete-member', deleteMember)
router.post('/update-member', updateMember)

module.exports = router