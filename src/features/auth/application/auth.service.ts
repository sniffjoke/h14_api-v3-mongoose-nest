import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../domain/users.entity";
import { TokensService } from "../../tokens/application/tokens.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly tokensService: TokensService
    ) {
    }

    async login(loginOrEmail: string) {
        const findedUser = await this.userModel.findOne({login: loginOrEmail});
        if (!findedUser) {
            throw new NotFoundException('User not found');
        }
        const {accessToken, refreshToken} = this.tokensService.createTokens(findedUser._id.toString());
        return {
            accessToken,
            refreshToken,
        }
    }

    async getMe(bearerToken: string) {
        const token = this.tokensService.getToken(bearerToken)
        const validateToken = this.tokensService.validateAccessToken(token)
        if (!validateToken) {
            throw new UnauthorizedException('Invalid access token');
        }
        const findedUser = await this.userModel.findById(validateToken._id.toString());
        if (!findedUser) {
            throw new UnauthorizedException('User not exists');
        }
        return {
            email: findedUser.email,
            login: findedUser.login,
            userId: findedUser._id,
        }
    }

    async

}
