const fs = require('fs');

module.exports = {
  name: 'movienightdelete',
  aliases: ['mnd'],
  description: 'Removes an entry from the movie night watch list',
  guildOnly: true,
  args: true,
  usage: '<number>',
  cooldown: 2,
	execute(message, args, client) {

    fs.readFile('./commands/Movie Night/movieNight.json', 'utf-8', (err, watchList) => {
      parsedData = JSON.parse(watchList);

      if (!parsedData.hasOwnProperty(message.guild.id)) {
          message.channel.send("This server has no watchlist! :\(");
          return;
      }

      if (parsedData[message.guild.id].movies.length == 0) {
          message.channel.send("Nothing on the watch list");
          return;
      }

      number = parseInt(args[0]);
      try {
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

      delete parsedData[message.guild.id].movies[number - 1];
      //Filtering out nulls
      var filtered = parsedData[message.guild.id].movies.filter(function (el) {
        return el != null;
      });
      parsedData[message.guild.id].movies = filtered
      //If movies array is empty, remove server entry
      if (parsedData[message.guild.id].movies.length == 0 &&
        parsedData[message.guild.id].watched.length == 0 &&
        parsedData[message.guild.id].watching.name == '') {
        parsedData[message.guild.id] = undefined;
      }

      watchList = JSON.stringify(parsedData);
      fs.writeFile('./commands/Movie Night/movieNight.json', watchList, (err) => {});
      message.react('👍');
    });

  },
};
