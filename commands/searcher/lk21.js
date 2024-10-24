const { ICommand } = require('@libs/builders/command')
const { lk21 } = require('@libs/scraper/lk21.js')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: '-',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} pengabdi setan',
    callback: async ({ msg, fullArgs }) => {
        try {
        const data = await lk21(fullArgs)
        console.log(data)
        } catch(error) {
        console.error(error)
        }
    },
}
