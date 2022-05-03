const fs = require('fs');

module.exports = {
  name: 'nikopointsbyebye',
  aliases: ['npbb', 'byebye'],
  description: 'LMAO ICY',
  guildOnly: false,
  args: true,
  usage: '<ID>',
  cooldown: 3600,
	execute(message, args, client) {

    fs.readFile('./commands/Niko Points/nikoPoints.json', 'utf-8', (err, nikoPoints) => {
      parsedData = JSON.parse(nikoPoints);

      parsedData[args[0]].nikoPoints -= 1;
      message.channel.send('1NP has been subtracted from ' + args[0] + ' total.');

      nikoPoints = JSON.stringify(parsedData);
      fs.writeFile('./commands/Niko Points/nikoPoints.json', nikoPoints, (err) => {});

      message.channel.send('Their total is now ' + parsedData[args[0]].nikoPoints + 'NP');

    });

  },
};
