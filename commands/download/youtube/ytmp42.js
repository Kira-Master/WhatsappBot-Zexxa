const x = require ('axios').default

const { ICommand } = require ('@libs/builders/command')

module.exports = {

    category: 'youtube',

    description: 'download mp4 server 2',

    cooldown: 30 * 1000,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} https://youtu.be/LsyvuEegVA4',

    callback: async({msg, args, client, message}) => {
        try {

        let { data } = await x.get('https://xzn.wtf/api/y2mate?url={link}&apikey=zexxabot'.format({link: args[0]}))
        //return console.log()
        let msgX = `*DATA BERHASIL DI DAPAT*`
        //for ( var i of xxx ) {
            msgX += `\n\n*Title*: *${data.title}*`
            msgX += `\n*Size*: *${data.video['720p'].fileSizeH}*`
            msgX += `\n*Quality*: *${data.video['720p'].quality}*`
            msg.replyImage({url: data.thumbnail}, msgX).catch(() => { return msg.reply('gagal mendapat data!')}).then(() => { return msg.reply('*_Sedang mengirim video_*')})

            msg.replyVideo({url: data.video['720p'].url}).catch(() => { return msg.reply('Terjadi kesalahan') })
            } catch(error){
                console.log(error)
                }
        
            
        }
    }
        
        
        