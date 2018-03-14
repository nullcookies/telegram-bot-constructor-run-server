const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const scripts = require('./scritps')

const app = express()

app.get('/rebuild-image', async (request, response) => {

    try {
        await exec(scripts.cloneRepository)
        await exec(scripts.removeContainers)
        await exec(scripts.buildImage)
        await exec(scripts.removeImage)

        response.json({ response: 'Image has been built successfully' })
    } catch (error) {
        response.json({ response: `Failed to buildimage:${error}` })
    }
})

app.listen(3000)
