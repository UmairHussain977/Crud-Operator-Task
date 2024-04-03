const express = require('express')
const router = express.Router()
const { getAlltMembers } = require('../controllers/get')

router.get('/all-members', getAlltMembers)

module.exports = router