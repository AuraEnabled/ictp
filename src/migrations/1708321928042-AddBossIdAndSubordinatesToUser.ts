import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBossIdAndSubordinatesToUser1708321928042 implements MigrationInterface {
    name = 'AddBossIdAndSubordinatesToUser1708321928042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bossId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d7c372b53e02ea4c21a45b1867d" FOREIGN KEY ("bossId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d7c372b53e02ea4c21a45b1867d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bossId"`);
    }

}
