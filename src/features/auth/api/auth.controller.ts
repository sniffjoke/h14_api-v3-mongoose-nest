import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { Request, Response } from "express";
import { UserCreateModel } from "../../users/api/models/input/create-user.input.model";
import { UsersService } from "../../users/application/users.service";
import { UsersQueryRepository } from "../../users/infrastructure/users.query-repository";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersQueryRepository: UsersQueryRepository
  ) {
  }

  @Get("me")
  async getMe(@Req() req: Request) {
    const userData = await this.authService.getMe(req.headers.authorization as string);
    return userData;
  }

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() loginDto: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto.loginOrEmail);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return {
      accessToken
    };
  }

  @Post("registration")
  @HttpCode(204)
  async register(@Body() dto: UserCreateModel) {
    const userId = await this.usersService.createUser(dto, false)
    const newUser = await this.usersQueryRepository.userOutput(userId)
    return newUser
  }

  @Post("registration-confirmation")
  async activateEmail(@Body() code: string) {
  }

  @Post("registration-email-resending")
  async resendEmail(@Body() email: string) {

  }

  @Post("password-recovery")
  async passwordRecovery(@Body() email: string) {
  }

  @Post("new-password")
  async newPasswordApprove(@Body() newPassword: string, @Body() recoveryCode: string) {
  }

}
