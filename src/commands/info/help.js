module.exports = {
  name: "help",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    message.reply(`Я пока умею только чекать рио персонажей на ревущем фьорде, для этого отправь '-rio Имя_персонажа'`)
  }
}