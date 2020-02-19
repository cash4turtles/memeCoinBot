const Discord = require("discord.js");

const pinkPics = ['https://cdn.discordapp.com/attachments/443994112811859998/443994211533062144/d74.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994212762124299/d79.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994221276299275/fd4.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994221402259456/f60.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994221712637957/f08.jpeg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994222400634881/de7.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994223168061452/e31.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994226535956480/0e8.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994226863112202/ea2.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994347680169986/5da.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994348686802944/4fe.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994360082857998/7fa.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994366508531723/8be.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994368378929162/9a6.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994371361210378/25e.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994381263831041/37d.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994386993381377/82a.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994388021116938/098.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994387911802880/67c.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994423840342016/889.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994471219068929/1498108951488.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994471416332309/33481015d04b3974f9ed7acf616592901b13507ebdabf48ee1d6d09d63acc2c4.jpg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994472120975360/a4f.jpeg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994473849159680/964.gif',
'https://cdn.discordapp.com/attachments/443994112811859998/443994482145230848/a09.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994499296002064/a18.jpeg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994506677846016/b83.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994516500905992/bb7.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994519512416266/c2d.jpeg',
'https://cdn.discordapp.com/attachments/443994112811859998/443994520137236480/bed.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994520435294209/c6f.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994523006402570/c55.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994527146049547/cfb.png',
'https://cdn.discordapp.com/attachments/443994112811859998/443994529696317441/d62.jpg']
module.exports.run = async (bot,message,args) =>{



return message.channel.send("", {
  file:`${ pinkPics[Math.floor(Math.random()* pinkPics.length)]}`
});

//return message.channel.send("RRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");



}

module.exports.help  = {
  name:"wojack"
}
