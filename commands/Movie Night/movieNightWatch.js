const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'movienightwatch',
  aliases: ['mnw'],
  description: 'Set what movie is currently being watched',
  guildOnly: true,
  args: true,
  usage: '<number>',
  cooldown: 2,
	execute(message, args, client) {

    message.channel.send('To be impmented');
    return;

    fs.readFile('./commands/Movie Night/movieNight.json', 'utf-8', (err, watchList) => {
      parsedData = JSON.parse(watchList);

      if (!parsedData.hasOwnProperty(message.guild.id)) {
          message.channel.send("This server has no watchlist! :\(");
          return;
      }

      if (!parsedData[message.guild.id].watching.name == '') {
        message.channel.send('Already watching ' + parsedData[message.guild.id].watching.name + '!');
        return;
      }

      if (parsedData[message.guild.id].movies.length == 0) {
          message.channel.send("Nothing on the watch list");
          return;
      }

      try {
        number = parseInt(args[0]);
        if (isNaN(number)) {
          message.channel.send('That\'s not a a valid argument!');
          return;
        }
        if(number < 1 || number > parsedData[message.guild.id].movies.length) {
          message.channel.send("Not in range! Try 1 - " + parsedData[message.guild.id].movies.length);
          return;
        }
      }
      catch (err) {
        message.channel.send('Error!');
        return;
      }

      parsedData[message.guild.id].watching = parsedData[message.guild.id].movies[args[0] - 1];
      watchList = JSON.stringify(parsedData);
      fs.writeFile('./commands/Movie Night/movieNight.json', watchList, (err) => {});

      delete parsedData[message.guild.id].movies[number - 1];
      //Filtering out nulls
      var filtered = parsedData[message.guild.id].movies.filter(function (el) {
        return el != null;
      });
      parsedData[message.guild.id].movies = filtered
      watchList = JSON.stringify(parsedData);
      fs.writeFile('./commands/Movie Night/movieNight.json', watchList, (err) => {});
      message.react('👍');

    });

  },
};
