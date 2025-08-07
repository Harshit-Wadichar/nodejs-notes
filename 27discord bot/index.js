const { Client, GatewayIntentBits } = require("discord.js");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetResponse,
  handleSeeUrls,
} = require("./controllers/url");

const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");

connectToMongoDB(
  process.env.MONGODB ?? "mongodb://127.0.0.1:27017/short-url"
).then(() => {
  return console.log("Mongodb connected");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {

  if (message.author.bot) return; // Ignore bot messages

  if (message.content.startsWith("create")) {
    const inputURL = message.content.split("create")[1];
    const shortUrlInfo = await handleGenerateNewShortURL(
      inputURL,
      message.author.id
    );
    return message.reply({
      content:
        "generated short URL for" + inputURL + " is " + shortUrlInfo.shortID,
    });
  }

  if (message.content.startsWith("showInfo")) {
    const shortId = message.content.split("showInfo ")[1]?.trim();
    const result = await handleGetAnalytics(shortId);
    return message.reply({
      content: `total clicks on ${shortId} is ${result.totalClicks}/n
      and analytics are ${result.analytics.slice().map(a => new Date(a.timestamp).toLocaleString()).join('\n')}`,
    });
  }

  if (message.content.startsWith("get")) {
    const shortId = message.content.split("get ")[1]?.trim();
    const result = await handleGetResponse(shortId);
    return message.reply({
      content: `redirect url => ${result}`,
    });
  }

  if (message.content.startsWith("seeUrls")) {
    const result = await handleSeeUrls(message.author.id);
    return message.reply({
      content: `${result}`,
    });
  }

  message.reply({
    content: "hello ji",
  });
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  if (interaction.commandName === "king") {
    return interaction.reply("Pong!");
  }
});

client.login(
  "paste your Discord bot token here" // Replace with your bot token
);
