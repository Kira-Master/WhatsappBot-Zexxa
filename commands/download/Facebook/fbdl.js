const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default


module.exports = {
    aliases: ['facebookdl'],
    category: '',
    description: 'Facebook Downloader',
    waitMessage: true,
    premiumOnly: false,
    limit: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://Facebook.com',
    callback: async ({ msg, args }) => {
                let { data } = await axios.get('https://site.zexxa.tech/api/download/facebook?url={url}&apikey=Zexxabot'.format({ url: args }))
                /* return console.log(data) */
                
                //if ( data.status !== true) return msg.reply('cannot find HD video, try !fbsd')
                
                let zexxaMsg = `*BERHASIL MENDAPATKAN VIDEO*`
                
                msg.replyVideo({ url: data.result.videoUrl }, zexxaMsg).catch(() => { return msg.reply('gagal mengirim video')})
                }
                
    }