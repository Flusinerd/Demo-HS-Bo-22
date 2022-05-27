import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.dto';
import { HeroEntity } from './hero.entity';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroesService {
  heroes: Hero[] = HEROES;

  constructor(
    @InjectRepository(HeroEntity)
    private readonly repo: Repository<HeroEntity>,
  ) {}

  getHeroes(): Promise<Hero[]> {
    return this.repo.find();
  }
}
