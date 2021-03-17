import {Scenes, Telegraf, session} from 'telegraf';

const greeterScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');

greeterScene.enter((ctx) => {
    ctx.session.myData = {};
    ctx.reply('How are you?');
});

greeterScene.leave((ctx) => {
    ctx.reply('Thank you for your time!');
});

// What to do if user entered a raw message or picked some other option?
greeterScene.use((ctx) => ctx.replyWithMarkdown('Please *choose* either Fine! or Bad!'));

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([greeterScene]);
bot.use(session())
bot.use(stage.middleware())

bot.command('greeter', (ctx) => {
    console.log(ctx)
    ctx.scene.enter('SCENARIO_TYPE_SCENE_ID');
});

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
