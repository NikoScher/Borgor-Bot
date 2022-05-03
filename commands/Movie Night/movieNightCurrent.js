const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'movienightcurret',
  aliases: ['mnc'],
  description: 'Displays the movie that\'s currently being watched',
  guildOnly: true,
  args: false,
  usage: '',
  cooldown: 2,
	execute(message, args, client) {

    fs.readFile('./commands/Movie Night/movieNight.json', 'utf-8', (err, watchList) => {
      parsedData = JSON.parse(watchList);

      if (!parsedData.hasOwnProperty(message.guild.id)) {
          message.channel.send("This server has no watchlist! :\(");
          return;
      }

      if (parsedData[message.guild.id].watching.name == '') {
        message.channel.send('Nothing is being watched right now... *Unless... BNA?*');
        return;
      }

      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(parsedData[message.guild.id].watching.name)
      .setURL(parsedData[message.guild.id].watching.link)
      .setImage(parsedData[message.guild.id].watching.img)
      .setTimestamp()
      .setFooter('Watch List');
      message.channel.send(embed);

    });

  },
};
