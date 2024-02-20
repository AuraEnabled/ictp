import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly newBossId: number;
}
