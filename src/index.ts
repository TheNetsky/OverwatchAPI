import express from 'express'
import * as config from '../config.json'
import { validateUserTag } from './functions/Data'
import { playerData } from './functions/Parser'


const app = express()

app.get('/ow', async (req, res) => {
    if (req.query.user) {
        const tag = validateUserTag(req.query.user as string)
        if (!tag) return res.status(401).json({ error: 'Invalid BattleNet format!, should be Example-0000' }).end()

        const data: any = await playerData(tag)
        if (data.errorCode) {
            return res.status(data.errorCode).json({ message: data.message })
        }

        return res.status(200).json(data)
    }
    return res.status(200).json({ error: 'Overwatch API! Add the user param with BattleNet tag!' }).end()
})

app.use(express.static(__dirname + '/pages'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
})

app.listen(config.port, () => {
    console.log(`Server ready and listening to port ${config.port} | http://localhost:${config.port}`)
})