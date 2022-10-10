import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  wumpusCount!: number
  pitCount!: number
  goldCount!: number
  difficulty!: number

  getwumpusCount(): number {
    return this.wumpusCount;
  }

  getpitCount(): number {
    return this.pitCount;
  }
  getgoldCount(): number {
    return this.goldCount;
  }
 

  setwumpusCount(wumpusCount: number){
    this.wumpusCount = wumpusCount;
  }

  setpitCount(pitCount: number){
    this.pitCount = pitCount;
  }
  setgoldCount(goldCount: number){
    this.goldCount = goldCount;
  }


  constructor() { }
}
