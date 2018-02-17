const express = require('express')
const exec = require('child_process').exec
const fs = require('fs')

const app = express()

app.get('/refresh-image', (request, response) => {
    exec('./scritps/refrsh-image.sh', (err, stdout, stderr) => {
        response.json({ stdout: stdout })
    })
})

app.listen(3000)