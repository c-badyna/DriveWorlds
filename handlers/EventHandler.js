// Join my Discord Support Server! (A Cute As Yuudachi) //
// https://discord.gg/EbCccPCfSP //

const fs = require('fs');

module.exports.init = async (client) => {

    fs.readdirSync('./types/events').filter(s => s.endsWith('.js')).forEach(file => {

        const evt = require(`../types/events/${file}`)
        client.on(evt.name, evt.execute.bind(null, client))

    })

    console.log('[EventHandler] ---> :' + ' ' + 'The event handler is being launched. Please wait...');

}