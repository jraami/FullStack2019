const logoutRouter = require('express').Router()

logoutRouter.post('/', async (request, response) => {
    const token = ""
    response.status(200).send({ token, username: "", name: "" })
})

module.exports = logoutRouter
