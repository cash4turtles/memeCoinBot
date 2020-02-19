const Discord = require("discord.js");

const   permis = '8';
module.exports.run = async (bot,message,args) =>{





  return message.channel.send(`You can share ${bot.user.username} or add ${bot.user.username} to your server with this link!
    https://discordapp.com/oauth2/authorize?=&client_id=${bot.user.id}&scope=bot&permissions=${permis}`);




}

module.exports.help  = {
  name:"share"

}
