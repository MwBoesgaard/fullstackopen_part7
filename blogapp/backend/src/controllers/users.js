const router = require('express').Router()

const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

module.exports = router