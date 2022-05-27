import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Heroes' })
export class HeroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
