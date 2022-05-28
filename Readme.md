# Live Demo

- [Live Demo](#live-demo)
  - [Angular](#angular)
    - [Projekt erstellen](#projekt-erstellen)
      - [Erste Komponente](#erste-komponente)
        - [Hero property](#hero-property)
      - [Anzeigen der Komponente](#anzeigen-der-komponente)
      - [Erstellen eines Interfaces](#erstellen-eines-interfaces)
      - [Verwenden einer Pipe](#verwenden-einer-pipe)
    - [Forms / Module](#forms--module)
      - [Erstellen der Hero Form](#erstellen-der-hero-form)
      - [Module / Metadaten](#module--metadaten)
    - [Darstellen einer Liste](#darstellen-einer-liste)
      - [Structural Directive \*ngFor](#structural-directive-ngfor)
      - [Stylen der Heroes](#stylen-der-heroes)
      - [Klicken auf die Buttons für Details](#klicken-auf-die-buttons-für-details)
      - [Seperation of concerns (SOC)](#seperation-of-concerns-soc)
      - [Service für Daten](#service-für-daten)
      - [Asynchronität](#asynchronität)
  - [Nestjs](#nestjs)
    - [Einrichten des projekts](#einrichten-des-projekts)
    - [Erstellen einer Resource](#erstellen-einer-resource)
    - [Anlegen der hero entity und mock heroes](#anlegen-der-hero-entity-und-mock-heroes)
      - [SOC und DB](#soc-und-db)
    - [Anpassen Angular](#anpassen-angular)

## Angular

### Projekt erstellen

```
npm i -g @angular/cli
```

```
ng new --directory ./angular-app
```

```
cd angular-app
```

```
ng serve
```

App Title anpassen

```ts
title = "Heroes app";
```

#### Erste Komponente

```
ng generate component heroes
```

@Component vorstellen

##### Hero property

heroes.component.ts

```ts
hero = "Windstorm";
```

heroes.component.html

```html
<h2>{{hero}}</h2>
```

#### Anzeigen der Komponente

app.component.html

```html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

Schön machen

styles.scss

```scss
/* You can add global styles to this file, and also import other style files */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");

$fontColor: #fafafa;
$backgroundColor: #303030;

body {
  height: 100%;
  background-color: $backgroundColor;
  color: $fontColor;
  margin: 0;
  padding: 1rem 2rem;
  font-family: "Montserrat", sans-serif;
}

input {
  $inputColor: adjust-color(
    $color: $backgroundColor,
    $lightness: 10%,
  );
  background: $inputColor;
  border: 1px solid adjust-color($inputColor, $lightness: 10%);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: $fontColor;

  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: adjust-color($inputColor, $lightness: 30%);
  }
}
```

#### Erstellen eines Interfaces

app/hero.ts

```ts
export interface Hero {
  id: number;
  name: string;
}
```

heroes.component.ts

```ts
hero: Hero = {
  id: 1,
  name: "Windstorm",
};
```

```html
<h2>{{hero.name}} Details</h2>
<div><span>Id: </span>{{ hero.id }}</div>
<div><span>Name: </span>{{ hero.name }}</div>
```

#### Verwenden einer Pipe

Uppercase hero.name

hero.component.html

```html
<h2>{{hero.name | uppercase}} Details</h2>
```

### Forms / Module

#### Erstellen der Hero Form

Template driven form

hero.component.html

```html
<div>
  <label for="name">Hero name: </label>
  <input id="name" [(ngModel)]="hero.name" placeholder="name" />
</div>
```

Fehlendes Module "Forms Module" in App Module importieren

#### Module / Metadaten

Erklären: Angular muss wissen, wie die einzelnen Teile unsere Anwendungen zusammenpassen.
Dazu sind Module gedacht. Diese Informationen nennt man `metadata`
Sie stehen in den Decoratoren wie `@Component` oder `@NgModule`

Erklären Imports, Declarations, Providers, Bootstrap

Declarations: Components, Directives, Pipes
Provides: Services
Imports: Andere Module
Exports: Provider / Declarations
Bootstrap: Einstiegs Komponente der Anwendung

Declaration von Komponenten: Jede Komponente muss in genau EINEM Modul deklariert werden, kann von dort dann aber exportiert werden.

### Darstellen einer Liste

#### Structural Directive \*ngFor

Helden Mock
app/mock-heroes.ts

```ts
import { Hero } from "./hero";

export const HEROES: Hero[] = [
  { id: 12, name: "Dr. Nice" },
  { id: 13, name: "Bombasto" },
  { id: 14, name: "Celeritas" },
  { id: 15, name: "Magneta" },
  { id: 16, name: "RubberMan" },
  { id: 17, name: "Dynama" },
  { id: 18, name: "Dr. IQ" },
  { id: 19, name: "Magma" },
  { id: 20, name: "Tornado" },
];
```

heroes.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.scss"],
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;

  constructor() {}

  ngOnInit(): void {}
}
```

Anpassen Template:

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <button type="button">
      <span class="badge">{{hero.id}}</span>
      <span class="name">{{hero.name}}</span>
    </button>
  </li>
</ul>
```

Hinzufügen \*ngFor

```html
<li *ngFor="let hero of heroes"></li>
```

#### Stylen der Heroes

View Encapsulation erklären

heroes.component.scss

```scss
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;

  li {
    display: flex;
  }

  button {
    display: flex;
    flex: 1;
    border: none;
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #424242;
    color: #ddd;
    margin: 0.5em;
    padding: 0;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    height: 1.8em;

    transition: all 0.2s ease-in-out;

    &:hover {
      color: #eee;
      background-color: #393939;
      left: 0.1em;
    }

    &:active {
      background-color: #525252;
      color: #fafafa;
    }

    &.selected {
      background-color: #1e6667;
      color: white;

      &:hover {
        background-color: #505050;
        color: white;
      }

      &:active {
        background-color: black;
        color: white;
      }
    }
  }

  .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0 0.5rem;
    background-color: #34b2b5;
    margin-right: 0.8em;
    border-radius: 4px 0 0 4px;
    line-height: 1.5rem;
  }

  .name {
    align-self: center;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

#### Klicken auf die Buttons für Details

() -> Dinge die aus der Child Komponenten heraus kommen

heroes.component.html

```html
<button type="button" (click)="onSelect(hero)"></button>
```

Eventhandler hinzufügen

heroes.component.ts

```
selectedHero?: Hero;
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```

Zeigen Two Way Binding

heroes.component.html

```html
<h2>My Heroes</h2>
<div class="wrapper">
  <ul class="heroes">
    <li *ngFor="let hero of heroes">
      <button type="button" (click)="onSelect(hero)">
        <span class="badge">{{ hero.id }}</span>
        <span class="name">{{ hero.name }}</span>
      </button>
    </li>
  </ul>

  <div *ngIf="selectedHero !== undefined">
    <h2>{{ selectedHero.name | uppercase }} Details</h2>
    <div>Id: {{ selectedHero.id }}</div>
    <div>
      <label for="hero-name">Hero name: </label>
      <input
        id="hero-name"
        [(ngModel)]="selectedHero.name"
        placeholder="Name"
      />
    </div>
  </div>
</div>
```

CSS Binding:

heroes.component.html

```html
<button
  type="button"
  (click)="onSelect(hero)"
  [class.selected]="hero === selectedHero"
></button>
```

#### Seperation of concerns (SOC)

Auslagern der Details Komponente

```
ng generate component hero-detail
```

Ausschneiden der Details ansicht

hero-detail.component.ts

```ts
@Input() hero?: Hero;
```

heroes.component.html

```html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

#### Service für Daten

Komponenten sollten für das Darstellen von Daten verantwortlich sein, nicht Daten selber speichern oder fetchen.
Dafür sind Services verantwortlich. (Z.B. Gleiche Daten in mehreren Komponenten )

```
ng generate service hero
```

hero.service.ts

```ts
getHeroes(): Hero[] {
  return HEROES;
}
```

@Injectable Decorator erklären: Versorgt Angular mit Metadatan für Dependency Injection

Anpassen Heroes Komponente:

```ts
heroes: Hero[] = [];

selectedHero?: Hero;

constructor(private heroService: HeroService) {}

getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

#### Asynchronität

hero.service.ts

```ts
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
```

heroes.component.ts

```ts
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}
```

## Nestjs

### Einrichten des projekts

```
npm i -g @nestjs/cli
```

Erstellen des Projekts

```
nest new --directory ./nestjs-app
```

Kurze übersicht (Ähnlichkeit zu Angular zeigen)
Unterschied Controller, Component

```
nest start --watch
```

### Erstellen einer Resource

```
nest generate resource
```

Aufbau:
Controller -> Service
Module bündeln wie in Angular mehrere Controller / Services zusammen.

Wir wollen jetzt eine Route

```
GET /heroes
```

zur Verfügung stellen die uns die heroes zurückgibt

### Anlegen der hero entity und mock heroes

hero.entity.ts

```ts
export class Hero {
  id: number;
  name: string;
}
```

hero-mock.ts

```ts
import { Hero } from "./entities/hero.entity";

export const HEROES: Hero[] = [
  { id: 12, name: "Dr. Nice" },
  { id: 13, name: "Bombasto" },
  { id: 14, name: "Celeritas" },
  { id: 15, name: "Magneta" },
  { id: 16, name: "RubberMan" },
  { id: 17, name: "Dynama" },
  { id: 18, name: "Dr. IQ" },
  { id: 19, name: "Magma" },
  { id: 20, name: "Tornado" },
];
```

```ts
@Get()
getHeroes(): Hero[] {
  return this.heroes;
}
```

#### SOC und DB

Anpassen service

```ts
heroes: Hero[] = HEROES;

getHeroes(): Hero[] {
  return this.heroes;
}
```

```
docker run --detach --env MARIADB_DATABASE=heroes --name mariadb --env MARIADB_USER=hsbo --env MARIADB_PASSWORD=password123 --env MARIADB_ROOT_PASSWORD=password123 -p 3306:3306 mariadb:latest
```

Installation TypeORM

```
npm install --save @nestjs/typeorm typeorm@0.2 mysql2
```

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'hsbo',
  password: 'password123',
  database: 'heroes',
  autoLoadEntities: true,
  synchronize: true,
}),
```

Erstellen der Entität

```ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

Import des TypeOrmModule

```ts
imports: [TypeOrmModule.forFeature([Hero])],
```

Anpassen Service:

```ts
constructor(
  @InjectRepository(Hero)
  private readonly repo: Repository<Hero>
) {}

getHeroes(): Promise<Hero[]> {
  return this.repo.find();
}
```

Anpassen Controller:

```ts
@Get()
getHeroes(): Promise<Hero[]> {
  return this.heroesService.getHeroes();
}
```

Backup INSERT

```sql
INSERT INTO heroes.Heroes(name) VALUES ('Dr. Nice'), ('Bombasto'), ('Celeritas'), ('Magneta'), ('RubberMan'), ('Dynama'), ('Dr. IQ'), ('Magma'), ('Tornado');
```

### Anpassen Angular

```ts
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Anpassen Service

```ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "./hero";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`http://localhost:3000/heroes`);
  }
}
```

Cors Fehler:

main.ts

```ts
app.enableCors();
```
