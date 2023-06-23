import { Context, Telegraf } from "telegraf";
import getBotTokenOrQuit from "./util/getBotToken";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { keyboard } from "telegraf/typings/markup";
import Telegram from "telegraf/typings/telegram";

const quotes = require("./quotes.json");
const botToken = getBotTokenOrQuit();
const bot = new Telegraf(botToken);

const characters = ["Nicholas Angel", "Danny Butterman"];

let characterContext = "";

bot.command("quotes", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Hello!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Nicholas Angel", callback_data: "Nicholas Angel" }],
      ],
    },
  });
});

bot.help((ctx) => ctx.reply("Hmm i am not programmed to be helpful, yet!"));
bot.command("dice2", (ctx) => {
  let msg = ctx.message.text;
  const [_junk, ...args] = msg.split(" ");
  return ctx.reply(new DiceRoll(args.join(" ")).total.toString());
});

bot.hears("cheese", (ctx) =>
  ctx.replyWithPhoto(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Emmentaler_Premier_Cru.jpg/1200px-Emmentaler_Premier_Cru.jpg"
  )
);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
