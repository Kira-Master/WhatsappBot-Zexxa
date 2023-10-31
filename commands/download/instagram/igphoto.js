const { ICommand } = require('@libs/builders/command')

const x = require('@libs/xfarr')

const z = require('axios').default

module.exports = {

    aliases: ['igp', 'igphoto'],

    category: 'Download',

    description: 'Instagram Downloader',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} https://instagram/p/',

    callback: async ({ msg, args }) => {

    let { data } = await z.get('https://api.akuari.my.id/downloader/igdl?link={link}'.format({link: args[0]}))

    /*return console.log(data)*/

        

    //if ( data.status !== true) return msg.reply('link tidak valid, atau fitur error')

    

    let zexxaMsg = `*BERHASIL MENDAPAT MEDIA*`

    

    for ( let i of data.respon ) {

    

    

    msg.replyImage({ url: i}, zexxaMsg).catch(() => { return msg.reply('Gagal mengirim media')})

    }

    }

    }

    

