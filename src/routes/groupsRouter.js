const router = require('express').Router(),
{ query, body } = require('express-validator'),
controller = require('./../controllers/groupsController')

router.get(
    '/all-groups',
    body('session').notEmpty(),
    controller.getChats
)

router.post(
    '/send',
    body('session').notEmpty(),
    body('receiver').notEmpty(),
    body('message').notEmpty(),
    controller.sendMessage
)

router.post(
    '/group-create',
    body('session').notEmpty(),
    body('name').notEmpty(),
    body('members').notEmpty(),
    controller.groupCreate
)

router.post(
    '/group-add-members',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('members').notEmpty(),
    controller.groupAddMember
)

router.post(
    '/group-make-admin',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('members').notEmpty(),
    controller.groupMakeAdmin
)

router.post(
    '/group-remove-admin',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('members').notEmpty(),
    controller.groupRemoveAdmin
)

router.post('/group-update-name',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('name').notEmpty(),
    controller.groupUpdateName
)

router.post('/group-setting-message',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('value').notEmpty(),
    controller.groupSettingMessage
)

router.post('/group-setting-change',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    body('value').notEmpty(),
    controller.groupSettingChange
)

router.post('/group-leave',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    controller.groupLeave
)

router.get('/group-invite-code',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    controller.groupInviteCode
)

router.get('/group-meta-data',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    controller.groupMetadata
)

router.post('/group-accept-invite',
    body('session').notEmpty(),
    body('code').notEmpty(),
    controller.groupAcceptInvite
)

router.post('/group-revoke-invite',
    body('session').notEmpty(),
    body('groupId').notEmpty(),
    controller.groupRevokeInvite
)

module.exports = router