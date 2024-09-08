const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-shop')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Server shop embed.'),
    async execute(interaction) {
        const image = "https://cdn.discordapp.com/attachments/1282058544337653792/1282217332332036177/GVRN_8.png?ex=66de8d72&is=66dd3bf2&hm=4ac054c0947f5ebae2b02bf47d5584cd1cc6d5d760817fc5afff60806013504c&";

        const embed1 = new EmbedBuilder()
            .setTitle('Shop Inforation')
            .setDescription(`Explore the amazing perks and features available to our community! For detailed information on all perks and prices, please refer to the designated channels. Some perks may require you to create a ticket or reach out to specific staff members before finalizing your purchase.

Please note that prices and perks are subject to change with advance notice. We are constantly working to enhance your experience with new features and updates. Be sure to check out our exclusive boosting perks in the available options below.

Thank you for being a part of GVRN, and enjoy all that we have to offer!`)
            .setColor(`#f3eeee`);
            
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('information_select')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Robux Perks')
                    .setDescription('The perks you can get from robux')
                    .setValue('rp'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nitro Perks')
                    .setDescription('Perks you can get for nitro.')
                    .setValue('np'),
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        async function sendEmbedMessages() {
            await interaction.channel.send({ embeds: [embed1], components: [row], files: [image] });
        }

        try {
            await sendEmbedMessages();
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
