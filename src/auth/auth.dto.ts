import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpPayloadDTO {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInPayloadDTO {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

export class SessionDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
