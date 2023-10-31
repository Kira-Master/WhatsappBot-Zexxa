const { ICommand } = require('@libs/builders/command')
const logger = require ('@libs/utils/logger')
const x = require('axios')

module.exports = {

    category: 'Premium',

    description: 'Download File From Sfile',

    waitMessage: true,

    premiumOnly: true,
    
    minArgs: 1,

    expectedArgs: '<link>',

    example: '{prefix}{command} sfile',

    callback: async ({ msg, args, client, message }) => {
        try {
            let { data } = await x.get('https://docs.zexxa.tech/api/dowloader/sfilemobi?url={link}&apikey=11727aab'.format({link: args[0]}))
//console.log(data)
          
      //console.log(mime)
            //for (var i of sc) {
           let msgX = `*BERHASIL MENDOWNLOAD FILE*\n\n*Title*: ${data.result.filename}\n*Type: ${data.result.type}*\n*Size: ${data.result.filesizeH}*\n*Author: ${data.result.upload_by}*\n*Upload Date: ${data.result.upload_date}*\n*Total Download: ${data.result.downloads_count}*\n\n*_FILE SEDANG DIKIRIM_*`
           
           msg.reply(msgX)
           
           let res = await x.head(data.result.url)
        //  console.log(res)
     let mime = res.headers['content-type']
               
             // client.sendMessage(msg.from, { document: data.ZeroOne_API.result.url, mimetype: data.ZeroOne_API.result.mimetype, fileName: data.ZeroOne_API.result.filename }, { quoted: message }).catch(() => { return msg.reply('gagal mengirim file')})
            
            msg.replyDocument({ url: data.result.url }, mime, data.result.filename).catch(() => { return mime.reply('gagal')})
            
            } catch(error) {
                throw error
                logger.error(error)
                }

                      
        }
    }
                                 
                                 
                                 
                                 
                                 
                                 
