'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'

const ChatModel = m.Chat

const getByChatId = (chatId) => {
  return ChatModel.findOne({ _id: chatId })
}

const getByUserId = (userId) => {
  return ChatModel.$where(`this.user_list.indexOf("${userId}") !== -1`).exec()
}

const newAndSave = (userId, dialog) => {
  const chat = new ChatModel()

  chat.user_list = [userId, '5a2f901c4d6e97242e65b650']
  chat.dialog_list = [dialog]

  return chat.save()
}

const addDialogue = (chatId, dialogue) => {
  ChatModel.update({ _id: chatId }, { $push: { dialog_list: dialogue } }, function (err) {
    console.log(err)
  })
}

export default {
  getByChatId,
  getByUserId,
  newAndSave,
  addDialogue
}
