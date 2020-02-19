const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
bot.commands = new Discord.Collection();

const binance = require("node-binance-api");
const superagent = require("superagent");
const snekfetch = require("snekfetch");

const mysql = require("mysql");

//// sql section++++++++++++++++++++++
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: botconfig.sqlPass,
  database: "memeCoinsChatLogs"
});

sqlcon.connect(err => {
  if (err) throw err;
  console.log("connected to memeCoinsChatLogs database");
  //con.query("show tables", console.log);
});

//// end sql section ++++++++++++++++++++++

fs.readdir("./cmnds/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldnt find the command file");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./cmnds/${f}`);
    console.log(`${f} loaded`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`green wojack standing by on ${bot.guilds.size}`);
  bot.user.setActivity("The Crypto Market");
});

bot.on("message", async message => {
  //console.log("Server:",message.guild,"User",message.username,"content:",message.content);
  halp(message);

  if (message.author.bot) return; // makes it so a bot   ca
  if (message.channel.type === "dm") return; // dosnt respond to DM

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" "); // splits by a space...

  //var msgString = message.content;
  //ar cmdMatch = msgString.match(/bcc|bitconnect|scam/i);

  //!say turtle
  let args = messageArray.slice(1);
  let cmd = messageArray[0].toLowerCase();


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  //console.log(`we are right before commandfile.run and the file is ${commandfile}`)
  if (commandfile) commandfile.run(bot, message, args);
  else {
    // stops the program if there is no cmnd file
    // we would put the coin lookup in else

    //if (!command.startsWith(prefix)) return;

    if (cmd === `${prefix}sql`) {
      //return message.channel.send(carlosStrings[Math.floor(Math.random()* carlosStrings.length)]);
       var sql;


      sql = `INSERT INTO test (serverName ,serverID ,channelName ,ChannelID ,userName ,UserID ,content ,ContentID, timeStamp)
        VALUES ('${message.guild.name}', ${message.guild.id}, '${message.channel.name}',${message.channel.id},
        '${message.author.username}', ${message.author.id}, '${message.content}', ${message.id}, ${message.createdTimestamp} )`;

      sqlcon.query(sql);

      sqlcon.query(`SELECT * FROM test WHERE ContentID = '${message.id}'`, (err, rows) => {
    if(err) throw err;

    let sqlResult = rows[0].timeStamp;
    //console.log(Date(sqlResult));
//message.channel.send("Sql" + `${sqlResult}`)
    return ;





    });

}

    //  ++++++

    if (cmd === `${prefix}help`) {
      return message.channel.send("There is no help, you are on your own");
    }
    if (cmd === `${prefix}cmc`) {
      //if (err) throw err;

      const api = 'https://api.coinmarketcap.com/v2/listings/';
      snekfetch.get(api).then(r => {
        let bod = r.body;
        let symbol =  args[0].toUpperCase();
        console.log("args:"+args[0]);
        let  entry = bod.data.find(post => post.symbol === symbol);
        if (!entry) {
          return message.channel.send("yunocoin");
        }
        console.log("entery:" +entry.name);

        const api2 = `https://api.coinmarketcap.com/v2/ticker/${entry.id}/`;
        snekfetch.get(api2).then(r => {
          let bod2 = r.body;
          message.channel.send(bod2.data.rank);

        });

        //message.channel.send(entry.name);
      });

      return;
      // message.channel.send(body.find(post => post.id === 2));
    }

  if (cmd === `${prefix}chart`) {
          let valadTime =['1m','3m','5m','15m','30m','1h','2h','4h','6h','8h','12h','1d','3d','1w','1M'];

          let coinCodeBase = 'eth';

          coinCodeBase = coinCodeBase.replace("!", "").toUpperCase();


          /// -> if coincodebase dsont cointain BTC ETH USDT then insert BTC

          let time = args[0];
          if (valadTime.indexOf(time) <0){
            message.channel.send(`${time} isnt a valid time interval, I am going to use 5m. Feel free to use ${valadTime}.`);
            time = '5m';
          }






          // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

binance.candlesticks("BNBBTC", `${time}`, (error, ticks, symbol) => { // reasign the symbol and time
  console.log("candlesticks:", ticks);

  var candleJson = JSON.stringify(ticks);

  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  console.log(symbol +" last close:"+ close);
}, {limit: 75});



// works as the cut and paste
return message.channel.send('in log');
//return message.channel.send(`${last_tick}`); too big for the msg

        }


    if (!cmd.startsWith(prefix) | (cmd.length == 1)) {
      return console.log("no cnd");
    }

    if (cmd.length <= 5) {
      // this cmd shuld be last
      /// the top part needs to be changed lol

      binance.options({
        APIKEY: "<key>",
        APISECRET: "<secret>",
        useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
        test: true // If you want to use sandbox mode where orders are simulated
      });

      let coinCodeBase = cmd;
      let coinCodeBTC ;
      let coinCodeETH ;
      coinCodeBase = coinCodeBase.replace("!", "").toUpperCase();
      if (coinCodeBase === "BTC" ||coinCodeBase === "ETH" || coinCodeBase ==="USDT") {
        console.log("BTC ETH OR USDT");

        if ( coinCodeBase === 'BTC')
        {
          coinCodeBase = 'BTCUSDT';


        }
        if ( coinCodeBase === 'ETH')
        {
          coinCodeBase = 'ETHUSDT';


        }
        if ( coinCodeBase === 'USDT')
        {
          return message.channel.send("One Dolar");
        }

// for btc btc = 1 eth= btceth, BTCUSDT
// for eth eth = 1 btc = ETHBTC

      }
      else {
        // put them outside scope
        coinCodeBTC = coinCodeBase + "BTC";
        coinCodeETH = coinCodeBase + "ETH";

      }



      //let coinCodeUSDT = coinCodeBase + "USDT";

      binance.prices("USDTBTC", (error, ticker) => {
        if (error) {
          //console.log(err
          return message.channel.send("That coin isn't on binance");
        } // if it isnt there then return...
        console.log(ticker); // ticker is the json object returend by biancne.prices
        let btcValue = ticker[coinCodeBTC];
        
        binance.prices(coinCodeETH, (error, ticker) => {
          //let ethValue = ticker.BNBETH;
          let ethValue = ticker[coinCodeETH];
         
          binance.prices("BTCUSDT", (error, ticker) => {
            //let usdtValue = ticker[coinCodeUSDT];
            let usdtValue = ticker.BTCUSDT;
            



            // msgIcon btcvalue ethvalue usdtvalue
           coinPost(btcValue, ethValue, usdtValue,message);


            return;
          });
        });
      });
      //console.log("Price of BNB2: ", btcValue);
      //console.log("coinCodeBTC: ", coinCodeBTC);
      // btc value becomes undefiend whemn out of binacne.prices

      //return message.channel.send(carlosStrings[Math.floor(Math.random()* carlosStrings.length)]);
    }
  }
});

