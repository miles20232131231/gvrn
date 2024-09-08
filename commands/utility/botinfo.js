const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');
const process = require('process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot.'),
    async execute(interaction) {
        // Fetch bot information
        const botName = interaction.client.user.username;
        const nodeVersion = process.version;
        const uptime = formatUptime(process.uptime());

        // Create the embed
        const botInfoEmbed = new EmbedBuilder()
            .setTitle('Bot Information')
            .addFields(
                { name: 'Bot Name', value: botName, inline: true },
                { name: 'Node Version', value: nodeVersion, inline: true },
                { name: 'Version', value: '1.1.1', inline: true },
                { name: 'Uptime', value: uptime, inline: true },
                { name: 'Developer', value: '<@1281995005334126598>', inline: true }
            )
            .setColor('#00FF00')
            .setThumbnail("https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096")
            .setColor('#f6f5f5')
            .setFooter({
                text: 'Greenville Roleplay Network',
                iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
            });

        // Send the embed
        await interaction.reply({ embeds: [botInfoEmbed] });
    },
};

// Function to format the bot's uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
