const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

module.exports = {

    category: 'Gabut',

    description: 'AI',

    waitMessage: false,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Anime',

    callback: async ({ msg, fullArgs }) => {
   let xxx = await axios.get('https://docs.zexxa.tech/api/ai/zexxaai?text={query}&apikey=11727aab'.format({query: fullArgs}))
   //if ( xxx.data.status !== true) return msg.reply('i dont understand')
        let zexxaMsg = `${xxx.data.result}`
         
        msg.reply(zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') }) 
                                                       },
                                                }
                                                                                                                         
                                                                                                                         
                                                                                                                         
                                                                                                                         
                                                                                                                         