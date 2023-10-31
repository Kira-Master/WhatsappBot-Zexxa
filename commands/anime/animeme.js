const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios')

module.exports = {
    category: 'Anime',
    description: 'Random Anime Meme',
    limit: true,
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '',
    example: '{prefix}{command} ',
    callback: async ({ msg, fullArgs }) => {
    
    let { data } = await axios.get('https://api.zahwazein.xyz/randomanime/animeme?apikey=zenzkey_8bc01f5847')
    if (data.status !=='OK') return msg.reply('rest api error')
    let zexxaMsg = `*_${data.result.caption}_*`
    
    msg.replyImage({ url: data.result.image}, zexxaMsg).then (() => 
    { return msg.reply('success')}).catch(() =>
    { return msg.reply('failed send image')})
        }
    }
    