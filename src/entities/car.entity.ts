import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cars' })
export class CarEntity {
  @PrimaryColumn({ name: 'car_license_number' })
  carLicenseNumber: string;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;
}
