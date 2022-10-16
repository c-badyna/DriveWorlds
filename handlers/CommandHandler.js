// Join my Discord Support Server! (A Cute As Yuudachi) //
// https://discord.gg/EbCccPCfSP //

const fs = require('fs');

module.exports.init = async (client) => {

    for (let folder of fs.readdirSync('./types/commands')) {

        for (let file of fs.readdirSync(`./types/commands/${folder}`).filter(x => x.endsWith(".js"))) {

            const cmd = require(`../types/commands/${folder}/${file}`)
            client.arrayCommands.push(cmd.data.toJSON())
            client.commands.set(cmd.data.toJSON().name, cmd)

        }
    }

    console.log('[CommandHandler] ---> :' + ' ' + 'The command handler is being launched. Please wait...');
    client.application.commands.set(client.arrayCommands)

}