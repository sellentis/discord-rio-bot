const axios = require('axios').default;
const mongoose = require('mongoose')
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
require('dotenv').config()
const { User } = require("../../db/user")

module.exports = {
  name: "rio",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    await mongoose.connect(process.env.MONGO_URI, {}, async (error) => {
      const user = await User.findOne({ discordId: message.author.id })
      if (!user && !args[0]) {
        message.reply("Сохраните никнейм своего персонажа для использования этой команды без аргумента")
        return
      }
      axios.get('https://raider.io/api/v1/characters/profile', {
        params: {
          region: `eu`,
          realm: `howling-fjord`,
          name: args[0] || user.character,
          fields: 'mythic_plus_scores'
        }
      })
        .then(function (response) {
          const rio = response.data.mythic_plus_scores.all
          const race = response.data.race
          const characterClass = response.data.class
          const activeSpecName = response.data.active_spec_name
          // console.log(response.data)
          if (rio > 0) {
            message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle(args[0] || user.character)
                  .setURL(response.data.profile_url)
                  .setDescription(`${race} ${activeSpecName} ${characterClass} \n
                               Текущее рио: ${rio}`)
                  .setColor("BLUE")
                  .setThumbnail(response.data.thumbnail_url)
              ],
              // components: [
              //   new MessageActionRow().addComponents([
              //     new MessageButton().setCustomId("role-").setStyle("PRIMARY").setLabel("click")
              //   ])
              // ]
            })
          } else {
            message.reply(`Такое чувство, что твоя подписка не оплачена в этом сезоне [${args[0] || user.character}]`)
          }
        })
        .catch(function (error) {
          messageText = error.response?.data.message
          message.reply(messageText)
          console.log(messageText);
        })
        .then(function () {
          // always executed
        });
    })

  }
}