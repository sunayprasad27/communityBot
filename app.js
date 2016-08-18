// Add your requirements

var appId = process.env.MICROSOFT_APP_ID || "Missing your App Id";
var appPassword = process.env.MICROSOFT_APP_PASSWORD || "Missing your App Password";

var restify = require('restify'); 
var builder = 	require('botbuilder');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});



// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD }); 
var bot = 	new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
/*bot.dialog('/', function (session) {
    session.send("Hello, How may I help you?");
});*/

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^hi/i, [
    function (session) {
        builder.Prompts.text(session, "Welcome to Salesforce Community!! How may I help you?");
    },
    function (session, results) {
        session.send("Ok... %s", results.response);
    }
]);

/*intents.matches(/^version/i, function (session) {
    session.send('Bot version 1.2');
});*/

server.get('/', restify.serveStatic({
 directory: 'D:\PROJECTS\ChatBot\CommunityBot\communityBot',
 default: '/index.html'
}));


