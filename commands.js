module.exports = {
    cloneRepository: `
    if ! test -d ./temp
    then
        sudo mkdir temp
    fi
    if ! test -d ./temp/telegram-bot-constructor-bot
    then
        cd ./temp
        sudo git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
    else
        cd ./temp/telegram-bot-constructor-bot
        sudo git pull
    fi`,
    removeContainers: `
    if [ "$(sudo docker images -q dev-bot-1/bot)" != "" ]; then
        if [ "$(sudo docker ps -a -q --filter="ancestor=dev-bot-1/bot")" != "" ]; then
            sudo docker stop $(sudo docker ps -a -q --filter="ancestor=dev-bot-1/bot")
        fi  
    fi`,
    removeImage: `
    if [ "$(sudo docker images -q dev-bot-1/bot)" != "" ]; then
        sudo docker rmi dev-bot-1/bot
    fi`,
    buildImage: `
    cd ./temp/telegram-bot-constructor-bot
    sudo docker build --no-cache -t dev-bot-1/bot .`,
    runBotInstance: `
    if [ "$(sudo docker ps -q --filter="name={name}")" ]; then
        sudo docker stop $(sudo docker ps -q --filter="name={name}")
    fi
    sudo docker run --rm -d -e BOT_ACCESS_TOKEN={token} --name={name} dev-bot-1/bot
    `,
    stopBotInstance: `
    if [ "$(sudo docker ps -q --filter="name={name}")" ]; then
        sudo docker stop $(sudo docker ps -q --filter="name={name}")
    fi    
    `,
    check: `
    sudo docker ps -q --filter="name={name}"
    `
}