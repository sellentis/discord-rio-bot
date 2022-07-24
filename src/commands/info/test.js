module.exports = {
  name: "test",
  category: "info",
  permissions: [],
  devOnly: true,
  run: async ({client, message, args}) => {
    message.reply("Bot is running!")
  }
}