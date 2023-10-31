const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'youtube',

    description: 'play mp4 video',

    cooldown: 60 * 1000,
    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} rrq vs ae',

    callback: async ({ msg, fullArgs }) => {
    try {
        let { data } = await axios.get('https://zerooneapi.my.id/api/search/ytplay?apikey=81d9ca3d&text={txt}'.format({txt: fullArgs}))

            if (data.ZeroOne_API.status !== 'true') return msg.reply('not found, please try again')
        let msgX = `*Title*: *${data.ZeroOne_API.result.title}*\n*Views*: *${data.ZeroOne_API.result.view}*\n*Upload Date*: *${data.ZeroOne_API.result.uploadDate}*\n*Duration*: *${data.ZeroOne_API.result.timestamp}*`
        
       /* msg.replyImage({url: data.ZeroOne_API.result.thum}, msgX).catch(() => { return msg.reply('gagal mendapat data')}).then(() => { */msg.replyVideo({url: data.ZeroOne_API.result.mp4.result}, msgX).catch(() => { return msg.reply('Terjadi kesalahan, coba lagi!') })
        }catch(err){
            throw err
            console.log(err)
    }
    }
    }

    