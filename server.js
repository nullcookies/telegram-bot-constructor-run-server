const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const scripts = require('./scritps')

const app = express()

app.get('/refresh-image', (request, response) => {
    exec(scripts.cloneRepository, (err, stdout, stderr) => {
        console.log(err)
        console.log(`stderr:${stderr}`)
        console.log(stdout)
        if (err || stderr) {
            response.json({ response: 'Failed to buildimage' })
        } else {
            response.json({ response: 'Image has been built successfully' })
        }

    })
})

app.listen(3000)
