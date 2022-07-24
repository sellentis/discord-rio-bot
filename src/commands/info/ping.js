module.exports = {
  name: "ping",
  category: "info",
  permissions: [],
  devOnly: true,
  run: async ({client, message, args}) => {
    message.reply("Pong")
  }
}