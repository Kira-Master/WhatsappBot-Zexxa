const { ICommand } = require('@libs/builders/command')
const x = require ('caliph-api')
const axios = require('axios').default
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { sfileSearch } = require('@libs/lib.function.js')
module.exports = {

    category: 'Search',

    description: 'Search Sfilemobi File',

    cooldown: 10 * 1000,
    waitMessage: true,
    limit: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Anime',

    callback: async ({ msg, fullArgs }) => {
        try {
            let xxx = await sfileSearch(fullArgs, 1)
            console.log(xxx)
            } catch(e) {
                console.error(e)
                }
      //  msg.reply(zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
            
         }
    }
