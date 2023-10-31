const axios = require ('axios').default


module.exports = {
    aliases: ['dare', 'tod'],
    category: 'Gabut',
    description: 'Truth Or Dare',
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '<title>',
    example: '{prefix}{command}',
    callback: async ({ msg, args }) => {
        let tod = await axios.get('https://api.botcahx.live/api/random/dare?apikey=DeHBriJv').catch(() => { return msg.reply('api error')})
        let zexxaMsg = `Saya Tantang Kamu ${tod.data.result}`
        msg.reply(zexxaMsg).catch(() => { return msg.reply('gagal mengirim pesan')})
        }
    }