const { ICommand } = require ('@libs/builders/command')
const { googleImage } = require('@bochilteam/scraper-images')
const axios = require ('axios')

module.exports = {

    category: 'Search',

    description: 'search image',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} banana',

    callback: async ({ msg, fullArgs }) => {
    let file = await googleImage(fullArgs)
    //console.log(file)
       let media =  file[Math.floor(Math.random() * file.length)]
       //console.log(media)
       msg.replyImage({url: media}, `success generate`).catch(() => { return msg.reply('error mengirim gambar')})
    }
    }


    