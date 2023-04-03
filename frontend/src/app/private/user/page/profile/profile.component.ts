import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  img = "https://qph.cf2.quoracdn.net/main-qimg-d2de26e1ee550bf4d2035ce876e4fde7-lq"
  constructor() { }

  ngOnInit(): void {
  }

}
