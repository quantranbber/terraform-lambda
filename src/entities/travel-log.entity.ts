import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'travel_logs' })
export class TravelLogEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'registration_id', nullable: false })
  registrationId: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'LineString',
    srid: 4326,
    name: 'location',
    nullable: true,
  })
  location: any;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;
}
