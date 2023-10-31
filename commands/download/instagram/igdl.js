const { ICommand } = require ('@libs/builders/command')
const logger = require ('@libs/utils/logger')
const axios = require ('axios')

module.exports = {

    category: 'Download',

    description: 'Download Instagram Media',

    limit: false,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<link>',

    example: '{prefix}{command} https://instagram.com/p/',

    callback: async ({ msg, args }) => {
        
        
        try {
            let { data } = await axios.get('https://site.zexxa.tech/api/download/instagram?url={url}&apikey=Zexxabot'.format({url: args[0]}))
            await msg.replyVideo({url: data.result[0].download_link}, '*nih kak,sama-sama*')
            }catch(err) {
                throw err
                logger.error(err)
                }
        }
    }

        
        
        
        
        
        

    