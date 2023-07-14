import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createCarsTable1683778286520
    implements MigrationInterface
{
    name = 'createCarsTable1683778286520';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'car_license_number',
                        isPrimary: true,
                        isUnique: true,
                        type: 'varchar(255)',
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
        await queryRunner.dropTable('cars');
    }
}
