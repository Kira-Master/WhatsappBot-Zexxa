const { ICommand } = require('@libs/builders/command')

module.exports = {
description: 'source code of this script',
callback: async({msg, fullArgs}) => {
msg.replyImage({url: 'https://telegra.ph/file/118e5b186e90d4d20d179.jpg'}, `Source code script ini dari LoL Human\n*https://github.com/LoL-Human/bot-wa*`)
    }
}