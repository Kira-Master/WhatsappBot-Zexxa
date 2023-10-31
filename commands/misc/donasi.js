const { ICommand } = require ('@libs/builders/command')
module.exports = {
    aliases: ['donate'],
    category: 'misc',
    description: 'Donate for Bot',
    limit: false,
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '',
    example: '{prefix}{command} ',
    callback: async ({ msg, fullArgs }) => {
    
    let zexxaMsg = `*_Kalo mau donate ketik /owner aja kak,_*\n*_donate berapapun saya terima dan bakal mendapat fitur premium_*\n*Dana: 082135278036*`
    msg.reply(zexxaMsg).catch(() => { return msg.reply('gagal')})
    }
    }