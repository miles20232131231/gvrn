const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot send a message in the channel.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message for the bot to send')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages), // Adjust permissions as needed

    async execute(interaction) {
        const message = interaction.options.getString('message');

        try {
            // Send the message to the same channel where the command was issued
            await interaction.channel.send(message);

            // Confirm the action to the user
            await interaction.reply({ content: 'Message sent successfully!', ephemeral: true });
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'There was an error sending the message.', ephemeral: true });
        }
    },
};
