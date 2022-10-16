// Heya~ Thanks for using my handler! //
// Please Treat it well //
// Pardon my England, I'm from Russian! //

// Join my Discord Support Server! (A Cute As Yuudachi) //
// https://discord.gg/EbCccPCfSP //

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 3276543 });

client.config = require('./config.json')

client.commands = new Collection( );
client.arrayCommands = [ ];

require('./handlers/EventHandler').init(client);
client.login(client.config.token)

// I hope you enjoy ! // 
