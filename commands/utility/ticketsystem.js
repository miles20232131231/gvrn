const { Permissions, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket22')
        .setDescription('Create a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {

        await interaction.reply({ content: 'Setting up ticket system...', ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1282058544337653792/1282338567976259624/GVRN_10.png?ex=66defe5b&is=66ddacdb&hm=7355e30411e5fe1bc185398d00d9e9f82295288a2ee48d4d380803a7bc483122&";

        const embed = new EmbedBuilder()
            .setTitle('GVRN | Server Support')
            .setDescription(`Select the appropriate option from the dropdown menu to open your ticket, and be patient as our support team might be occupied. Submitting troll tickets will lead to a violation. After opening a ticket, you will receive further instructions.

                **__Before you open a ticket__**
                Please note opening troll tickets would result in a server mute and strike.
                Opening a ticket to ask for server assets would result in a warning and instant decline.`)
                .setColor('#f6f5f5')
                .setFooter({
                    text: 'Greenville Roleplay Network',
                    iconURL: 'https://cdn.discordapp.com/icons/1282030074400477380/3a2789f1b7b8b2eae297359bb8b6ff16.png?size=4096'
                });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Staff Report',
                    description: 'Report a staff member.',
                    value: 'staff_report',
                },
                {
                    label: 'Civilian Report',
                    description: 'Report a civilian.',
                    value: 'civ_report',
                },
                {
                    label: 'General Support',
                    description: 'Get general support.',
                    value: 'general_support',
                },
            ]);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.channel.send({ embeds: [embed], components: [row], files: [image] });

        await interaction.editReply({ content: 'Ticket system setup complete!', ephemeral: true });
    },
};
