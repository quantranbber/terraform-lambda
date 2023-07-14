import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class addColumnRentalRegistrations1683772509050
    implements MigrationInterface
{
    name = 'addColumnRentalRegistrations1683772509050';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('rental_registrations', [
            new TableColumn({
                name: 'end_at',
                type: 'timestamp',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('rental_registrations', [
            new TableColumn({
                name: 'end_at',
                type: 'timestamp',
            }),
        ]);
    }
}
