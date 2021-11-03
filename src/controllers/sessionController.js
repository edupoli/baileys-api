const fs = require('fs'),
    path = require('path'),
    {response} = require('../response'),
    {validationResult} = require('express-validator'),
    whatsapp = require('../whatsapp')

const createSession = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return response(res, 400, {success: false, message: 'Please fill out all required inputs.'})

    const session = req.body.session;

    if (whatsapp.checkSession(session)) return response(res, 422, {
        success: false,
        message: 'Session already exists.'
    })

    whatsapp.createSession(session)
    //.then((success) => response(res, 200, {
    //        success: true,
    //        message: "Creating session...waiting QRCode validation."
    //    }
    //))
    //.catch(err => {
    //    response(res, 422, {
    //        success: false,
    //        message: 'Error creating session.',
    //        error: err,
    //    })
    //})

    response(res, 200, {
            success: true,
            message: "Creating session...waiting QRCode validation."
        }
    )
}

const destroySession = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return response(res, 400, {success: false, message: 'Please fill out all required inputs.'})

    const session = req.body.session;

    if (!whatsapp.checkSession(session)) {
        return response(res, 400, {
                error: 'Session not exists.'
            }
        )
    }

    whatsapp.deleteSession(session)

    response(res, 200, {success: true, message: "Session destroyed."})

}

const getActiveSessions = (req, res) => {

    response(res, 200, {
        success: true,
        data: whatsapp.getActiveSessions()
    })

}

const getQRCode = (req, res) => {

    if (!fs.existsSync(path.join(__dirname, '../data', `session_qrcode.json`))) {
        response(res, 404, {error: true, message: "QRCode session not found."})
        return
    }

    const fileBuffer = fs.readFileSync(path.join(__dirname, '../data', `session_qrcode.json`))

    response(res, 200, {success: true, qrcode: JSON.parse(fileBuffer)})

}

module.exports = {
    createSession: createSession,
    getActiveSessions: getActiveSessions,
    destroySession: destroySession,
    getQRCode: getQRCode
}