import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TokenEntity } from "../domain/tokens.entity";
import { JwtService } from "@nestjs/jwt";
import { SETTINGS } from "../../../infrastructure/settings/settings";

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokenEntity.name) private userModel: Model<TokenEntity>,
    private readonly jwtService: JwtService
  ) {
  }

  createTokens(userId: string) {
    const [accessToken, refreshToken] = [
      this.jwtService.sign(
        {
          _id: userId
        },
        {
          // secret: SETTINGS.VARIABLES.JWT_SECRET_ACCESS_TOKEN,
          secret: process.env.JWT_SECRET_ACCESS,
          expiresIn: "15m"
        }
      ),
      this.jwtService.sign(
        {
          _id: userId
        },
        {
          // secret: SETTINGS.VARIABLES.JWT_SECRET_REFRESH_TOKEN,
          secret: process.env.JWT_SECRET_REFRESH,
          expiresIn: "30m"
        }
      )
    ];
    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token: string) {
    try {
      // console.log(SETTINGS.VARIABLES.JWT_SECRET_ACCESS_TOKEN);
      const userData = this.jwtService.verify(
        token,
        { secret: process.env.JWT_SECRET_ACCESS }
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(
        token,
        { secret: SETTINGS.VARIABLES.JWT_SECRET_REFRESH_TOKEN }
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  getToken(bearerToken: string) {
    const token = bearerToken.split(" ")[1];
    return token;
  }

}
