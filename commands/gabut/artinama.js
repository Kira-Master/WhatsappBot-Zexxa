const x = require ('axios')

module.exports = {

    category: 'Gabut',

    description: 'arti nama kamu',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<nama>',

    example: '{prefix}{command} zexxa',

    /* Callback */

    callback: async({msg, fullArgs}) => {

        /* SCRAPE */

        let { data } = await x.get('https://api.caliph.biz.id/api/artinama?nama={txt}&apikey=caliphkey'.format({txt: fullArgs}))

        if (data.status !== true) { return msg.reply('api error/nama kamu jelek')}

        msg.reply(`*Arti nama kamu adalah*\n\n*Nama kamu: ${data.nama}*\n*Memiliki arti* ${data.arti}`).catch(()=> { return msg.reply('nama kamu gaada arti')})

            

        }

    }

