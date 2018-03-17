const exec = require('child_process').exec

const commands = require('./commands')

function rebuildDockerContainer(callback) {
    exec(commands.cloneRepository, (err, stdout, stderr) => {
        if (err) { callback(err) }
        exec(commands.removeContainers, (err, stdout, stderr) => {
            if (err) { callback(err) }
            exec(commands.removeImage, (err, stdout, stderr) => {
                if (err) { callback(err) }
                exec(commands.buildImage, (err, stdout, stderr) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback()
                    }
                })
            })
        })
    })
}

function runBotInstacne(botName, botAccessToken, callback) {
    let runCommand = commands.runBotInstance
        .replace('{token}', botAccessToken)
        .replace('{name}', botName)
    exec(runCommand, (err, stdout, stderr) => {
        if (err) {
            callback(err)
        } else {
            callback()
        }
    })

}

module.exports.rebuildDockerContainer = rebuildDockerContainer
module.exports.runBotInstacne = runBotInstacne