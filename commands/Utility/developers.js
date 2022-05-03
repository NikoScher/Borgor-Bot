const Discord = require('discord.js');

module.exports = {
  name: 'developers',
  aliases: ['d', 'dev'],
  description: 'Shows the developer(s) of Borgor.',
  guildOnly: false,
  args: false,
  usage: '',
  cooldown: 2,
	execute(message, args, client) {

    const ids = ['758080207272804492']

    getUsers(ids).then((users) => {
      console.log(users);
    });

/*
    const authors = new Discord.MessageEmbed()
  	.setColor('RANDOM')
  	.setTitle('Borgor Bot Developers')
  	.setURL('https://discordapp.com/users/758080207272804492/')
  	.setDescription('We Borgor Bot devs work hard! Not really, we just work on it for like 10 hours straight once in a blue moon...')
  	.setThumbnail(borgor.displayAvatarURL())
  	.addFields(
  		{ name: 'Regular field title', value: 'Some value here' },
  		{ name: '\u200B', value: '\u200B' },
  		{ name: 'Inline field title', value: 'Some value here', inline: true },
  		{ name: 'Inline field title', value: 'Some value here', inline: true },
  	)
  	.addField('Inline field title', 'Some value here', true)
  	.setImage('https://i.imgur.com/wSTFkRM.png')
  	.setTimestamp()
  	.setFooter('Devs', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send(authors);
*/

  async function getUsers(idArray) {
    var users = [];
    for (var id in idArray) {
      var user = await client.users.fetch(id);
      users.push(user);
    }
    return users;
  }

  },
};

// https://discordapp.com/users/117716590056701958/

// https://discordapp.com/users/279527928230969346/
