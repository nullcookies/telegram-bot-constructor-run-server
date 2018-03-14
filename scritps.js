module.exports = {
    cloneRepository: `
    if ! test -d ./temp/telegram-bot-constructor-bot
    then
        cd ./temp
        git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
    else
        cd ./temp/telegram-bot-constructor-bot
        git pull
    fi`,

    buildImage: `
    cd ./temp/telegram-bot-constructor-bot
    if docker ps -a -q --filter="ancestor=dev-bot-1/bot" 
    then
        sudo docker stop $(docker ps -a -q --filter="ancestor=dev-bot-1/bot")
        sudo docker rm $(docker ps -a -q --filter="ancestor=dev-bot-1/bot")
    fi
    sudo docker rmi dev-bot-1/bot
    sudo docker build -t --no-cache dev-bot-1/bot .`
}