const express = require('express')
const exec = require('child_process').exec
const path = require('path')

const scripts = require('./scritps')

const app = express()

app.get('/refresh-image', async (request, response) => {

    await exec(scripts.cloneRepository)
    await  exec(scripts.removeContainers)
    await exec(scripts.buildImage)
    await exec(scripts.removeImage)
    exec(scripts.cloneRepository, (err, stdout, stderr) => {
        console.log(err)
        console.log(`stderr:${stderr}`)
        console.log(stdout)

        exec(scripts.removeContainers, (err, stdout, stderr) => {
            console.log(err)
            console.log(`stderr:${stderr}`)
            console.log(stdout)

            exec(scripts.removeImage, (err, stdout, stderr) => {
                console.log(err)
                console.log(`stderr:${stderr}`)
                console.log(stdout)

                exec(scripts.buildImage, (err, stdout, stderr) => {
                    console.log(err)
                    console.log(`stderr:${stderr}`)
                    console.log(stdout)

                    if (err) {
                        response.json({ response: 'Failed to buildimage' })
                    } else {
                        response.json({ response: 'Image has been built successfully' })
                    }
                })
            })
        })
    })
})

app.listen(3000)
