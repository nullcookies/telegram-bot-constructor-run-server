const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const app = express()

const refreshImageScriptPath = path.join(process.env.HOME, 'telegram-bot-constructor/telegram-bot-constructor-run-server/scritps/rebuild-image.sh')

console.log(`sudo chmod +x ${refreshImageScriptPath}`)

app.get('/refresh-image', (request, response) => {
    exec(`if ! test -d ./temp/telegram-bot-constructor-bot
          then
            cd ./temp/
            git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
            else
                cd ./temp/telegram-bot-constructor-bot
                git pull
            fi`, (err, stdout, stderr) => {
            console.log(stdout, stderr)
        })
})

app.listen(3000)
