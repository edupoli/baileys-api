const router = require('express').Router(),
{ query, body } = require('express-validator'),
controller = require('./../controllers/chatsController')

router.get(
    '/all-chats',
    body('session').notEmpty(),
    controller.getChats
)

router.post(
    '/send-message',
    body('session').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    controller.sendMessage
)

module.exports = router