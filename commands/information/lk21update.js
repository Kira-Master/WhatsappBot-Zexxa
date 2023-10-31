const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default

module.exports = {
  
    category: 'Information',
    description: 'Get Random Couple Picture',
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '<title>',
    example: '{prefix}{command}',
    callback: async ({ msg }) => {
        let xxx = await axios.get('https://api.botcahx.live/api/webzone/lk21latest?apikey=DeHBriJv')
       /*return console.log(data)*/
        
        if ( xxx.data.status !== true) return msg.reply('no update right now')
        
        let zexxaMsg = `*UPDATE INFORMATION LK21*\n\n`
        
        for ( var x of xxx.data.result ){
            
        zexxaMsg +=`*Title: ${x.title}*\n`
        zexxaMsg +=`*Genre: ${x.genre}*\n`
        zexxaMsg +=`*Date Created: ${x.dateCreated}*\n`
        zexxaMsg +=`*Rating: ${x.rating}*\n`
        zexxaMsg +=`*Duration: ${x.duration}*\n`
        zexxaMsg +=`*Type: ${x.type}*\n`
        zexxaMsg +=`*Director: ${x.director}*\n`
        zexxaMsg +=`*Url: ${x.url}*\n\n`
        
        msg.replyImage({ url: x.thumbnail}, zexxaMsg).catch(() => { return msg.reply('failed send message')})
            }
          }
    }