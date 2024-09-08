const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-message')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Startup msg'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1282058544337653792/1282334819484831775/GVRN_9.png?ex=66defadd&is=66dda95d&hm=87edd2dbe4143ef37aedac25afb18292bae01b6cb1a0e38be4faf7c19e1b1cfd&";

        const embed1 = new EmbedBuilder()
            .setTitle('GVRN | Server Startup')
            .setDescription("> Hello, Welcome to <#1282044765629583401>.We are excited to have you participate in our roleplay sessions. To ensure a smooth experience for everyone, please take note of the following guidelines:")
            .setThumbnail("https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096")
            .setColor('#f6f5f5');

        const embed2 = new EmbedBuilder()
            .setTitle('Startup Information')
            .setDescription(`Session Notifications: All session notifications will be posted in this channel. You will be alerted when a new session begins, so there is no need to request session times or re-invites. We aim to keep everyone informed promptly and efficiently.

Role Management: To avoid disrupting the flow of our sessions, please do not inquire about session times or ask for re-invites. Instead, use the Session Ping button to receive notifications about session starts. This role will ensure you are automatically pinged with updates. Repeated requests or disruptions may result in a mute to maintain the quality of our roleplay environment.

Respect and Conduct: We ask for your cooperation in maintaining a respectful atmosphere. Please refrain from spamming or engaging in off-topic discussions in this channel. Your adherence to these guidelines helps create a positive experience for all participants.`)
.setColor('#f6f5f5')
.setFooter({
    text: 'Greenville Roleplay Network',
    iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
});
        
        // Keep only the 'Session Ping' button
        const button1 = new ButtonBuilder()
            .setCustomId('toggle_ping')
            .setLabel('Session Ping')
            .setStyle(ButtonStyle.Primary);

        // Create the action row with only the 'Session Ping' button
        const row = new ActionRowBuilder()
            .addComponents(button1);

        await interaction.channel.send({ files: [image], embeds: [embed1, embed2], components: [row] });

        await interaction.editReply({ content: 'Startup message sent.' });
    },
};
