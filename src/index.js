'use strict';

require('dotenv').config();
const Bot = require('./classes/Bot');
const { Intents, Options } = require('discord.js');

// Creating a new Bot Client instance
const Kiyo = new Bot({
    presence: {
        activity: {
            name: 'BEING DEVED',
            type: 'COMPETING',
        },
    },
    makeCache: Options.cacheWithLimits({
        MessageManager: 100
    }),
    allowedMentions: { parse: ['roles', 'users'] },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
    restRequestTimeout: 5000,
    restGlobalRateLimit: 40,
    large_threshold: 100
});

Kiyo.start(); // Running the bot
