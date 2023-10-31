const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios')

module.exports = {
    category: 'Random',
    description: 'Random Oppai Image',
    limit: true,
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '',
    example: '{prefix}{command} ',
    callback: async ({ msg, fullArgs }) => {
    
    msg.replyImage({ url: 'https://api.zahwazein.xyz/randomanime/selfies?apikey=zenzkey_8bc01f5847'}, `success generated`).then(() => 
    { return msg.reply('1 limit digunakan')}).catch(() => { return msg.reply('gagal mengirim')})
    }
    }