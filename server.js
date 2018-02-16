const express = require('express')
const exec = require('child_process').exec
const fs = require('fs')

const app = express()


const botConstructorRepositoryLink = 'https://github.com/s-buhar0v/telegram-bot-constructor-bot'

app.get('/refresh-image', (request, response) => {
    fs.exists('./temp/telegram-bot-constructor', botConstructorExists => {
        console.log(botConstructorExists)
        if (!botConstructorExists) {
            exec(`cd ./temp/telegram-bot-constructor; git clone ${botConstructorRepositoryLink}`, (err, stdout, stderr) => {
                response.json({ stdout: stdout })
            })
        } else {
            exec(`cd ./temp/telegram-bot-constructor; git pull`, (err, stdout, stderr) => {
                response.json({ stdout: stdout })
            })
        }
    })
})

app.listen(3000)