import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rental_registrations' })
export class RentalRegistrationEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'car_license_number', nullable: false })
  carLicenseNumber: string;

  @Column({ name: 'driver', nullable: false })
  driver: string;

  @Column({ name: 'total_distance', nullable: true })
  totalDistance: number;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'end_at', nullable: true })
  endAt: Date;
}
