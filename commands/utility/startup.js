const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;
        const now = new Date();

        const embed = new EmbedBuilder()
            .setTitle('GVRN | Session Startup')
            .setDescription(`<@${interaction.user.id}> is initiating a roleplay session. Please ensure you have reviewed the server information available in <#1282044200782663854>.

Before participating, make sure your vehicle is properly registered. To register your vehicle, use the /register command in <#1282044943770062918>.

This session will commence once this message receives ${reactions} or more reactions.`)
.setImage("https://cdn.discordapp.com/attachments/1282058544337653792/1282066129417801931/GVRN_3.png?ex=66de00a0&is=66dcaf20&hm=6acbc3170762453f101688337534ec8cb4c39d9e854f6939b1d0e2853ad8f73c&")
            .setColor('#f6f5f5')
            .setFooter({
                text: 'Greenville Roleplay Network',
                iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
            });

        const message = await interaction.channel.send({
            content: '2',
            embeds: [embed]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has initiated a roleplay session. The reactions have been set to ${reactions}.`)
            .setColor('#f6f5f5')
            .setFooter({
                text: 'Greenville Roleplay Network',
                iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
            });

        const targetChannel = await interaction.client.channels.fetch('1282047076078846103');
        await targetChannel.send({ embeds: [newEmbed] });

        const reactionFilter = (reaction, user) => reaction.emoji.name === '✅';
        const reactionCollector = message.createReactionCollector({ filter: reactionFilter, time: 86400000 });

        reactionCollector.on('collect', (reaction) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!');

                interaction.channel.send({ embeds: [settingUpEmbed] });
                reactionCollector.stop();
            }
        });

        reactionCollector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });

        await interaction.reply({ content: `You have initiated a session successfully.`, ephemeral: true });
    },
};
