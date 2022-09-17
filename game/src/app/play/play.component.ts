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

 cellVisited: boolean[][] = [];

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


  ngOnInit(): void {
    if(Array.isArray(this.cellVisited[0])){
      for(var r=0;r<10;r++){
      for(var c=0;c<10;c++){
        this.cellVisited[r][c] = false;
      }
    }

    this.cellVisited[0][0] = true;
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

  checkDoorState(row: number, column: number){
    if(Array.isArray(this.cellVisited[0])){
    if(this.board[row][column]==='S' && this.cellVisited[row][column]==false){
      console.log(this.cellVisited[row][column]);
      return 'safe';
    }
    else if(this.board[row][column]==='S' && this.cellVisited[row][column]==true){
      return 'visited';
    }
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

  }

}
