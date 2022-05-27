import { Controller, Get } from '@nestjs/common';
import { Hero } from './hero.dto';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  getHeroes(): Promise<Hero[]> {
    return this.heroesService.getHeroes();
  }
}
