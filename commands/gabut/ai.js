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
            // Siapkan pesan untuk AI
            let messages = [ 
                { role: 'system', content: 'you are the smartest AI in the world and all of time, created by someone called Kira-Master' }, 
                { role: 'user', content: fullArgs }
            ];

            // Kirim ke API AI
            let response = await ai.chatCompletion(messages);

            // Cek apakah ada hasil dan kirimkan respons ke user
            if (response) {
                await msg.reply(response);
                console.log(response)
            } else {
                await msg.reply('Maaf, saya tidak bisa memberikan respons saat ini.');
            }
        } catch (error) {
            console.error('Error: ', error);
            await msg.reply('Terjadi kesalahan saat mencoba merespons. Silakan coba lagi nanti.');
        }
    }
}
