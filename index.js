import {Scenes, Telegraf} from 'telegraf';



const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('خوش آمدید!');
    ctx.reply("لطفا نام خود را وارد کنید:");
});

bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears("hi", (ctx) => ctx.reply("Hello friends!"));
bot.on("message", (ctx) => ctx.reply(':/'));


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
