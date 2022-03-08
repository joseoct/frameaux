import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRoleIdFieldToUsers1646778752903
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role_id');
  }
}
