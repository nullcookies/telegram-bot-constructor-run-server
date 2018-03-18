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

app.post('/runner-api/rebuild-image', async (request, response) => {
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

app.get('/runner-api/start', async (request, response) => {
    const botId = request.query.id

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

app.get('/runner-api/stop', async (request, response) => {
    const botId = request.query.id

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

app.get('/runner-api/check', async (request, response) => {
    const botId = request.query.id

    botContainerManager.getBotById(botId, (bot, err) => {
        if (err) {
            response.status = 500
            response.json({
                response: `Failed:${err}`
            })
        } else {
            botContainerManager.isBotRunning(bot.botName, (status, err) => {
                if (err) {
                    response.status = 500
                    response.json({
                        response: `Failed:${err}`
                    })
                } else {
                    response.status = 200
                    response.json({
                        status: status
                    })
                }
            })
        }
    })
})


app.listen(3000, () => {
    console.log('server is listening to port 3000')
})
