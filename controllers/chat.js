'use strict'
import p from '../proxy'

const chatProxy = p.Chat

const getByChatId = (chatId) => {
  return chatProxy.getByChatId(chatId)
}

const getByUserId = (userId) => {
  return chatProxy.getByUserId(userId)
}

const newAndSave = (userId) => {
  return chatProxy.newAndSave(userId)
}

const addDialogue = (chatId, dialogue) => {
  return chatProxy.addDialogue(chatId, dialogue)
}

export default {
  getByChatId,
  getByUserId,
  newAndSave,
  addDialogue
}
