import { Scenes, Telegraf, Markup, session } from 'telegraf';

/*  Keywords

const SCENE_NAME = new Scenes.BaseScene("SCENARIO_TYPE_SCENE_ID");
const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([SCENE_NAME], ...);

bot.use(session());
bot.use(stage.middleware());

bot.command("DESIRED_COMMAND...", (ctx) => ctx.scene.enter("SCENARIO_TYPE_SCENE_ID"));
SCENE_NAME.enter((ctx) => {DESIRED_ACTION...});
SCENE_NAME.hears(...);
....

bot.start((ctx) => {DESIRED_ACTION...});
bot.help((ctx) => {DESIRED_ACTION...});
bot.on("sticker", (ctx) => {DESIRED_ACTION...});
bot.hears("DESIRED_TEXT...", (ctx) => {DESIRED_ACTION...});
bot.launch();
....

ctx.reply("DESIRED_MESSAGE...", Markup.inlineKeyboard
    ([
        Markup.button.callback("DESIRED_TEXT1", "UNIQUE_KEY1"),
        Markup.button.callback("DESIRED_TEXT2", "UNIQUE_KEY2")
    ])
    .resize()
);
bot.action("UNIQUE_KEY1", (ctx) => {DESIRED_ACTION...};
....

*/

// KAF

const bot = new Telegraf(process.env.BOT_TOKEN);

const bookReadScene = new Scenes.BaseScene("BOOK_READ_SCENE");

const stage = new Scenes.Stage([bookReadScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    console.log("started!")
    ctx.reply("📚به بات کاف خوش آمدید", Markup.inlineKeyboard([
        Markup.button.callback("کتاب چی بخونم؟", "BOOK_READ_KEY"),
        Markup.button.callback("کتاب چی قرض بگیرم؟", "BOOK_BORROW_KEY"),
        Markup.button.callback("کتاب چی بخرم؟", "BOOK_BUY_KEY")
    ]).resize());
});

bot.action("BOOK_READ_KEY", (ctx) => ctx.scene.enter("BOOK_READ_SCENE"));

bookReadScene.action((ctx) => {
    ctx.reply ("داوش ژانر مورد علاقه ات رو بگو به مولا", Markup.keyboard([
        ["تاریخ و جغرافیا"], ["رمان"], ["فلسفه و منطق"],
        ["دین"], ["علوم طبیعی و ریاضیات"], ["هنرها"], ["علوم اجتماعی"]
        ]).oneTime().resize());
});

bot.launch().then();




// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));