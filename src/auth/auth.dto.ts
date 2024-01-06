import { ApiProperty } from '@nestjs/swagger';

export class SignUpPayloadDTO {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}

export class SignInPayloadDTO {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}

export class SessionDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
