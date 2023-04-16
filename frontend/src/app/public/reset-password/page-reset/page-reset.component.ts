import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-reset',
  templateUrl: './page-reset.component.html',
  styleUrls: ['./page-reset.component.css']
})
export class PageResetComponent implements OnInit {

  token:string="";

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const currentParams = this.route.snapshot.params;     
    this.saveParams(currentParams);
    console.log(this.token)     
  }

  saveParams(params:any){    
   const array = Object.entries(params)
   //Token Recuperado   
   this.token = JSON.stringify(array[0][1]);
  }

}
