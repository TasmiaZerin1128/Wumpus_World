import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public router: Router) { }

  sliderGrid= "10x10";
  sliderPit = 5;
  sliderWumpus = 2;
  sliderGold = 2;
  sliderRisk = "Easy";

  gridSelected = false;
  pitSelected =false;
  wumpusSelected = false;
  goldSelected = false;
  riskSelected = false;

  ngOnInit(): void {
  }

  startGame(){
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
