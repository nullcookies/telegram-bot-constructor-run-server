const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const botContainerManager = require('./bot-manager')
const apiUrl = require('./config').apiUrl

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/rebuild-image', async (request, response) => {
    botContainerManager.rebuildDockerContainer((err) => {
        if (err) {
            response.status = 500
            response.json({
                response: `Failed:${err}`
            })
        } else {
            response.status = 200
            response.json({
                response: 'Success'
            })
        }
    })
})

app.get('/start/:id', async (request, response) => {
    const botId = request.params.id

    botContainerManager.getBotById(botId, (bot, err) => {
        if (err) {
            response.status = 500
            response.json({
                response: `Failed:${err}`
            })
        } else {
            botContainerManager.runBotInstacne(bot.botName, bot.botAccessToken, err => {
                if (err) {
                    response.status = 500
                    response.json({
                        response: `Failed:${err}`
                    })
                } else {
                    response.status = 200
                    response.json({
                        response: 'Success'
                    })
                }
            })
        }
    })
})

app.get('/stop/:id', async (request, response) => {
    const botId = request.params.id

    botContainerManager.getBotById(botId, (bot, err) => {
        if (err) {
            response.status = 500
            response.json({
                response: `Failed:${err}`
            })
        } else {
            botContainerManager.stopBotInstacne(bot.botName, err => {
                if (err) {
                    response.status = 500
                    response.json({
                        response: `Failed:${err}`
                    })
                } else {
                    response.status = 200
                    response.json({
                        response: 'Success'
                    })
                }
            })
        }
    })
})


app.listen(3000, () => {
    console.log('server is listening to port 3000')
})
