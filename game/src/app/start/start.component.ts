import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  goNextPage(){
    console.log("Settings");
    this.router.navigate(['settings']);
  }
}
