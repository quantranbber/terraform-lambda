import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRentalRegistrationsTable1683268516123
  implements MigrationInterface
{
  name = 'createRentalRegistrationsTable1683268516123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rental_registrations',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isUnique: true,
            type: 'serial4',
          },
          {
            name: 'car_license_number',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'driver',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rental_registrations');
  }
}
