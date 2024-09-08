const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('early')
        .setDescription('Sends the early access embed.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that EA people can join.')
                .setRequired(true)),
    async execute(interaction) {
        const sessionLink = interaction.options.getString('session-link');

        const embed = new EmbedBuilder()
            .setTitle('GVRN | Early Access')
            .setDescription('Early Access is now Live! Nitro Boosters, members of the Emergency Services, and Content Creators can join the session by clicking the button below.\n\nPlease keep in mind that sharing the session link with anyone is strictly forbidden and may lead to penalties. We appreciate your cooperation in keeping our community secure and fair for everyone.')
            .setColor('#f6f5f5')
            .setImage("https://cdn.discordapp.com/attachments/1282058544337653792/1282066129732239372/GVRN_4.png?ex=66de00a0&is=66dcaf20&hm=16907238825a09727e1067944bb4a0e3b71e4550599d5df64bf3b2a3766e8f9b&")
            .setFooter({
                text: 'Greenville Roleplay Network',
                iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
                        });

        const button = new ButtonBuilder()
            .setLabel('Early Access')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('ea');

        const row = new ActionRowBuilder()
            .addComponents(button);

            const newEmbed = new EmbedBuilder()
            .setTitle("Session Early Access")
            .setDescription(`<@${interaction.user.id}> released early access. The link is provided below
                **Link**
                ${sessionLink}`)

        const targetChannel = await interaction.client.channels.fetch('1282047076078846103');
        await targetChannel.send({ embeds: [newEmbed] });


        await interaction.channel.send({ 
            content: '<@&1282212912198451281>, <@&1282040502316695684>, <@&1282296992990761022>', 
            embeds: [embed], 
            components: [row] 
        });

        await interaction.reply({ content: 'Early Access Sent.', ephemeral: true });

        const filter = i => i.customId === 'ea';
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

        collector.on('collect', async i => {
            const logChannel = interaction.guild.channels.cache.get('1282047076078846103');
            if (logChannel) {
                await logChannel.send(`Interaction collected from ${i.user.tag} at ${new Date().toISOString()}`);
            }

            if (i.member.roles.cache.has('1282040858144936146') || i.member.roles.cache.has('1282212912198451281') || i.member.roles.cache.has('1282040502316695684') || i.member.roles.cache.has('1282296992990761022')) {
                await i.reply({ content: `**Link:** ${sessionLink}`, ephemeral: true });
            } else {
                await i.reply({ 
                    content: 'You do not have permission to use this button.',   
                    ephemeral: true 
                });
            }
        });

        collector.on('end', async collected => {
            const logChannel = interaction.guild.channels.cache.get('1282047076078846103');
            if (logChannel) {
                await logChannel.send(`Collected ${collected.size} interactions.`);
            }
        });

        collector.on('error', async error => {
            const logChannel = interaction.guild.channels.cache.get('1282047076078846103');
            if (logChannel) {
                await logChannel.send(`Collector encountered an error: ${error}`);
            }
            console.error('Collector encountered an error:', error);
        });
    },
};
