const fs = require('fs');

module.exports = {
  name: 'nikopointsdaily',
  aliases: ['npd', 'nikopd'],
  description: 'Adds a random amount of Niko Points to your balance once per day',
  guildOnly: false,
  args: false,
  usage: '',
  cooldown: 1,
	execute(message, args, client) {

    const date = new Date();
    const stringDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    var isNewUser = false;

    fs.readFile('./commands/Niko Points/nikoPoints.json', 'utf-8', (err, nikoPoints) => {
      parsedData = JSON.parse(nikoPoints);

      //If user has never used niko points
      if (!parsedData.hasOwnProperty(message.author.id)) {
        const np = randn_bm(0, 1000, 1);
        const newUser = {
          "nikoPoints": np,
          "lastUsed": stringDate,
        };
        isNewUser = true;
        parsedData[message.author.id] = newUser;
        message.channel.send('New user registered! You just got ' + np + 'NP');
      }
      //Check if its been 24 hours
      else if (stringDate != parsedData[message.author.id].lastUsed) {
        const np = randn_bm(0, 1000, 1);
        parsedData[message.author.id].nikoPoints += np;
        parsedData[message.author.id].lastUsed = stringDate;
        message.channel.send('Pog! You just got ' + np + 'NP');
        message.channel.send('Your total balance is now ' + parsedData[message.author.id].nikoPoints + 'NP');
      }
      else {
        message.channel.send('Come back tomorrow for more Niko Points!');
      }

      nikoPoints = JSON.stringify(parsedData);
      fs.writeFile('./commands/Niko Points/nikoPoints.json', nikoPoints, (err) => {});
    });

    function randn_bm(min, max, skew) {
      let u = 0, v = 0;
      while(u === 0)
        u = Math.random();
      while(v === 0)
        v = Math.random();
      var num = Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI*v);

      num = num / 10.0 + 0.5;
      if (num > 1 || num < 0)
        num = randn_bm(min, max, skew);
      else {
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
      }
      return Math.round(num);
    }

  },
};
