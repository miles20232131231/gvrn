const { Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');

// Ensure the 'transcripts' directory exists
const transcriptDir = './transcripts';
if (!fs.existsSync(transcriptDir)) {
    fs.mkdirSync(transcriptDir, { recursive: true });
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            // Server Information Interaction
            if (interaction.isStringSelectMenu() && interaction.customId === 'information_select') {
                await handleStringSelectMenu(interaction);
            }
        } catch (error) {
            console.error(`Error handling interaction: ${error}`);
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({ content: 'An error occurred while handling your request.', ephemeral: true });
                } catch (replyError) {
                    console.error(`Failed to send error reply: ${replyError}`);
                }
            }
        }
    },
};

async function handleStringSelectMenu(interaction) {
    let embedResponses = [];

    switch (interaction.values[0]) {
        case 'rp':
            const essEmbed = new EmbedBuilder()
                .setDescription(`Banned Vehicle Permissions
**Price:** 150 Robux
Gain access to exclusive banned vehicles for your roleplaying needs.

Early Access (EA)
**Price:** 100 Robux
Get early access to new features, updates, and content before anyone else.

Ultra Banned Vehicle Permissions
**Price:** 200 Robux
Obtain access to an even more exclusive list of banned vehicles.

Paid Partners
**Price:** 300 Robux
Enjoy benefits and perks as a recognized paid partner within the community.

Image Permissons
**Price:** 50 robux
Enjoy being able to send images and GIFs in any channel you want.

Sponsored Giveaway
**Price:** 400 Robux
Get your giveaway in our server.`)
                .setColor(0xf3eeee);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [essEmbed],
                    ephemeral: true
                });
            }
            break;

        case 'np':
            const sguildEmbed = new EmbedBuilder()
                .setDescription(`**1-3 Booster Perks**
                    <@&1282213055312166914>
                    <@&1282043753649143991>
                    <@&1282222169094619146>
                    <@&1282212912198451281>
                    25K eco per week
                    New Vehicle Registration Limit: 6
                    
                    **4+ Booster Perks**
                    <@&1282213238339010560>
                    100K per week
                    New Vehicle Registration Limit: 10`)
                .setColor(0xf3eeee);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [sguildEmbed],
                    ephemeral: true
                });
            }
            break;
    }
}
