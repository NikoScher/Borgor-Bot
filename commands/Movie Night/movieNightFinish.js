const fs = require('fs');

module.exports = {
  name: 'movienightfinish',
  aliases: ['mnf'],
  description: 'Set a movie to finished status',
  guildOnly: true,
  args: false,
  usage: '',
  cooldown: 2,
	execute(message, args, client) {

    message.channel.send('To be impmented');

  },
};
