import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addColumnRentalRegistrations1684120588345
    implements MigrationInterface
{
    name = 'addColumnRentalRegistrations1684120588345';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('rental_registrations', [
            new TableColumn({
                name: 'total_distance',
                type: 'float',
                isNullable: true,
                default: 0
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('rental_registrations', [
            new TableColumn({
                name: 'total_distance',
                type: 'float',
            }),
        ]);
    }
}
