import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        
        // verify email post
        if(!email) {
            throw new Error("Email incorrect")
        }


        // Verify if email exists

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        return user
    }

    
}