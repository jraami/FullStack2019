const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

const checkAuthorization = (request) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }
    return decodedToken
}

blogRouter.get('/', async (request, response) => {
    try {
        const entries = await Blog
            .find({})
            .populate('userId')
        if (entries) {
            response.json(entries.map(Blog.format))
        } else {
            response.status(404).end()
        }
    }
    catch (exception) {
        response.status(400).send({ error: exception })
    }
})

blogRouter.get('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const entry = await Blog
            .findById(id)
            .populate('userId')
        if (entry) {
            response.status(200).json(Blog.format(entry)).end()
        } else {
            response.status(404).end()
        }
    }
    catch (exception) {
        response.status(400).send({ error: exception })
    }
})

blogRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        console.log('body: ' + body.title)
        if (body.title === "") return response.status(400).json({ error: 'Entry needs a name' })
        if (body.auther === "") return response.status(400).json({ error: 'Entry needs an author name' })
        if (body.url === "") return response.status(400).json({ error: 'Entry needs a URL' })
        const decodedToken = checkAuthorization(request)
        const user = await User.findById(decodedToken.id)
        console.log('saving entry for user: ' + user)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            userId: user._id
        })
        const entry = await Blog(Blog.format(blog))
        if (entry) {
            const entrySaved = await entry.save()
            if (entrySaved) {
                console.log('user before saving: ' + user)
                console.log('user entries before: ' + user.entries)
                user.entries = user.entries.concat(entrySaved._id)
                console.log('user entries after: ' + user.entries)
                await user.save()
                response.status(201).json(Blog.format(entrySaved))
            }
        }
    }
    catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(400).send({ error: exception.message })
        }
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    console.log('deleting')
    try {
        const decodedToken = checkAuthorization(request)
        const user = await User.findById(decodedToken.id)
        const indexOfEntry = user.entries.indexOf(id)
        console.log(user.entries)
        console.log(indexOfEntry + ' id ' + id)
        if (indexOfEntry < 0) {
            return response.status(401).json({ error: 'Not authorized' })
        }
        user.entries.splice(indexOfEntry, 1)
        console.log(user.entries)
        await user.save()
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(400).send({ error: exception.message })
        }
    }
})

blogRouter.delete('/', async (request, response) => {
    try {
        await Blog.deleteMany({})
        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: exception })
    }
})

blogRouter.put('/:id', async (request, response) => {
    //console.log(request)
    const id = request.params.id
    try {
        //console.log('heiiii')
        //console.log('liking' + JSON.stringify(request))
        const withoutLikes = await Blog
            .findById(id)
        console.log('entry before ' + withoutLikes)
        //
        const updatedEntry = await Blog
            .findOneAndUpdate({ "_id": id }, { $inc: { likes: 0.5 } }, { new: false }, (err) => {
                if (err) return response.status(500).end()
            })
        if (updatedEntry) {
            //
            const withLikes = await Blog
                .findById(id)
            console.log('entry updated ' + withLikes)
            console.log(updatedEntry.likes)
            //
            response.status(201).json(updatedEntry)
        }
    }
    catch (exception) {
        console.log(exception)
        response.status(400).send({ error: exception })
    }
})

module.exports = blogRouter