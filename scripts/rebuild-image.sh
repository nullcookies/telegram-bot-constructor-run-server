if ! test -d ./temp/telegram-bot-constructor-bot
then
   cd ./temp
   git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
else
   cd ./temp/telegram-bot-constructor-bot
   git pull
fi
