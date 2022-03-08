import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class UserForeignKeyRole1646780179721
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserRole',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserRole');
  }
}
