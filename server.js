const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const botContainerManager = require('./bot-container-manager')
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

app.get('/start', async (request, response) => {
    const botId = request.params.id

    axios.get(`${apiUrl}/api/bot?id=${botId}`)
        .then(apiResponse => {
            let botName = apiResponse.data.botName
            let botToken = apiResponse.data.token

            botContainerManager.runBotInstacne(botName, botToken, err => {
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
        }).catch(err => {
            response.status = 500
            response.json({
                response: `Failed:${err}`
            })
        })
})

app.listen(3000)
