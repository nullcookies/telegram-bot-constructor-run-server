import { exec } from 'child_process';

const express = require('express')
const excex = require('child_process').exec

const app = express()

app.get('/refresh-container', (request, respons) => {
    exec('sudo docker images', (err, stdout, stderr) => {
        console.log(stdout)
    })
})

app.listen(3000)