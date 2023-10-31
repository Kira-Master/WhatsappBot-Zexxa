const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'downloader',

    description: '',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: 'link',

    example: '{prefix}{command} link',

    callback: async ({ msg, args }) => {
        try {
            let { data } = await axios.get('https://site.zexxa.tech/api/download/xnxxdl?url={url}&apikey=Zexxabot'.format({ url: args}))
            let msgX = `*Title: ${data.result.title}*
*Duration: ${data.result.duration}*
*Quality: ${data.result.quality}*
*Size: ${data.result.size}`
            
            if (data.result.sizeB >= '50000') {
                return msg.reply('File Over 25MB')
                } else {
            msg.replyVideo({url: data.result.url_dl}, msgX)
                    }
            } catch (e) {
                console.error(e)
                }
        }
    }

    