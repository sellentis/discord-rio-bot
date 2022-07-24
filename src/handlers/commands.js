const { getFiles } = require("../utils/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
  const { client } = bot

  fs.readdirSync("./src/commands/").forEach((category) => {
    let commands = getFiles(`./src/commands/${category}`, ".js")

    commands.forEach((f) => {
      if (reload)
        delete require.cache[require.resolve(`../commands/${category}/${f}`)]
      const command = require(`../commands/${category}/${f}`)
      client.commands.set(command.name, command)
    })
  })
  console.log(`Loaded ${client.commands.size} commands`)
}