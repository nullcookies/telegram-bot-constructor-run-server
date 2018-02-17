if ! test -d $HOME/telegram-bot-constructor/telegram-bot-constructor-run-server/temp/telegram-bot-constructor-bot
then
   cd $HOME/telegram-bot-constructor/telegram-bot-constructor-run-server/temp/
   git clone https://github.com/s-buhar0v/telegram-bot-constructor-bot.git
else
   cd $HOME/telegram-bot-constructor/telegram-bot-constructor-run-server/temp/telegram-bot-constructor-bot
   git pull
fi
