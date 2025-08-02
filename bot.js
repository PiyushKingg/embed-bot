// bot.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const app = require('./server');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Debug line to check TOKEN loading
const token = process.env.TOKEN;
console.log("DEBUG TOKEN:", token ? "✅ Loaded" : "❌ Missing");

if (!token) {
  console.error("❌ No TOKEN provided.");
  process.exit(1);
}

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  app.listen(PORT, () => console.log(`🌐 Dashboard running on port ${PORT}`));
});

app.post('/send-embed', async (req, res) => {
  const { channelId, embeds } = req.body;
  try {
    const channel = await client.channels.fetch(channelId);
    await channel.send({ embeds });
    res.send('✅ Embeds sent!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to send embeds');
  }
});

client.login(token);
