//Bots config file
const config = require('./config.json');
//Discord client constructor
const Discord = require('discord.js');
const client = new Discord.Client();
//When the bots client becomes ready to start working.
client.on('ready', () => {
  console.log('Bot connected as ' + client.user.tag);
  //Set a activity for the bot
  client.user.setActivity("Sir.Yeets favorite album", {type: "Listening"}); //Playing, Streaming, Listening, Watching
  //For every channel
  client.guilds.forEach((guild) =>  {
  	console.log("The bot is connected to the following servers: " + guild.name);
  	//Look for channels
  	guild.channels.forEach((channel) => {
  	  console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
  	});
  });
  //Let us access the general text channel from anywhere later on
  let generalChannel = client.channels.get(config.server.generalChannelID);
  //Send a welcome message when we're ready
  const attachment = new Discord.Attachment("https://media.tenor.com/images/5c20d60feaf4d810847bb0c5191135c6/tenor.gif");
  generalChannel.send('Hello plebs!', attachment);
});
//When the bot detects a message in any channel
client.on('message', function(receivedMessage) {
  if(receivedMessage.author ==  client.user) {
  	return true;
  	console.log('The bot detected a message from it self: ' + receivedMessage.content);
  }
  if(receivedMessage.content.startsWith('!')) {
  	processCommand(receivedMessage);
  } else {
  	console.log('The bot detected a message from ' + receivedMessage.member.user.tag + ', message: ' + receivedMessage.content);
	receivedMessage.channel.send('Thank you for the message ' + receivedMessage.author.toString() + '!');
	//React to the users message
	receivedMessage.react("🤣");
  }
});
//Process channel commands
function processCommand(receivedMessage) {
  console.log('Bot command ' + receivedMessage.content + ' received from ' + receivedMessage.member.user.tag);
  //Spilt the command into separate strings
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(' ');
  let primaryCommand = splitCommand[0];
  let argument = splitCommand.slice(1);
  //All commands call a function
  switch(primaryCommand) {
  	case 'help':
      helpCommand(argument, receivedMessage);
  	break;
    //Default command option
  	default:
  	  defaultCommand(receivedMessage);
  	break;
  }
}
//helpCommand function
function helpCommand(argument, receivedMessage) {
  if(argument.length == 0) {
  	receivedMessage.channel.send('I\'m not sure what you need help with ' + receivedMessage.author.toString() + '. Try `!help [topic]`');
  } else {
  	receivedMessage.channel.send('I\'ve contacted an admin regarding your needs for help with ' + argument + '.');
  }
}
//Default function
function defaultCommand(receivedMessage) {
  receivedMessage.channel.send('That\'s not a valid command ' + receivedMessage.author.toString());
}
//Login using our bots token
client.login(config.client.token);
