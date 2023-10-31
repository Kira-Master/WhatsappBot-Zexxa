const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default

module.exports = {
    aliases: ['couple', 'cp'],
    category: 'Anime',
    description: 'Get Random Couple Picture',
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '<title>',
    example: '{prefix}{command}',
    callback: async ({ msg }) => {
        let { data } = await axios.get('https://docs.zexxa.tech/api/randomgambar/couplepp?apikey=11727aab')
    if ( data.status !== true) return msg.reply('fitur gangguan')
    
    msg.replyImage({url: data.result.male}, `Male`).catch(() => { return msg.reply('error sending image')})
    
    msg.replyImage({url: data.result.female}, `Female`).catch(() => { return msg.reply('error sending image')})
    
    }
    }