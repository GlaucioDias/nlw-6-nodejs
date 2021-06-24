import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error("Email or Password incorrect");
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email or Password incorrect");
        }

        const token = sign(
            {
                email: user.email
            },
            '289fa443d34f30e35dec380473f95cb84c9b40c0', //sha-1
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );
        return token;
    }
}

export { AuthenticateUserService }