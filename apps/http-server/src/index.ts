import express, { Request, Response } from "express"
import {client} from "@repo/db/client"
const app = express();
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
    res.send("hello");
})
app.post('/signup', async (req: Request, res: Response) : Promise<any> => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await client.user.create({
            data : {
                username,
                password
            }
        })
        return res.json({
            "message" : "Signup successful",
            "user" : user,
        })
    } catch (error : any) {
        return res.status(500).json({
            "error" : "Internal server error"
        })
        
    }
})

app.listen(3002);