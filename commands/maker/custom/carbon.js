const { ICommand } = require ('@libs/builders/command')
const fs = require('fs')
const axios = require ('axios')

module.exports = {

    category: 'maker',

    description: 'turn to carbon',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: 'code',

    example: '{prefix}{command} syntax',

    callback: async ({ msg, fullArgs }) => {
        try {
            let data = await axios({

            url: 'https://carbonara.solopov.dev/api/cook',

            method: 'post',

            headers: {

                'Content-Type': 'application/json'

            },

            data: { code: fullArgs },

            responseType: 'arraybuffer'

        })
            //console.log(data)
            await fs.writeFileSync('carbon.png', data.data)
           msg.replyImage({url: 'carbon.png'})
            } catch(e) {
                msg.reply('gagal')
                }
        }
    }
