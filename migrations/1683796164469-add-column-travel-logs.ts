import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addColumnTravelLogs1683796164469
    implements MigrationInterface
{
    name = 'addColumnTravelLogs1683796164469';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('travel_logs', [
            new TableColumn({
                name: 'address',
                type: 'varchar(255)',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('travel_logs', [
            new TableColumn({
                name: 'address',
                type: 'varchar(255)',
            }),
        ]);
    }
}
