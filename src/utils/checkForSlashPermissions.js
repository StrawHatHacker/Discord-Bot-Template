'use strict';

const Permissions = require('../classes/Permissions');
const { Interaction } = require('discord.js');
const Err = require('../classes/Err');

/**
 * @param {Interaction} interaction 
 * @param {String} cmdName 
 * @param {Object} requiredPermissions
 * @param {String[]} requiredPermissions.user
 * @param {String[]} requiredPermissions.client
 * @returns {Boolean} true/false
 */
module.exports = (interaction, cmdName, requiredPermissions) => {
    try {
        if (!(interaction instanceof Interaction))
            throw new Err(400).inputErr().setMessage('Parameter `interaction` should be an instance of `Interaction`');
        if (typeof cmdName !== 'string')
            throw new Err(400).inputErr().setMessage('Parameter `cmdName` should be a type of `string`');
        if (!Array.isArray(requiredPermissions.user) || !Array.isArray(requiredPermissions.client))
            throw new Err(400).inputErr().setMessage('Parameter `requiredPermissions` is not correctly formatted');

        const userhasPermission = new Permissions(interaction.member.permissions)
            .filterKeyPerms()
            .userhasPermission(requiredPermissions.user);

        if (!userhasPermission) {
            interaction.reply({
                content: `You don't have permission to run the \`${cmdName}\` slash command in **${interaction.guild.name}**`,
                ephemeral: true
            });
            return false;
        }

        const clientHasPermissions = new Permissions(interaction.guild.me.permissions)
            .permsToArray()
            .clientHasPermission(requiredPermissions.client);

        if (!clientHasPermissions) {
            interaction.reply({
                content: `${interaction.guild.me.user.username} doesn't have permission to run the \`${cmdName}\` slash command in **${interaction.guild.name}**`,
                ephemeral: true
            });
            return false;
        }

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
};
