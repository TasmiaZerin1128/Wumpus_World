import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SettingsService } from '../settings.service';
// Imports
import { FormGroup, FormControl,
          } from '@angular/forms';
 
import { SettingsComponent } from '../settings/settings.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private settings:SettingsService) { }
  wumpusCount = 0;
  pitCount = 0;
  goldCount = 0;
  point = 0;
  UP = 0;
  DOWN = 1;
  LEFT = 2;
  RIGHT = 3;
  shootDirection !: number;
  moveDirection !: number;

  gridSize = 10;

  gameOver = false;
  youWin = false;
  youLose = false;

  gameOverLine= "";

  cheatOn = false;
  /*
    Cell types:
    =============
    - safe
    - stench
    - breeze
    - agentsafe
    - agentstinky
    - agentbreeze
    - wumpus (blurred)
    - pit (blurred)
    - gold (blurred)
    - agentwumpus
    - agentpit
    - agentgold
*/

 cellVisited = [
  [true,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
 ];

 nearDanger = [
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
 ];

board = [
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S']
]

cboard = [
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S']
]

knowledge = [
  ['S', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U']
]

pitProbability = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
]

stenchProbability = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
]
threshold = 0.5;
contiguousRandomMoveCount = 0;
discoveredGold = 0;
wumpusKilled = 0;
totalMoves = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]

  agentIndex = {
    row: 0,
    column: 0,
  }
  busy: boolean = false;

  audio = new Audio();
  wumpusAudio = new Audio();
  goldAudio = new Audio();
  monsterEndAudio = new Audio();
  pitEndAudio = new Audio();
  winAudio = new Audio();
  difficulty = '';
  ngOnInit(): void {
    if(!this.settings.getCustomBoardOn()){
      console.log("Custom " + this.settings.getCustomBoardOn());
      this.wumpusCount=this.settings.getwumpusCount();
      this.pitCount=this.settings.getpitCount();
      this.goldCount=this.settings.getgoldCount();
      this.difficulty = this.settings.getDifficulty();
      console.log(this.difficulty)
      if(this.difficulty == 'Easy'){
        this.threshold = 0.25;
      }
      console.log('threshold: ', this.threshold)
      this.init();
    }
    else{
      this.fileInit();
    }

    console.log("ng on init er por +"+ this.wumpusCount)
   // this.wumpusCount=this.settings.getwumpusCount();

    
    this.cellVisited[0][0] = true;
    this.audio.src = "../../assets/audio/bgMusic.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.volume = 0.1;
  
    var mv: number = -1;
    const timeout = setTimeout(()=>{
      mv = this.move();
      if(mv == this.UP){
        this.agentIndex.column++;
        this.point--;
      }
      else if(mv == this.DOWN){
        this.agentIndex.column--;
        this.point--;
      }
      else if(mv == this.LEFT){
        this.agentIndex.row--;
        this.point--;
      }
      else if(mv == this.RIGHT){
        this.agentIndex.row++;
        this.point--;
      }
    }, 500); 
    const interval = setInterval(() => {
      //// console.log(mv);
      mv = this.move();
      //hello
      if(mv == -2){
        this.agentIndex.column=0;
        this.agentIndex.row=0;
      }
      if(mv == this.UP){
        this.agentIndex.column++;
        this.point--;
      }
      else if(mv == this.DOWN){
        this.agentIndex.column--;
        this.point--;
      }
      else if(mv == this.LEFT){
        this.agentIndex.row--;
        this.point--
      }
      else if(mv == this.RIGHT){
        this.agentIndex.row++;
        this.point--
      }
    }, 200)
    
  }



  counter(i: number) {
    return new Array(i);
  }

  cheatCounter(i: number){
    return new Array(i);
  }
  
  move(){
    this.calculateBreezeAndStench();
    if(this.gameOver || this.busy){
      return -1;
    }
    //// console.log(this.discoveredGold);
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('G')){
      
      this.goldAudio.src = "../../assets/audio/goldFound.wav";
      this.goldAudio.load();
      this.goldAudio.play();

      this.busy = true;
      this.discoveredGold+=1;
      this.point+=1000;
      setTimeout(() => {
        this.board[this.agentIndex.row][this.agentIndex.column]=this.board[this.agentIndex.row][this.agentIndex.column].replace('G','');
        
        this.busy= false;
        console.log('gold: ', this.discoveredGold)
      }, 1000);
        
        
        
      if(this.discoveredGold == this.goldCount){
        console.log("Discovered gold "+this.discoveredGold)
        console.log("total gold "+this.goldCount)

        this.gameOver = true;
        this.gameOverLine = "Congrats! You Win";
        this.youWin = true;
        this.winAudio.src = "../../assets/audio/win.mp3";
        this.winAudio.load();
        this.winAudio.play();
        return -1;
      }
    }
    else if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W' || this.board[this.agentIndex.row][this.agentIndex.column] == 'P'){
      this.point -= 10000;
      this.gameOver = true;
      this.youLose = true;
      this.gameOverLine = "Game Over! You Lose";
      if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W'){
        this.monsterEndAudio.src = "../../assets/audio/monster.wav";
        this.monsterEndAudio.load();
        this.monsterEndAudio.play();
      }
      else{
        this.pitEndAudio.src = "../../assets/audio/pit.wav";
        this.pitEndAudio.load();
        this.pitEndAudio.play();
      }
      return -1;
    }

    //we are close to wumpus
    else if(this.wumpusCount > this.wumpusKilled && this.isWumpusClose()){
      console.log('shoot');
      this.wumpusKilled += 1;
      if(this.shootDirection == this.UP){
        this.board[this.agentIndex.row][this.agentIndex.column+1] = this.board[this.agentIndex.row][this.agentIndex.column+1].replace('W', '');
        if(this.board[this.agentIndex.row][this.agentIndex.column+1] == ''){
          this.board[this.agentIndex.row][this.agentIndex.column+1] = 'S'
        }
        this.removeStench(this.agentIndex.row, this.agentIndex.column+1);
      }else if(this.shootDirection == this.DOWN){
        this.board[this.agentIndex.row][this.agentIndex.column-1] = this.board[this.agentIndex.row][this.agentIndex.column-1].replace('W', '');
        if(this.board[this.agentIndex.row][this.agentIndex.column-1] == ''){
          this.board[this.agentIndex.row][this.agentIndex.column-1] = 'S'
        }
        this.removeStench(this.agentIndex.row, this.agentIndex.column-1);
      }else if(this.shootDirection == this.LEFT){
        this.board[this.agentIndex.row-1][this.agentIndex.column] = this.board[this.agentIndex.row-1][this.agentIndex.column].replace('W', '');
        if(this.board[this.agentIndex.row-1][this.agentIndex.column] == ''){
          this.board[this.agentIndex.row-1][this.agentIndex.column] = 'S'
        }
        this.removeStench(this.agentIndex.row-1, this.agentIndex.column);
      }else if(this.shootDirection == this.RIGHT){
        this.board[this.agentIndex.row+1][this.agentIndex.column] = this.board[this.agentIndex.row+1][this.agentIndex.column].replace('W', '');
        if(this.board[this.agentIndex.row+1][this.agentIndex.column] == ''){
          this.board[this.agentIndex.row+1][this.agentIndex.column] = 'S'
        }
        this.removeStench(this.agentIndex.row+1, this.agentIndex.column);
      }
      
      this.wumpusAudio.src = "../../assets/audio/wumpusKill.wav";
      this.wumpusAudio.load();
      this.wumpusAudio.play();

      
      return -1;
    }
    
    else if(this.areWeInPitLoop()){
       console.log("pit loop");
      if (this.agentIndex.row != 9 && this.pitProbability[this.agentIndex.row + 1][this.agentIndex.column] < this.threshold) {
        this.contiguousRandomMoveCount = 0;
        return this.RIGHT;
      } else if (this.agentIndex.column != 9 && this.pitProbability[this.agentIndex.row][this.agentIndex.column+1] < this.threshold) {
        this.contiguousRandomMoveCount = 0;
        return this.UP;
      } else if (this.agentIndex.row != 0 && this.pitProbability[this.agentIndex.row - 1][this.agentIndex.column] < this.threshold) {
        this.contiguousRandomMoveCount = 0;
        return this.LEFT;
      } else  {
        this.contiguousRandomMoveCount = 0;
        return this.DOWN;
      }
    }
    else if (this.isItDangerCell()) {
      console.log("danger space");
      // if left is safe, move there
      if (this.agentIndex.row != 0 && this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column]) {
          this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
          return this.LEFT;
      }
      // if down is safe, move there
      else if (this.agentIndex.column != 0 && this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1]) {
          this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
          return this.DOWN;
      }
      // if right is safe, move there
      else if (this.agentIndex.row != 9 && this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column]) {
        this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
        return this.RIGHT;
      }
      // if up is safe, move there
      else if (this.agentIndex.column != 9 && this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1]) {
        this.totalMoves[this.agentIndex.row][this.agentIndex.column + 1]++;
        return this.UP;
      }
    }
    else if (!this.isItDangerCell()) {
      console.log("free space");
      // if right is not visited, move there
      if (this.agentIndex.row != 9 && !this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column]) {
          this.cellVisited[this.agentIndex.row + 1][this.agentIndex.column] = true;
          this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
          return this.RIGHT;
      }
      // if up is not visited, move there
      else if (this.agentIndex.column != 9 && !this.cellVisited[this.agentIndex.row][this.agentIndex.column + 1]) {
        this.cellVisited[this.agentIndex.row][this.agentIndex.column+1] = true;
        this.totalMoves[this.agentIndex.row][this.agentIndex.column+1]++;
        return this.UP;
      }
      // if left is not visited, move there
      else if (this.agentIndex.row != 0 && !this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column]) {
        this.cellVisited[this.agentIndex.row - 1][this.agentIndex.column] = true;
        this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
        return this.LEFT;
      }
      // if down is not visited, move there
      else if (this.agentIndex.column != 0 && !this.cellVisited[this.agentIndex.row][this.agentIndex.column - 1]) {
        this.cellVisited[this.agentIndex.row][this.agentIndex.column-1] = true;
        this.totalMoves[this.agentIndex.row][this.agentIndex.column-1]++;
        return this.DOWN;
      }
      // if all neighbor have been visited, choose random direction
      else {
          console.log("free neighbor");
          while (true) {
              switch (this.rand(1, 4)) {
                  //if selected, move right
                  case 1:
                      if (this.agentIndex.row != 9) {
                          this.totalMoves[this.agentIndex.row + 1][this.agentIndex.column]++;
                          
                          this.contiguousRandomMoveCount++;
                          return this.RIGHT;
                      }
                      break;
                  //if selected, move up
                  case 2:
                      if (this.agentIndex.column != 9) {
                        this.totalMoves[this.agentIndex.row][this.agentIndex.column+1]++;
                          
                        this.contiguousRandomMoveCount++;
                        return this.UP;
                      }
                      break;
                  //if selected, move left
                  case 3:
                      if (this.agentIndex.row != 0) {
                        this.totalMoves[this.agentIndex.row - 1][this.agentIndex.column]++;
                          
                        this.contiguousRandomMoveCount++;
                        return this.LEFT;
                      }
                      break;
                  //if selected, move down
                  case 4:
                      if (this.agentIndex.column != 0) {
                        this.totalMoves[this.agentIndex.row][this.agentIndex.column - 1]++;
                        this.contiguousRandomMoveCount++;
                        return this.DOWN;
                      }
                      break;
              }
          }
      }
  }
    return -1;

  }

  removeStench(row: number, column: number){
    console.log('calleddd')
    if(row!=0){
      this.board[row-1][column] = this.board[row-1][column].replace('stench', 'S');
      this.stenchProbability[this.agentIndex.row-1][this.agentIndex.column] = 0.0
    }
    if(row!=9){
      this.board[row+1][column] = this.board[row+1][column].replace('stench', 'S');
      this.stenchProbability[this.agentIndex.row+1][this.agentIndex.column] = 0.0
      
    }
    if(column!=0){
      this.board[row][column-1] = this.board[row][column-1].replace('stench', 'S');
      this.stenchProbability[this.agentIndex.row][this.agentIndex.column-1] = 0.0
    
    }
    if(column!=9){
      this.board[row][column+1] = this.board[row][column+1].replace('stench', 'S');
      this.stenchProbability[this.agentIndex.row][this.agentIndex.column+1] = 0.0
    }
  }


  rand(min:number, max:number) {
    if (min == max)
        return min;

    var date = new Date();
    var count = date.getMilliseconds() % 10;

    for (var i = 0; i <= count; ++i)
        Math.random();

    if (min > max) {
        min ^= max;
        max ^= min;
        min ^= max;
    }

    return Math.floor((Math.random() * (max - min + 1)) + min);
}

  areWeInPitLoop() {
    if (this.contiguousRandomMoveCount > 0 && this.totalMoves[this.agentIndex.row][this.agentIndex.column] > 1 && this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze'))
        return true;
    else
        return false;
  }


  isItDangerCell(){
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze') || this.board[this.agentIndex.row][this.agentIndex.column].includes('stench')){
      return true;
    }
    return false;
  }

  isWumpusClose(){
    if(this.agentIndex.column!=9 && this.stenchProbability[this.agentIndex.row][this.agentIndex.column+1]>0.5){
      this.shootDirection = this.UP;
      return true;
    }
    if(this.agentIndex.column!=0 && this.stenchProbability[this.agentIndex.row][this.agentIndex.column-1]>0.5){
      this.shootDirection = this.DOWN;
      return true;
    }
    if(this.agentIndex.row!=9 && this.stenchProbability[this.agentIndex.row+1][this.agentIndex.column]>0.5){
      this.shootDirection = this.RIGHT;
      return true;
    }
    if(this.agentIndex.row!=0 && this.stenchProbability[this.agentIndex.row-1][this.agentIndex.column]>0.5){
      this.shootDirection = this.LEFT;
      return true;
    }
    return false;
  }

  calculateBreezeAndStench(){
    if(!this.nearDanger[this.agentIndex.row][this.agentIndex.column]){
      //// console.log(this.board)
      //// console.log(this.agentIndex.row, ' ', this.agentIndex.column)

      //// console.log(this.board[this.agentIndex.row][this.agentIndex.column])

      if(this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze')){
        this.updatePitWumpusPercentage(true, false);
      }

      if(this.board[this.agentIndex.row][this.agentIndex.column].includes('stench')){
        this.updatePitWumpusPercentage(false, true);
      }
    }
  }

  updatePitWumpusPercentage(pit:boolean, wumpus: boolean){
    if(this.agentIndex.column!=9 && !this.cellVisited[this.agentIndex.row][this.agentIndex.column+1]){
      if(pit){
        this.pitProbability[this.agentIndex.row][this.agentIndex.column+1]+=0.25
      }
      if(wumpus){
        this.stenchProbability[this.agentIndex.row][this.agentIndex.column+1]+=0.25
      }
    }
    if(this.agentIndex.row!=0 && !this.cellVisited[this.agentIndex.row-1][this.agentIndex.column]){
      if(pit){
        this.pitProbability[this.agentIndex.row-1][this.agentIndex.column]+=0.25
      }
      if(wumpus){
        this.stenchProbability[this.agentIndex.row-1][this.agentIndex.column]+=0.25
      }
    }
    if(this.agentIndex.row!=9 && !this.cellVisited[this.agentIndex.row+1][this.agentIndex.column]){
      if(pit){
        this.pitProbability[this.agentIndex.row+1][this.agentIndex.column]+=0.25
      }
      if(wumpus){
        this.stenchProbability[this.agentIndex.row+1][this.agentIndex.column]+=0.25
      }
    }
    if(this.agentIndex.column!=0 && !this.cellVisited[this.agentIndex.row][this.agentIndex.column-1]){
      if(pit){
        this.pitProbability[this.agentIndex.row][this.agentIndex.column-1]+=0.25
      }
      if(wumpus){
        this.stenchProbability[this.agentIndex.row][this.agentIndex.column-1]+=0.25
      }
    }
    this.nearDanger[this.agentIndex.row][this.agentIndex.column] = true;
  }

  checkWhereAgentIs(row: number, column: number):boolean{
    if(this.agentIndex.row==row && this.agentIndex.column==column){
      return true;
    }
    return false;
  }

  checkCheatDoorState(row: number, column: number):string{
    let demoBoard=this.cboard;
 
    if(this.board[row][column].includes('G')){
      return 'gold';
    }
  
   
    else if(this.board[row][column]=='W'){
      //// console.log('Wumpusss');
      return 'wumpus';
    }
    else if(this.board[row][column]=='P'){
      ////// console.log('Pittt');
      return 'pit';
    }
    else if(this.board[row][column].includes('stench')){
      return 'stench';
    }

    else if(this.board[row][column].includes('breeze')){
      return 'breeze';
    }

    else if(this.board[row][column]=='S'){
      return 'safe';
    }
     return 'safe';
  }

  checkDoorState(row: number, column: number):string{
    if(this.board[row][column].includes('G') && this.cellVisited[row][column]==true){
      return 'gold';
    }
    else if(this.board[row][column]=='S' && this.cellVisited[row][column]==false){
      return 'notvisited';
    }
    else if(this.board[row][column]=='S' && this.cellVisited[row][column]==true){
      return 'safe';
    }
    else if(this.board[row][column]=='W' && this.cellVisited[row][column]==true ){
      //// console.log('Wumpusss');
      return 'wumpus';
    }
    else if(this.board[row][column]=='P' && this.cellVisited[row][column]==true){
      //// console.log('Pittt');
      return 'pit';
    }
    else if(this.board[row][column].includes('stench') && this.cellVisited[row][column]==true){
      return 'stench';
    }
    else if(this.board[row][column].includes('breeze') && this.cellVisited[row][column]==true){
      return 'breeze';
    }
    
    
    return 'notvisited';
  }

  init(){
    for(var i=0; i< this.wumpusCount; i++){
      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(col<2 && row <2){
        i=i-1;
        continue;
      }
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      //// console.log(row, col)
      this.board[row][col] = 'W';
      if(col != 0)
        this.board[row][col-1] = 'stench'
      if(col != 9)
        this.board[row][col+1] = 'stench'
      if(row != 0)
        this.board[row-1][col] = 'stench'
      if(row != 9)
        this.board[row+1][col] = 'stench'
    }
    for(var i=0; i< this.pitCount; i++){
      
      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(row <2 && col <2){
        i=i-1;
        continue;
      }
      //// console.log(row, col)
      if(this.board[row][col]=='P' || this.board[row][col]=='W'){
        i = i-1;
        continue;
      }
      this.board[row][col] = 'P';
      if(col != 0)
        if(this.board[row][col-1] == 'stench')
          this.board[row][col-1] += 'breeze'
        else
          this.board[row][col-1] = 'breeze'
      if(col != 9)
        if(this.board[row][col+1] == 'stench')
          this.board[row][col+1] += 'breeze'
        else
          this.board[row][col+1] = 'breeze'
      if(row != 0)
        if(this.board[row-1][col] == 'stench')
          this.board[row-1][col] += 'breeze'
        else
          this.board[row-1][col] = 'breeze'
      if(row != 9)
        if(this.board[row+1][col] == 'stench')
          this.board[row+1][col] += 'breeze'
        else
          this.board[row+1][col] = 'breeze'
    }
    for(var i=0; i< this.goldCount; i++){

      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(row <2 && col<2){
        i=i-1;
        continue;
      }
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      this.board[row][col]+='G'
    }
    //Error Board

// this.board = [['S', 'S', 'S', 'SG', 'breeze', 'stench', 'W', 'stench', 'S', 'S'],
// ['S', 'S', 'S', 'breeze', 'P', 'breeze', 'stench', 'S', 'S', 'S'],
// ['S', 'S', 'S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S'], 
// ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
// ['S', 'S', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], 
// ['S', 'breeze', 'P', 'breeze', 'S', 'S', 'S', 'S', 'S', 'S'],
// ['S', 'SG', 'breeze', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
// ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'P', 'breeze'],
// ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'breeze', 'S'],
// ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']]
    this.cboard = JSON.parse(JSON.stringify(this.board))
    console.log(this.board);
  }

  
  fileInit() {

    console.log("ekhane "+this.settings.getBoard().split("\n").map(function(x){return x.split(" ")}));
    this.board = this.settings.getBoard().split("\n").map(function(x){return x.split(" ")});
    //  this.board = JSON.parse(JSON.stringify(this.settings.getBoard()))
    console.log(this.board);
    for(var row = 0; row<this.gridSize; row++){
      for(var col = 0; col<this.gridSize; col++){
        if(this.board[row][col].includes('G')){
          this.goldCount++;
        }
      }
    }
    console.log(this.goldCount);
   }



  @HostListener('document:keyup', ['$event'])
  changePosition(e:KeyboardEvent, row: number, col: number){
    if(e.key=="ArrowUp"){
     // // console.log("Go Up");
      if(this.agentIndex.row>0){
        this.agentIndex.row--;
      }
    }
    else if(e.key=="ArrowDown"){
     // // console.log("Go Down");
      if(this.agentIndex.row<9){
        this.agentIndex.row++;
      }
    }
    else if(e.key=="ArrowLeft"){
     // // console.log("Go Left");
      if(this.agentIndex.column>0){
        this.agentIndex.column--;
      }
    }
    else if(e.key=="ArrowRight"){
     // // // console.log("Go Right");
      if(this.agentIndex.column<9){
        this.agentIndex.column++;
      }
    }

    this.checkCellState();

  }

  checkCellState(){
    if(this.cellVisited[this.agentIndex.row][this.agentIndex.column]===false){
      this.cellVisited[this.agentIndex.row][this.agentIndex.column]=true;
    }
  }

  changeCheatMode(){
    if(this.cheatOn){
      //// console.log("Cheat if off");
      this.cheatOn = false;
    }
    else{
      //// console.log("Cheat is on");
      this.cheatOn = true;
    }
  }

  ngOnDestroy() {
    // destroy audio here
    if(this.audio) {
      this.audio.pause();
    }
  }

}
