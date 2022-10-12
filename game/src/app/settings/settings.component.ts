import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public fileInput: any;

  constructor(public router: Router, private settings: SettingsService) { }
  fileContent: string = "";
  sliderGrid= "10x10";
  sliderPit = 2;
  sliderWumpus = 2;
  sliderGold = 2;
  sliderRisk = "Easy";

  gridSelected = false;
  pitSelected =false;
  wumpusSelected = false;
  goldSelected = false;
  riskSelected = false;

  file: any;

  board: string[][] = [];

  ngOnInit(): void {
    // fetch('game\board.txt')
    // .then(response => response.text())
    // .then(data => {
    //   // Do something with your data
    //   console.log(data);
    // });
  }

  onChange = (event: Event) => {
    const target= event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];

    let fileReader: FileReader = new FileReader();
    
    fileReader.onloadend = (e)=> {
    //  self.fileContent = fileReader.result;
   //  console.log(fileReader.result) ;
   if(fileReader.result){
    const fileContent=fileReader.result.toString();
    console.log(JSON.parse(JSON.stringify(fileContent)));

    this.fileInput = JSON.parse(JSON.stringify(fileContent))
   }
    }
    fileReader.readAsText(this.file);
    // this.router.navigate(['play']);
  };

  startGame(){
    this.settings.setgoldCount(this.sliderGold);
    this.settings.setpitCount(this.sliderPit);
    this.settings.setwumpusCount(this.sliderWumpus);

    this.board = JSON.parse(JSON.stringify(this.fileInput));
    this.settings.setBoard(this.fileInput);
    console.log(this.board[0][1]);
    this.router.navigate(['play']);
  }

  gridSize(e: any){
    if(this.gridSelected==false){
      this.gridSelected = true;
    }
    this.sliderGrid = e.target.value + "x" + e.target.value;
    console.log(this.sliderGrid);
  }

  pits(e: any){
    this.sliderPit = e.target.value;
    console.log(this.sliderPit);
  }

  gold(e: any){
    this.sliderGold = e.target.value;
    console.log(this.sliderGold);
  }

  wumpus(e: any){
    this.sliderWumpus = e.target.value;
    console.log(this.sliderWumpus);
  }

  risk(e: any){
    if(e.target.value==1){
      this.sliderRisk = "Easy";
    }
    else if(e.target.value==2){
      this.sliderRisk = "Medium";
    }
    else{
      this.sliderRisk = "Hard";
    }
    console.log(this.sliderRisk);
  }


  
}
