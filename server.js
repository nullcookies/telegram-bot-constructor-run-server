const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const app = express()

app.get('/refresh-image', (request, response) => {
    exec(`
        if ! test -d ./temp/telegram-bot-constructor-bot
        then
            cd ./temp/
            git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
        else
            cd ./temp/telegram-bot-constructor-bot
            git pull
        fi`, (err, stdout, stderr) => {
            console.log(err)
            console.log(stderr)
            if (err || stderr) {
                response.json({ err: 'Failed to buildimage' })
            } else {
                response.json({ err: 'Image has been built successfully' })
            }
        })
})

app.listen(3000)
