const { default: WASocket, fetchLatestBaileysVersion, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Utility } = require('./utils/utility')
const logger = require('./utils/logger')
const { sessionName } = require('@config')
const { messageHandler } = require('./handlers')
const { Boom } = require('@hapi/boom')
const { existsSync } = require('fs')
const store = require('@store')
const Pino = require('pino')
const readline = require('readline')

existsSync('./store/baileys_store.json') && store.readFromFile('./store/baileys_store.json')
setInterval(() => {
    store.writeToFile('./store/baileys_store.json')
}, 60_000)

const utility = new Utility()
const question = (text) => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); return new Promise((resolve) => { rl.question(text, resolve) }) };

const connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(`./auth_info`)
    const { version, isLatest } = await fetchLatestBaileysVersion()

    const client = WASocket({
        printQRInTerminal: false,
        auth: state,
        logger: Pino({ level: 'silent' }),
        browser: ['MacOs', 'Chrome', '1.0'],
        version,
    })
    
    if (!client.authState.creds.registered) {
const phoneNumber = await question('Enter your phone number with country code without space and plus sign :\n');
let code = await client.requestPairingCode(phoneNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`Code :`, code);
    }

    store.bind(client.ev)

    client.ev.on('chats.set', () => {
        logger.store(`Got ${store.chats.all().length} chats`)
    })

    client.ev.on('contacts.set', () => {
        logger.store(`Got ${Object.values(store.contacts).length} contacts`)
    })

    client.ev.on('creds.update', saveCreds)
    client.ev.on('connection.update', async (up) => {
        const { lastDisconnect, connection, qr } = up

        if (qr) {
            logger.info('Please scanning QR Code to connect')
        }

        if (connection) {
            logger.info(`Connection Status: ${connection}`)
        }

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect.error).output.statusCode
            if (reason === DisconnectReason.badSession) {
                logger.error(`Bad Session File, Please Delete ./session/${sessionName}-session and Scan Again`)
                client.logout()
            } else if (reason === DisconnectReason.connectionClosed) {
                logger.error('Connection closed, reconnecting....')
                connect()
            } else if (reason === DisconnectReason.connectionLost) {
                logger.error('Connection Lost from Server, reconnecting...')
                connect()
            } else if (reason === DisconnectReason.connectionReplaced) {
                logger.error('Connection Replaced, Another New Session Opened, Please Close Current Session First')
                client.logout()
            } else if (reason === DisconnectReason.loggedOut) {
                logger.error(`Device Logged Out, Please Delete ./session/${sessionName}-session and Scan Again.`)
                client.logout()
            } else if (reason === DisconnectReason.restartRequired) {
                logger.error('Restart Required, Restarting...')
                connect()
            } else if (reason === DisconnectReason.timedOut) {
                logger.error('Connection TimedOut, Reconnecting...')
                connect()
            } else {
                client.end(new Error(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`))
            }
        }
    })

    // messages.upsert
    client.ev.on('messages.upsert', ({ messages, type }) => {
        if (type !== 'notify') return
        messageHandler(client, { messages, type })
    })
    
    client.ev.on('group-participants.update', async (anu) => {
        try {
            let participants = anu.participants
            let dbWelcome = await knex('welcome').where({ group_id: anu.id }).first()
            if (!dbWelcome) await knex('welcome').insert({ group_id: anu.id })

            let dbLeave = await knex('leave').where({ group_id: anu.id }).first()
            if (!dbLeave) await knex('leave').insert({ group_id: anu.id })

            for (let num of participants) {
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/55ab0c7288aba88544466.png'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await client.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://telegra.ph/file/55ab0c7288aba88544466.png'
                }

                if (anu.action == 'add') {
                    if (dbWelcome.type === 'text' && dbWelcome.status === 1) {
                        client.sendMessage(anu.id, { text: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbWelcome.type === 'image' && dbWelcome.status === 1) {
                        client.sendMessage(anu.id, { image: { url: dbWelcome.media }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbWelcome.type === 'video' && dbWelcome.status === 1) {
                        client.sendMessage(anu.id, { video: { url: dbWelcome.media }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbWelcome.type === 'ppuser' && dbWelcome.status === 1) {
                        client.sendMessage(anu.id, { image: { url: ppuser }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbWelcome.type === 'ppgrup' && dbWelcome.status === 1) {
                        client.sendMessage(anu.id, { image: { url: ppgroup }, caption: dbWelcome.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    }
                } else if (anu.action == 'remove') {
                    if (dbLeave.type === 'text' && dbLeave.status === 1) {
                        client.sendMessage(anu.id, { text: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbLeave.type === 'image' && dbLeave.status === 1) {
                        client.sendMessage(anu.id, { image: { url: dbLeave.media }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbLeave.type === 'video' && dbLeave.status === 1) {
                        client.sendMessage(anu.id, { video: { url: dbLeave.media }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbLeave.type === 'ppuser' && dbLeave.status === 1) {
                        client.sendMessage(anu.id, { image: { url: ppuser }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    } else if (dbLeave.type === 'ppgrup' && dbLeave.status === 1) {
                        client.sendMessage(anu.id, { image: { url: ppgroup }, caption: dbLeave.message.format({ user: '@' + num.split('@')[0] }), mentions: [num] })
                    }
                }
            }
        } catch (err) {
            logger.error(err)
        }
    })
}

module.exports = {
    connect,
}
