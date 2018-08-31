'use strict'

module.exports = {
  user: ['_id', 'name', 'nick_name', 'head_img'],
  chat: ['_id', 'user_list', 'dialog_list'],
  goods: ['_id', 'name', 'categories', 'title', 'tags', 'price', 'discount', 'stock', 'preview', 'images', 'detail', 'remark', 'create_at', 'update_at'],
  category: ['_id', 'name', 'data', 'create_at', 'update_at'],
  categoryItem: ['id', 'name', 'level', 'path', 'parent_id', 'attribute_ids', 'remark', 'create_at', 'update_at']
}
