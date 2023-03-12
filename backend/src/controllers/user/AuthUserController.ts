import { Request, Response } from "express";
import { AuthUserService } from '../../services/AuthUserService'


class AuthUserController {
    async handle(req: Request, resp: Response) {
        const { email, password } = req.body

        const authUserService = await new AuthUserService();

        const auth = await authUserService.execute({
            email,
            password
        })


        return resp.json(auth)
    }
}

export {AuthUserController}

