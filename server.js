const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const scripts = require('./scritps')

const app = express()

app.get('/refresh-image', (request, response) => {
    exec(`
        ls
        if ! test -d ./temp/telegram-bot-constructor-bot
        then
            cd ./temp
            git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
        else
            cd ./temp/telegram-bot-constructor-bot
            git pull
        fi`, (err, stdout, stderr) => {

            console.log(err)
            console.log(stderr)
            console.log(stdout)
            if (err || stderr) {
                response.json({ response: 'Failed to buildimage' })
            } else {
                response.json({ response: 'Image has been built successfully' })
            }

        })
})

app.listen(3000)
