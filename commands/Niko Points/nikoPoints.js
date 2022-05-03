const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'nikopoints',
  aliases: ['np', 'nikop'],
  description: 'View your Niko Points balance.',
  guildOnly: false,
  args: false,
  usage: '',
  cooldown: 2,
	execute(message, args, client) {

    fs.readFile('./commands/Niko Points/nikoPoints.json', 'utf-8', (err, nikoPoints) => {
      parsedData = JSON.parse(nikoPoints);

      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(message.author.username + '\'s Niko Point\'s')
      .setURL('https://discordapp.com/users/' + message.author.id)
      .setThumbnail(message.author.avatarURL())
      .addFields(
    		{name: '**Balance**', value: parsedData[message.author.id].nikoPoints + ' NP'},
    		{name: '\u200B', value: '\u200B'},
    		{name: '**Multiplyer**', value: '1' + 'x', inline: true},
        {name: '**Skew**', value: '1', inline: true},
        {name: '\u200B', value: '\u200B'},
        {name: '**Minimium Point\'s**', value: '0', inline: true},
        {name: '**Maximium Point\'s**', value: '1000', inline: true}
      )
      .setTimestamp()
      .setFooter('Borgor Bot');
      message.channel.send(embed);

    });

  },
};
