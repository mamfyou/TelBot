import { Scenes, Telegraf, Markup, session } from 'telegraf';

// /greeter
const greeterScene = new Scenes.BaseScene('SCENARIO_TYPE_SCENE_ID');
greeterScene.enter((ctx) => {
    ctx.session.myData = {};
    ctx.reply('چطوری جون دل؟', Markup.inlineKeyboard([
        Markup.button.callback('حالم خوبه', 'greeter.fine'),
        Markup.button.callback('خوب نیستم', 'greeter.bad')
    ]).resize()
    );
});

greeterScene.hears("خداحافظ", (ctx) => {
    ctx.reply('خداخافظ 😢');
    greeterScene.leave();
});

//create bot
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([greeterScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('greeter', (ctx) => {
    ctx.scene.enter('SCENARIO_TYPE_SCENE_ID');
});

bot.start((ctx) => {
    ctx.reply('خوش آمدید!');
    ctx.reply("لطفا نام خود را وارد کنید:");
});

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('sticker',(ctx) => ctx.reply('👍'));

bot.action('greeter.bad', (ctx) => {
    console.log("greeter.bad");
    ctx.answerCbQuery();
    ctx.reply('😞 چه بد');
});

bot.action('greeter.fine', (ctx) => {
    console.log("greeter.good");
    ctx.answerCbQuery();
    ctx.reply('😃 چه خوب');
});

bot.hears("hi", (ctx) => ctx.reply("Hello friends!"));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));