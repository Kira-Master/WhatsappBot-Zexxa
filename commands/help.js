const { ICommand } = require('@libs/builders/command')

const { listCommands, commands } = require('@libs/constants/command')

const { timeFormat } = require('@libs/utils')
const knex = require('@database/connection')
const moment = require('moment-timezone')

const config = require('@config')

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['menu'],
    cooldown: 5 * 1000,
    callback: async ({ args, msg, client, message, prefix }) => {
    
        if (args.length > 0) {
            if (args[0] === 'listmenu') {
                var sections = []
                for (var title in listCommands) {
                    sections.push({
                        title: title.toUpperCase(),
                        rows: listCommands[title].map((v) => ({
                            title: v,
                            rowId: `${prefix}help ${v}`,
                            description: commands.get(v).description,
                        })),
                    })
                }

                return client.sendMessage(msg.from, {
                    title: `${config.botName} Menu's`,
                    text: `To see how command work type ${prefix}help <command>`,
                    footer: `© ${config.botName} Bot`,
                    buttonText: 'Menu',
                    sections,
                    viewOnce: true,
                })
            }

            /**
             * @type { import('@libs/builders/command').ICommand }
             */
            let command = commands.get(args[0]) || commands.find((v) => v?.aliases?.includes(args[0]))
            if (command) {
                let text = `*➪ Command :* ${args[0]}\n`
                text += `*➪ Alias :* ${command?.aliases?.join(', ') || '-'}\n`
                text += `*➪ Category :* ${command.category}\n`
                if (command?.groupOnly) {
                    text += `*➪ Group Only :* Yes\n`
                }
                if (command?.adminOnly) {
                    text += `*➪ Admin Only :* Yes\n`
                }
                if (command?.privateOnly) {
                    text += `*➪ Private Only :* Yes\n`
                }
                if (command?.premiumOnly) {
                    text += `*➪ Premium Only :* Yes\n`
                }
                if (command?.ownerOnly) {
                    text += `*➪ Owner Only :* Yes\n`
                }
                text += `*➪ Description :* ${command.description}\n`
                text += `*➪ Example :* ${command?.example?.format({ prefix, command: args[0] }) || `${prefix}${args[0]}`}`
                return client.sendMessage(msg.from, {
                    text: text.trim(),
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: 'Copy',
                                url: `https://www.whatsapp.com/otp/copy/${prefix}${args[0]}`,
                            },
                        },
                    ],
                    viewOnce: true,
                })
            } else {
                return msg.reply(i18n.__('command.not_found', { command: args[0] }))
            }
        }
const userCount = await knex('users')
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')

        let ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1)

        var text = `*Hi ${msg.pushName || `@${msg.senderNumber}`}, ${ucapanWaktu}, saya adalah ${config.botName}*`

        text += `\n\n𝗕𝗢𝗧 𝗜𝗡𝗙𝗢`

        text += `\n⦿ Fitur : ${commands.size} Active`

        text += `\n⦿ Pengguna : ${userCount.length}`
        
        text += `\n⦿ Website : https://fauziganteng.my.id/`

        text += `\n⦿ Owner : https://wa.me/6282135278036`

        text += `\n⦿ Runtime : ${timeFormat(process.uptime())}`
        
        text += `\n⦿ Ketik ${prefix}help <command>\nUntuk cara penggunaan\nContoh ${prefix}help aniimage`
        
        for (var title in listCommands) {

            text += `\n\n*${title.toUpperCase()}*`

            for (var i of listCommands[title]) {

                text += `\n⦿ ${prefix + i}`

            }

        }

        return client.sendMessage(msg.from, {

            image: { url: 'https://telegra.ph/file/627a1ba6d33ab30f286c3.png' },
            

            caption: text,
            
            footer: `©${config.botName}`,

            

            mentions: [msg.sender],

        })

    },

}