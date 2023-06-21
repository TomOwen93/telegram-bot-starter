import { Context, Telegraf } from "telegraf";
import getBotTokenOrQuit from "./util/getBotToken";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const botToken = getBotTokenOrQuit();
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"));
bot.help((ctx) => ctx.reply("Hmm i am not programmed to be helpful, yet!"));

bot.command("dicey", handleDiceCommand);

function handleDiceCommand(ctx: Context) {
  return ctx.reply(new DiceRoll("4d8 + 1d6").total.toString());
}

// bot.command("dicey", (ctx) =>
//   ctx.reply(new DiceRoll("4d8 + 1d6").total.toString())
// );

bot.hears("hello", (ctx) => ctx.reply("Ok, I heard you say hello"));
bot.hears("cheese", (ctx) =>
  ctx.replyWithPhoto(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Emmentaler_Premier_Cru.jpg/1200px-Emmentaler_Premier_Cru.jpg"
  )
);

bot.hears("who", (ctx) =>
  ctx.reply(pick(["Dave", "Alice", "Bob", "Charlie"]).toUpperCase())
);

bot.command("sing", (ctx) => ctx.reply("La la la!  I got your command."));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

//write function pick() given array[] returns one element of it

function pick<T>(array: T[]): T {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
