const express = require('express')
const excex = require('child_process').exec

const app = express()

app.get('/refresh-container', (request, response) => {
    exec('sudo docker images', (err, stdout, stderr) => {
        response.json({ stdout: stdout })
    })
})

app.listen(3000)