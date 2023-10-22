import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginDto {
  @ApiProperty()
  @Field()
  username: string;

  @ApiProperty({ format: 'password' })
  @Field()
  password: string;
}

@ObjectType()
export class AccessTokenDto {
  @ApiProperty()
  @Field()
  access_token: string;

  @ApiProperty({ description: 'token expiration in seconds' })
  @Field({
    description: 'token expiration in seconds',
  })
  expires_in: number;

  @ApiProperty()
  @Field()
  token_type: string;
}
