import {
  registerDecorator,
  ValidationArguments, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../features/users/infrastructure/users.repository";
import { CheckEmailStatusConstraint } from "./check-email-status.decorator";


@ValidatorConstraint({ name: "check-email-status", async: true })
@Injectable()
export class CheckCodeStatusConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  async validate(value: any, validationArguments?: ValidationArguments) {
    try {
      await this.usersRepository.checkCodeStatus(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "User already confirm";
  }

}

export function CheckCodeStatus(property?: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: "CheckCodeStatus",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: CheckEmailStatusConstraint
    });
  };
}

