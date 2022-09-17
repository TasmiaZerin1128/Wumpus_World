import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor() { }

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

//  board = [
//         ['A','S','S','W','S','S','S','S','S','S'],
// 				['S','S','P','S','S','S','S','S','S','S'],
// 				['S','P','W','S','S','G','S','S','S','S'],
// 				['W','S','S','P','S','S','S','S','S','S'],
// 				['S','S','S','S','G','S','S','S','S','S'],
// 				['S','S','S','S','S','S','P','S','S','S'],
// 				['S','S','S','S','S','S','S','S','S','S'],
// 				['S','S','S','S','S','S','S','S','S','S'],
// 				['S','S','S','S','S','S','S','S','S','S'],
// 				['S','S','S','S','S','S','S','S','S','S']
//  ]

board = [
  ['S','S','P','S','S','S','S','S','S','S'],
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

  agentIndex = {
    row: 0,
    column: 0,
  }


  audio = new Audio();

  ngOnInit(): void {
    this.cellVisited[0][0] = true;


    this.audio.src = "../../assets/audio/bgMusic.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.volume = 0.3;
  }

  ngOnDestroy() {
    // destroy audio here
    if(this.audio) {
      this.audio.pause();
    }
  }

  counter(i: number) {
    return new Array(i);
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



  @HostListener('document:keyup', ['$event'])
  changePosition(e:KeyboardEvent, row: number, col: number){
    if(e.key=="ArrowUp"){
      console.log("Go Up");
      if(this.agentIndex.row>0){
        this.agentIndex.row--;
      }
    }
    else if(e.key=="ArrowDown"){
      console.log("Go Down");
      if(this.agentIndex.row<9){
        this.agentIndex.row++;
      }
    }
    else if(e.key=="ArrowLeft"){
      console.log("Go Left");
      if(this.agentIndex.column>0){
        this.agentIndex.column--;
      }
    }
    else if(e.key=="ArrowRight"){
      console.log("Go Right");
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
