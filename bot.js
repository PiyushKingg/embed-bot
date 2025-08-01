require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const app = require('./server');

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// When bot is ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  // Dashboard will serve on port 3000
  app.listen(3000, () => console.log('🌐 Dashboard running on port 3000'));
});

// Endpoint to receive embed data and post to Discord
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

client.login(process.env.TOKEN);
