import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor() { }
  wumpusCount = 2;
  pitCount = 3;
  goldCount = 2;
  point = 0;
  UP = 0;
  DOWN = 1;
  LEFT = 2;
  RIGHT = 3;
  shootDirection !: number;
  moveDirector !: number;
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
contiguousRandomMoveCount = 0;
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


  audio = new Audio();

  ngOnInit(): void {
    this.cellVisited[0][0] = true;

    // this.visit(0,0);
    // console.log(this.knowledge);
    // console.log('pit: ', this.pitProbability);
    // console.log('stench: ',this.stenchProbability);
    this.audio.src = "../../assets/audio/bgMusic.mp3";
    this.audio.load();
    this.audio.play();
    this.init();
    this.audio.volume = 0.3;
    // this.visit(1,0);
    // console.log(this.knowledge);
    // console.log('pit: ', this.pitProbability);
    // console.log('stench: ',this.stenchProbability);
    // this.visit(0,1);
    // console.log(this.knowledge);
    // console.log('pit: ', this.pitProbability);
    // console.log('stench: ',this.stenchProbability);
  }

  counter(i: number) {
    return new Array(i);
  }

  areWeInPitLoop() {
    if (this.contiguousRandomMoveCount > 0 && this.totalMoves[this.agentIndex.row][this.agentIndex.column] > 1 && this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze'))
        return true;
    else
        return false;
  }

  visit(row: number, col: number){
    this.cellVisited[row][col] = true;
    this.knowledge[row][col] = this.board[row][col];
    if(row!=0) this.updateProbability(row-1, col);
    if(col!=0) this.updateProbability(row, col-1);
    if(row!=9) this.updateProbability(row+1, col);
    if(col!=9) this.updateProbability(row, col+1);
  }

  updateProbability(row: number, col: number){
    //check if any adjacent point has no warning.
    if(row!=0){
      if(this.knowledge[row-1][col]=='S'){
        this.pitProbability[row-1][col] = 0.0
        this.stenchProbability[row-1][col] = 0.0
        return
      }
      if(this.knowledge[row-1][col].includes('stench')){
        this.stenchProbability[row-1][col] += 0.25
        
      }
      if(this.knowledge[row-1][col].includes('breeze')){
        this.pitProbability[row-1][col] += 0.25
        
      }
    }
    if(row!=9){
      if(this.knowledge[row+1][col]=='S'){
        this.pitProbability[row+1][col] = 0.0
        this.stenchProbability[row+1][col] = 0.0
        return
      }
      if(this.knowledge[row+1][col].includes('stench')){
        this.stenchProbability[row+1][col] += 0.25
        
      }
      if(this.knowledge[row+1][col].includes('breeze')){
        this.pitProbability[row+1][col] += 0.25
        
      }
    }
    
    if(col!=0){
      if(this.knowledge[row][col-1]=='S'){
        this.pitProbability[row][col-1]=0.0
        this.stenchProbability[row][col-1]=0.0
        return
      }
      if(this.knowledge[row][col-1].includes('stench')){
        this.stenchProbability[row][col-1] += 0.25
        
      }
      if(this.knowledge[row][col-1].includes('breeze')){
        this.pitProbability[row][col-1] += 0.25
        
      }
    }

    if(col!=9){
      if(this.knowledge[row][col+1]=='S'){
        this.pitProbability[row][col+1]=0.0
        this.stenchProbability[row][col+1] = 0.0
        return
      }
      if(this.knowledge[row][col+1].includes('stench')){
        this.stenchProbability[row][col+1] += 0.25
        
      }
      if(this.knowledge[row][col+1].includes('breeze')){
        this.pitProbability[row][col+1] += 0.25
        
      }
    }

  }

  isItDangerCell(){
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze') || this.board[this.agentIndex.row][this.agentIndex.column].includes('stench')){
      return true;
    }
    return false;
  }

  isWumpusClose(){
    if(this.agentIndex.column!=9 && this.stenchProbability[this.agentIndex.row][this.agentIndex.column+1]>0.5){
      this.shootDirection = this.RIGHT;
      return true;
    }
    if(this.agentIndex.column!=0 && this.stenchProbability[this.agentIndex.row][this.agentIndex.column-1]>0.5){
      this.shootDirection = this.LEFT;
      return true;
    }
    if(this.agentIndex.row!=9 && this.stenchProbability[this.agentIndex.row+1][this.agentIndex.column]>0.5){
      this.shootDirection = this.UP;
      return true;
    }
    if(this.agentIndex.row!=9 && this.stenchProbability[this.agentIndex.row-1][this.agentIndex.column]>0.5){
      this.shootDirection = this.DOWN;
      return true;
    }
    return false;
  }

  calculateBreezeAndStench(){
    if(!this.nearDanger[this.agentIndex.row][this.agentIndex.column]){
      if(this.board[this.agentIndex.row][this.agentIndex.column].includes('breeze')){
        this.updatePitWumpusPercentage(true, false);
      }

      if(this.board[this.agentIndex.row][this.agentIndex.column].includes('stench')){
        this.updatePitWumpusPercentage(false, true);
      }
    }
  }

  updatePitWumpusPercentage(pit:boolean, wumpus: boolean){
    if(this.agentIndex.column!=9 && !this.cellVisited[this.agentIndex.row-1][this.agentIndex.column]){
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
    if(this.agentIndex.row!=9 && !this.cellVisited[this.agentIndex.row-1][this.agentIndex.column]){
      if(pit){
        this.pitProbability[this.agentIndex.row+1][this.agentIndex.column]+=0.25
      }
      if(wumpus){
        this.stenchProbability[this.agentIndex.row+1][this.agentIndex.column]+=0.25
      }
    }
    if(this.agentIndex.column!=0 && !this.cellVisited[this.agentIndex.row-1][this.agentIndex.column]){
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

  checkDoorState(row: number, column: number):String{
    if(this.board[row][column]==='S' && this.cellVisited[row][column]==false){
      return 'safe';
    }
    else if(this.board[row][column]==='S' && this.cellVisited[row][column]==true){
      return 'visited';
    }
    return 'safe';
  }

  init(){
    for(var i=0; i< this.wumpusCount; i++){
      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      //console.log(row, col)
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
      //console.log(row, col)
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
    for(var i=0; i< this.wumpusCount; i++){
      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      this.board[row][col]='G'
    }
    console.log(this.board)
  }



  @HostListener('document:keyup', ['$event'])
  changePosition(e:KeyboardEvent, row: number, col: number){
    if(e.key=="ArrowUp"){
     // console.log("Go Up");
      if(this.agentIndex.row>0){
        this.agentIndex.row--;
      }
    }
    else if(e.key=="ArrowDown"){
     // console.log("Go Down");
      if(this.agentIndex.row<9){
        this.agentIndex.row++;
      }
    }
    else if(e.key=="ArrowLeft"){
     // console.log("Go Left");
      if(this.agentIndex.column>0){
        this.agentIndex.column--;
      }
    }
    else if(e.key=="ArrowRight"){
     // console.log("Go Right");
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

}
