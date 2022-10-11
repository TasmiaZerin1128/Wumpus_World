import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

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

  ngOnInit(): void {
    // fetch('game\board.txt')
    // .then(response => response.text())
    // .then(data => {
    //   // Do something with your data
    //   console.log(data);
    // });
  }

  public  onChange = (event: Event) => {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
    //  self.fileContent = fileReader.result;
   //  console.log(fileReader.result) ;
     const fileContent=fileReader.result;

    }
    fileReader.readAsText(file);
    this.router.navigate(['play']);
    /** do something with the file **/
  };

    // public onChange(fileList: FileList): void {
    //   let file = fileList[0];
      // let fileReader: FileReader = new FileReader();
      // let self = this;
      // fileReader.onloadend = function(x) {
      // //  self.fileContent = fileReader.result;
      //  console.log(fileReader.result) ;

      // }
      // fileReader.readAsText(file);
    // }

  startGame(){
    this.settings.setgoldCount(this.sliderGold);
    this.settings.setpitCount(this.sliderPit);
    this.settings.setwumpusCount(this.sliderWumpus);
    this.settings.setBoard(this.fileContent);

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
