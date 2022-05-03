const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'movienight',
  aliases: ['mn'],
  description: 'Displays the movie night watchlist, adding a number as an argument displays that entry in the list, adding an \'e\' as an argument displays the embeded list',
  guildOnly: false,
  args: false,
  usage: '<!e> <!number>',
  cooldown: 2,
	execute(message, args, client) {

    const emojiNext = '➡';
    const emojiPrevious = '⬅';
    const reactionArrow = [emojiPrevious, emojiNext];
    const time = 60000; // Time in ms
    const viewCount = 10;
    var list = [];

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

      if(args.length == 0) {
        const moviesIt = parsedData[message.guild.id].movies[Symbol.iterator]();
        var currMovie = moviesIt.next();
        for (var i = 0; i < Math.ceil(parsedData[message.guild.id].movies.length / viewCount); i++) {
          var embed = new Discord.MessageEmbed()
          .setColor('#185AE7')
          .setTitle('Movie Night Watch List!');
          var text = '';
          var counter = 0;
          while (!currMovie.done && counter < viewCount) {
            text += (10 * i + counter + 1) + ' - ' + currMovie.value.name + '\n';
            currMovie = moviesIt.next();
            counter++;
          }
          embed.setDescription(text);
          list.push(embed);
        }
        sendList(message.channel, getList);
        return;
      }

      if(args.length != 0 && args[0] == 'e') {
        var text = '';
        for (var i = 0; i < parsedData[message.guild.id].movies.length; i++) {
          const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(parsedData[message.guild.id].movies[i].name)
          .setURL(parsedData[message.guild.id].movies[i].link)
          .setImage(parsedData[message.guild.id].movies[i].img)
          .addField('Number: ', i + 1, true)
          list.push(embed);
        }
        sendList(message.channel, getList);
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

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(parsedData[message.guild.id].movies[number - 1].name)
        .setURL(parsedData[message.guild.id].movies[number - 1].link)
        .setImage(parsedData[message.guild.id].movies[number - 1].img)
        .addField('Number: ', number, true)
        .setTimestamp()
        .setFooter('Watch List');
        message.channel.send(embed);
      }
      catch (err) {
        message.channel.send('That\'s not a a valid argument!');
        return;
      }

    });

    //Don't touch for the love of god, Reaction code
    function getList(i) {
      var slice = list[i];
      if (slice === undefined)
       return slice;
      return slice.setTimestamp().setFooter(`Page ${i+1}`);
    }

    function filter(reaction, user){
      return (!user.bot) && (reactionArrow.includes(reaction.emoji.name));
    }

    function onCollect(emoji, message, i, getList) {
      if (emoji.name === emojiPrevious) {
       var embed = getList(i - 1);
       if (embed === undefined)
         i = list.length - 1;
       else
         i--;
       embed = getList(i);
       message.edit(embed);
     } else if (emoji.name === emojiNext) {
       var embed = getList(i + 1);
       if (embed === undefined)
         i = 0;
       else
         i++;
       embed = getList(i);
       message.edit(embed);
     }
     return i;
    }

    function createCollectorMessage(message, getList) {
      var i = 0;
      const collector = message.createReactionCollector(filter, { time });
      collector.on('collect', r => {
        i = onCollect(r.emoji, message, i, getList);
      });
    }

    function sendList(channel, getList){
      channel.send(getList(0))
        .then(msg => msg.react(emojiPrevious))
        .then(msgReaction => msgReaction.message.react(emojiNext))
        .then(msgReaction => createCollectorMessage(msgReaction.message, getList));
    }

  },
};
