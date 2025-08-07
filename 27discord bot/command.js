const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "Create a new short URL",
  },
  {
    name: "get",
    description: "get the short URL's website",
  },
  {
    name: "showinfo",
    description: "get the information of you are short URLs",
  },
  {
    name: "seeurls",
    description: "get the information of you are generated short URLs",
  },
  {
    name: "king",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "paste your Discord bot token here" // Replace with your bot token
);

(async () => {
  try {
    console.log("started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands("put your apllication client id here"), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
