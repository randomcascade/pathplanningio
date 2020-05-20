import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectangles',
  templateUrl: './rectangles.component.html',
  styleUrls: ['./rectangles.component.css']
})
export class RectanglesComponent implements OnInit {
  public height = 10;
  public width = 10;
  public grid: any[];
  constructor() {
   }

  ngOnInit(): void {
  }
  newRectangles(h: number, w: number) {
    this.grid = Array(h * w).fill(null);

  }

}
