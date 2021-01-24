import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';


function make2DArray(row, columns) {
  let temp = new Array(row);
  for (let i = 0; i < row; i++) {
    temp[i] = new Array(columns);
  }
  return temp;
}

class Cell {
  public p: p5;
  public i: number;
  public x: number;
  public y: number;
  public size=20;
  public isStart: boolean;
  public isTarget: boolean;
  public isBoundary: boolean;
  public wasVisited: boolean;
  public isObstacle: boolean;
  constructor(s: p5, idx ?: number, row ?: number, col ?: number) {
    this.i = idx;
    this.x = row;
    this.y = col;
    this.p = s;
  }
  show() {
    this.p.stroke(0);
    this.p.fill(100);
    this.p.rect(this.x, this.y, this.size, this.size);
  }


}


@Component({
  selector: 'app-rectangles',
  templateUrl: './rectangles.component.html',
  styleUrls: ['./rectangles.component.css']
})
export class RectanglesComponent implements OnInit {
  public height = 10;
  public width = 10;
  public grid: any[];
  canvas: any;
  constructor() {}

  ngOnInit(): void {
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(401, 401);
        canvas2.parent('grid-holder');
        s.rect(0, 0, s.width, s.height);
        s.stroke(2);
      };
      s.draw = () => {
        s.background(10);
        this.grid = make2DArray(20, 20);
        for(let i = 0; i < 400; i++) {
          this.grid[Math.floor(i/20)][i%20]= new Cell(s, i, Math.floor(i/20)*20, (i%20)*20);
        }
        for(let i = 0; i < 400; i++) {
          this.grid[Math.floor(i/20)][i%20].show();
        }


      };
    };
    this.canvas = new p5(sketch);
  }

}
