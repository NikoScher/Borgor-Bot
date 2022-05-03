const fs = require('fs');

module.exports = {
  name: 'movienightadd',
  aliases: ['mna'],
  description: 'Adds an entry to the movie night watch list',
  guildOnly: true,
  args: true,
  usage: '<title> <link> <img url>',
  cooldown: 2,
	execute(message, args, client) {

    //Create new movie object
    const name = args.slice(0, args.length - 2).join(' ');
    const newMovie = {
      "name": name,
      "link": args[args.length - 2],
      "img": args[args.length - 1],
    };

    fs.readFile('./commands/Movie Night/movieNight.json', 'utf-8', (err, watchList) => {
      parsedData = JSON.parse(watchList);
      //If no watch list exists on server, make one
      if (!parsedData.hasOwnProperty(message.guild.id)) {
        const newEntry = {
          "movies": [],
          "watched": [],
          "watching": {
            "name": '',
            "link": '',
            "img": '',
          }
        };
        parsedData[message.guild.id] = newEntry;
      }
      parsedData[message.guild.id].movies.push(newMovie);
      watchList = JSON.stringify(parsedData);
      fs.writeFile('./commands/Movie Night/movieNight.json', watchList, (err) => {});
      message.react('👍');
    });

  },
};
