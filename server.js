const express = require('express')
const exec = require('child_process').exec
const path =  require('path')

const app = express()

const refreshImageScriptPath = path.join(process.env.HOME, 'telegram-bot-constructor/telegram-bot-constructor-run-server/scritps/refresh-image.sh')

app.get('/refresh-image', (request, response) => {
    exec(`chmod +x ${refreshImageScriptPath}`, (err, stdout, stderr) => {
        console.log(stdout, stderr)
        exec(`${refreshImageScriptPath}`, (err, stdout, stderr) => {
            console.log(err, stderr)
            response.json({ stdout: stdout })
        })
    })
})

app.listen(3000)
