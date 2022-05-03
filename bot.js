//Requires
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

//Creating objects
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

//Setting up dynamic commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

//Start-up
client.login(token);
client.on('ready', () => {
  console.log('Logged in and ready to go!');
  console.log('Prefix: ' + prefix);
	console.log('\n');
	client.user.setActivity('with Furret', {
	  type: 'STREAMING',
	  url: 'https://youtu.be/m7iq5TgF6mY'
	});
});

//Command handler
client.on('message', message => {

/*

	//Porb Patrol
	if (message.author.id == '330132366603452417') {
		//message.channel.send("*You know the rules...*");
		return;
	}

*/

  //Checking for command;
	if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //Check if it's actaully a command
    if (!command)
      return;

    //Server only commands
    if (command.guildOnly && message.channel.type === 'dm')
	     return message.reply('I can\'t execute that command inside DMs!');

    //Command permissions
    if (command.permissions) {
   	  const authorPerms = message.channel.permissionsFor(message.author);
   	  if (!authorPerms || !authorPerms.has(command.permissions))
   		return message.reply('Soz fam, you don\'t have permission to do that...');
    }

    //Required arguments and expected usage
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments ${message.author}!`;
      if (command.usage)
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      return message.channel.send(reply);
    }

    //Command cooldowns
    const {cooldowns} = client;
    if (!cooldowns.has(command.name)) {
    	cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    	if (now < expirationTime) {
    		const timeLeft = (expirationTime - now) / 1000;
    		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	     }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //Command execution
  	try {
  		command.execute(message, args, client);
  	}
    catch (error) {
  		console.error(error);
  		message.channel.send('Something went wrong! Contact Borgors devs using `>developers`');
  	}
  }
});
