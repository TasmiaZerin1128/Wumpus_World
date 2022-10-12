import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  boardFile:string = ""
  wumpusCount: number = 0
  pitCount: number = 0
  goldCount: number = 0
  difficulty: number = 0
  customBoard = false;

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

  setCustomBoardOn(){
    this.customBoard = true;
  }

  getCustomBoardOn(): boolean{
    return this.customBoard;
  }
 
  setBoard(boardFile: string) {
    this.boardFile = boardFile;
  }
  setwumpusCount(wumpusCount: number){
    console.log("Wumpus Count " + wumpusCount);
    this.wumpusCount = wumpusCount;
  }


  setpitCount(pitCount: number){
    this.pitCount = pitCount;
  }
  setgoldCount(goldCount: number){
    console.log("Gold count " + goldCount);
    this.goldCount = goldCount;
  }


  constructor() { }
}
