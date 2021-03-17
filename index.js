import { Telegraf } from 'telegraf';

const bot = new Telegraf("1637503600:AAE29ldALGVRAsUjGN3sTnbmS3A624ABMtM");
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears("hi", (ctx) => ctx.reply("Hello friends!"));
bot.on("message", (ctx) => ctx.reply(':/'));
	
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
