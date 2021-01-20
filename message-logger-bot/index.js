const Discord = require("discord.js");
const client = new Discord.Client()
const config = require("./config.json")
const {token, prefix} = require("./config.json")
const moment = require("moment")
const fs = require("fs")

client.setMaxListeners(0);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  const mabe = [`Made by Diablo#0005`, `github.com/DiabloTheDev`];

  setInterval(function() {
    let awnser = mabe[Math.floor(Math.random() * mabe.length)]

    client.user.setActivity(`${awnser}`);

  }, 10000);
});

client.on('error', console.error);

client.on("message", async message => {
  message.channel.messages.fetch().then(async messages => {
    console.log(`${messages.size}`); // This counts all messages sent in the server

    const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
  
    fs.appendFile('logger.txt', `${handleTime(message.timestamp)} ${message.author.username + '#' + message.author.discriminator} : ${message.content + '\n'}`, (err) => {
      if (err) throw err; // Every message sent is being saved on the .txt file
    });
  
  });
})

client.login(config.token)