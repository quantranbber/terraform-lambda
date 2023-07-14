import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createTravelLogsTable1683268599883
  implements MigrationInterface
{
  name = 'createTravelLogsTable1683268599883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'travel_logs',
          columns: [
            {
              name: 'id',
              isPrimary: true,
              isUnique: true,
              type: 'serial4',
            },
            {
              name: 'registration_id',
              type: 'int4',
              isNullable: false,
            },
            {
              name: 'location',
              type: 'geometry(point, 4326)',
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
    await queryRunner.dropTable('travel_logs');
  }
}
