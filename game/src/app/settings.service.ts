import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  boardFile!:string
  wumpusCount!: number
  pitCount!: number
  goldCount!: number
  difficulty!: number


  getBoard(): string {
    return this.boardFile;
  }
  getwumpusCount(): number {
    return this.wumpusCount;
  }

  getpitCount(): number {
    return this.pitCount;
  }
  getgoldCount(): number {
    return this.goldCount;
  }
 
  setBoard(boardFile: string) {
    this.boardFile = boardFile;
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
