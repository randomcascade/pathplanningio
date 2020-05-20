import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectangles',
  templateUrl: './rectangles.component.html',
  styleUrls: ['./rectangles.component.css']
})
export class RectanglesComponent implements OnInit {
  height: number;
  width: number;

  constructor(public h?: number, public w?: number) {
    this.height = h;
    this.width = w;
   }

  ngOnInit(): void {
  }

}
