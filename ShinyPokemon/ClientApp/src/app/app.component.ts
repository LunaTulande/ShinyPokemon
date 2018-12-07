import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  //constructor(private http: HttpClient) {}
  constructor() { }

  ngOnInit(): void {
    /*this.http.get('http://localhost:51545/api/pokemon/shinies').subscribe(data => {
      console.log(data);
    });*/
  }
}
