const { ICommand } = require('@libs/builders/command')
const { G4F } = require('g4f')
const axios = require('axios').default
let ai = new G4F()

module.exports = {
    category: 'Gabut',
    description: 'AI',
    waitMessage: false,
    minArgs: 1,
    expectedArgs: '<prompt>',
    example: '{prefix}{command} halo ai',
    callback: async ({ msg, fullArgs }) => {
    try { 
    let messages = [ 
    { role: 'system', content: 'you are the smartest AI in the world and all of time, you created by someone called Kira-Master' }, { role: 'user', content: fullArgs }
    ]
    let response = await ai.chatCompletion(messages)
    await msg.reply(response)
    } catch(error) {
    console.error('Error: ', error)
    }
    }