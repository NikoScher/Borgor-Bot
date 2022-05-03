const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'movienightroll',
  aliases: ['mnr', 'r'],
  description: 'Rolls a random entry from the movie night watch list',
  guildOnly: true,
  args: false,
  usage: '',
  cooldown: 2,
	execute(message, args, client) {

    fs.readFile('./commands/Movie Night/movieNight.json', 'utf-8', (err, watchList) => {
      parsedData = JSON.parse(watchList);

      if (!parsedData.hasOwnProperty(message.guild.id)) {
          message.channel.send("This server has no watchlist! :(");
          return;
      }

      message.channel.send("Rolling!");

      const ranNum = Math.floor((Math.random() * parsedData[message.guild.id].movies.length - 1) + 1);
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(parsedData[message.guild.id].movies[ranNum].name)
      .setURL(parsedData[message.guild.id].movies[ranNum].link)
      .setImage(parsedData[message.guild.id].movies[ranNum].img)
      .addField('Number: ', ranNum + 1, true)
      .setTimestamp()
      .setFooter('Watch List');
      message.channel.send(embed);
    });

  },
};
