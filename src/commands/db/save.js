const axios = require('axios').default;
const mongoose = require('mongoose')
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
require('dotenv').config()
const {User} = require("../../db/user")


module.exports = {
  name: "save",
  category: "db",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    await mongoose.connect(process.env.MONGO_URI, {}, async (error) => {
      
      if (error) {
        console.log(error)
        message.reply(`Случилась ошибка в БД, попробуй позже`)
      } else {
        const isUserExist = await User.findOne({discordId: message.author.id}).exec()
        if (isUserExist) {
          await User.updateOne({discordId: message.author.id}, {character: args[0]})
          message.reply(`Твой никнейм обновлен (${args[0]})! Далее ты можешь запрашивать рио по сокращенной команде: -rio`)
        }
        else {
          const user = new User({
            discordId: message.author.id,
            character: args[0]
          })
          user.save((error, user) => {
            if (error) {
              console.log(error)
              message.reply(`Случилась ошибка в БД, попробуй позже`)
            } else {
              message.reply(`Твой никнейм сохранен (${args[0]})! Далее ты можешь запрашивать рио по сокращенной команде: -rio`)
            }
          })
        }
      }
    })
  }
}