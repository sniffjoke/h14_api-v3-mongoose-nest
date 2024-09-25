import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import { TokensService } from "../../tokens/application/tokens.service";
import { User } from "../../users/domain/users.entity";

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

    async getMe(bearerHeader: string) {
        const token = this.tokensService.getToken(bearerHeader)
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
    
}