bot.login(botconfig.token);

function halp(message) {
 /// if servername is undefined then make server else
 // this can work if we have each bot have its table
 // datalogs database -> bot database -> chatlog database



  var sql;

  var contentString = message.content;
  contentString = contentString.replace(/['"]/g, '');
  var contentUsername =message.author.username;
  contentUsername= contentUsername.replace(/['"]/g, '');
  var contentGuildName = message.guild.name;
  contentGuildName = contentGuildName.replace(/['"]/g, '');
  var contentChannelName =message.channel.name;
  contentChannelName = contentChannelName.replace(/['"]/g, '');

  console.log("filteredString:",contentString );


  sql = `INSERT INTO test (serverName ,serverID ,channelName ,ChannelID ,userName ,UserID ,content ,ContentID, timeStamp)
   VALUES ('${contentGuildName}', ${message.guild.id}, '${contentChannelName}',${message.channel.id},
   '${contentUsername}', ${message.author.id}, '${contentString}', ${message.id}, ${message.createdTimestamp} )`;



  sqlcon.query(sql);

  sqlcon.query(`SELECT * FROM test WHERE ContentID = '${message.id}'`, (err, rows) => {
  if(err) throw err;

  let sqlResult = rows[0].timeStamp;
 
  //message.channel.send("Sql" + `${sqlResult}`)


  return ;
  });




  

  // get msg -> check if msg is in sql -> if no then put into the sql
  // or just check every few minutes to see if there are duplcates
}
function coinPost(btcValue, ethValue, usdtValue,message) {
  let msgIcon =
    "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png";
    let botembed = new Discord.RichEmbed()
    .setDescription("Price of")
    .setColor("#ffcc00") ///
    .setThumbnail(msgIcon)
    .addField("Rank:", "wip")
    .addBlankField(true)

    .addField(
      "Value",
      `**USD:** ${usdtValue * btcValue}` +
        `\n**BTC:** ${btcValue}` +
        `\n**ETH:** ${ethValue}`
    )

    .addBlankField(true)

    .addField(
      "Supply Info",
      "Market Cap:" + "\n24h volume:" + "\nSupply:"
    )
    //.addField()
    // ticker.ETHBTC was undefined
    .addBlankField(true)

    .addField(
      "Delta Info",
      `**Change 1h:** ${btcValue}`+
  `\n**Change 24h:**${btcValue}`+
  `\n**Change 7D:** ${btcValue}`

    )

    .setFooter("Candles from Binance")
    //.addBlankField(true)
    .setTimestamp()
    .setImage("http://i.imgur.com/yVpymuV.png");
  //.addField("Your avatarURL is", msgIcon);
   message.channel.send(botembed);
   return;

}
