const axios = require('axios').default

module.exports = {
    category: 'Stalking',
    description: 'Tiktok stalk',
    waitMessage: true,
    limit: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} paujyyygantengbanget',
    callback: async ({ msg, fullArgs }) => {
    
    let { data } = await axios.get('https://api.zahwazein.xyz/stalker/tiktok?username={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs}))
    /*return console.log(data)*/
   if ( data.status !=='OK') return msg.reply('api error')
    
    let zexxaMsg = `*_Berhasil stalk ${data.result.name}_*\n\n*Name: ${data.result.username}*\n*Followers: ${data.result.followers}*\n*Following: ${data.result.following}*\n*Description: ${data.result.description}*\n\n`
    
    msg.replyImage({url: data.result.profile}, zexxaMsg).catch (() => { return msg.reply('cant send message')})
      }
    }