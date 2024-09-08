const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Peacetime On', value: 'On' },
                    { name: 'Peacetime Normal', value: 'Normal' },
                    { name: 'Peacetime Off', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '60', value: '60' },
                    { name: '70', value: '70' },
                    { name: '80 (should not be used frequently)', value: '80' }
                )
                .setRequired(true)),

    async execute(interaction) {
        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');

            const embed = new EmbedBuilder()
                .setTitle('GVRN | Session Release')
                .setDescription(`The session host has distributed the link to all participants. Click the button below to view and join the session. Should you encounter any issues or have questions, our support team is available to assist you promptly.

**__Session Information:__**

Session Host: <@${interaction.user.id}>
Peacetime Status: ${peacetimeStatus}
FRP Speeds: ${frpSpeed} MPH

Your participation is valued, and we wish you a smooth and enjoyable experience during the session.`)
.setImage("https://cdn.discordapp.com/attachments/1282058544337653792/1282066130068050142/GVRN_5.png?ex=66de00a1&is=66dcaf21&hm=469cee5bf64d2338ea2bacbcffbda0183500177896c3d80ee2a5f335ef8b3f43&")
.setColor('#f6f5f5')
.setFooter({
    text: 'Greenville Roleplay Network',
    iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
            });

            const button = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('ls');

            const row = new ActionRowBuilder()
                .addComponents(button);

            const newEmbed = new EmbedBuilder()
                .setTitle("Session Release")
                .setDescription(`<@${interaction.user.id}> has released their session. The information below is the session information.
                    **FRP:**${frpSpeed}
                    **Peacetime:**${peacetimeStatus}
                    **Link**: ${sessionLink}`)

            const logChannel = await interaction.client.channels.fetch('1282047076078846103');
            await logChannel.send({ embeds: [newEmbed] });

            await interaction.channel.send({ content: '2', embeds: [embed], components: [row] });

            await interaction.reply({ content: 'You have successfully released the session.', ephemeral: true });

            const filter = i => i.customId === 'ls';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.BUTTON, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate();

                    await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });

                    const logEmbed = new EmbedBuilder()
                        .setTitle(`Session Link Button`)
                        .setDescription(`Button clicked by <@${i.user.id}>.`)
                        .setColor('#ff0000')
.setFooter({
    text: 'Greenville Roleplay Network',
    iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
            });
        
                        
                    await logChannel.send({ embeds: [logEmbed] });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    },
};
