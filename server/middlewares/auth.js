import { checkSessionKey } from "../auth/sessionModel"

export const verifySessionToken = (req, res, next) => {
    const { sessionKey } = req.headers
    const { userId } = req.body

    const check = checkSessionKey(userId, sessionKey)

    check ? next() : res.status(401).send({ msgg: "unauthorized" })
}
