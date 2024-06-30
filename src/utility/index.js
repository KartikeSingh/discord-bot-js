const { EmbedBuilder } = require("discord.js");
const { embedTitles, embedDescription } = require("./constants");

/**
 * 
 * @param {EmbedProps} param0 
 */
function createEmbed({ style, title, description, image, footer, color }) {
    const embed = new EmbedBuilder()

    if (title || description) embed.setDescription(
        [
            title ? `## ${embedTitles[style] ? `${embedTitles[style]} ` : ""}${title}` : null,
            description ? `\`\`\`${embedDescription.styles[style] || ""}\n${embedDescription.prefix[style] || ""}${description}\n\`\`\`` : null
        ]
            .filter(v => typeof v === "string")
            .join("\n")
    );

    if (footer) embed.setFooter(footer);

    try {
        if (color) embed.setColor(color);
    } catch { }

    if (image) embed.setImage(image)

    return embed;
}

/**
 * @typedef {Object} EmbedProps
 * @property {'error' | 'success' | 'info' | null} style
 * @property {string?} title
 * @property {string?} description
 * @property {string?} image
 * @property {string?} color
 * @property {Footer?} footer
 */

/**
 * @typedef {Object} Footer
 * @property {string} text
 * @property {string?} icon_url
 */

module.exports = {
    createEmbed,
}