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
  public color=255;
  public size=30;
  public isStart=false;
  public isTarget=false;
  public isBoundary=false;
  public wasVisited=false;
  public isObstacle = false;
  constructor(s: p5, idx ?: number, sz ?: number, row ?: number, col ?: number) {
    this.i = idx;
    this.x = row;
    this.y = col;
    this.p = s;
    this.size = sz;
  }
  show() {
    this.p.stroke(0);
    this.p.fill(this.color);
    this.p.rect(this.x, this.y, this.size, this.size);
  }
  contains(mx, my) {
    if(mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size) {
      return true;
    }
    return false;
  }
  change(n: number) {
    this.color=n;
    if(this.color==0) {
      this.isObstacle=true;
    }
    else if(this.color==255) {
      this.isObstacle=false;
    }
    else if(this.color==75) {
      this.isTarget=true;
    }
    else if(this.color==150) {
      this.isStart=true;
    }

  }



}


@Component({
  selector: 'app-rectangles',
  templateUrl: './rectangles.component.html',
  styleUrls: ['./rectangles.component.css']
})
export class RectanglesComponent implements OnInit {
  public size = 30;
  public rows = 20;
  public columns = 20;
  public grid: any[];
  public sx=4;
  public sy=9;
  public tx=15;
  public ty=9;
  public dragType = 'None';
  canvas: any;
  constructor() {}

  ngOnInit(): void {
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(this.rows*this.size+1, this.columns*this.size+1);
        canvas2.parent('grid-holder');
        s.rect(0, 0, s.width, s.height);
        s.stroke(10);
        this.grid = make2DArray(this.rows, this.columns);
        for(let i = 0; i < 400; i++) {
          this.grid[Math.floor(i/this.rows)][i%this.columns]= new Cell(s, i,
            this.size, Math.floor(i/this.rows)*this.size, (i%this.columns)*this.size);
        }
        this.grid[this.sx][this.sy].change(150);
        this.grid[this.tx][this.ty].change(75);
      };
      s.draw = () => {
        s.background(10);
        for(let i = 0; i < 400; i++) {
          this.grid[Math.floor(i/this.rows)][i%this.columns].show();
        }
        if(s.mouseIsPressed && this.dragType==='None') {
          for(let i = 0; i < 400; i++) {
            if(this.grid[Math.floor(i/this.rows)][i%this.columns].contains(s.mouseX, s.mouseY)) {
              let x = Math.floor(i/this.rows);
              let y = i%this.columns;
              if(this.grid[x][y].isStart) {
                this.dragType='Start';
              }
              else if(this.grid[x][y].isTarget) {
                this.dragType='End';
              }
              else if(this.grid[x][y].isObstacle) {
                this.dragType='ObsRemove';
                this.grid[x][y].change(255);
              }
              else if(!this.grid[x][y].isObstacle) {
                this.dragType='ObsCreate';
                this.grid[x][y].change(0);
              }
            }
          }
        }


      };
      s.mouseDragged = () => {
        if(this.dragType==='ObsRemove' || this.dragType==='ObsCreate') {
          for(let i = 0; i < 400; i++) {
            if(this.grid[Math.floor(i/this.rows)][i%this.columns].contains(s.mouseX, s.mouseY)) {
              let x = Math.floor(i/this.rows);
              let y = i%this.columns;
              if(this.dragType==='ObsCreate' && !this.grid[x][y].isObstacle && !this.grid[x][y].isTarget && !this.grid[x][y].isStart) {
                this.grid[x][y].change(0);
              }
              else if(this.dragType==='ObsRemove' && this.grid[x][y].isObstacle && !this.grid[x][y].isTarget && !this.grid[x][y].isStart) {
                this.grid[x][y].change(255);
              }
            }
          }
        }
      };
      s.mouseReleased = () => {
        if(this.dragType=="Start" || this.dragType=="End") {
          for(let i = 0; i < 400; i++) {
            if(this.grid[Math.floor(i/this.rows)][i%this.columns].contains(s.mouseX, s.mouseY)) {
              let x = Math.floor(i/this.rows);
              let y = i%this.columns;
              if (this.dragType=='Start' && !this.grid[x][y].isObstacle && !this.grid[x][y].isTarget && !this.grid[x][y].isStart) {
                this.grid[x][y].isStart=true;
                this.grid[x][y].change(150);
                this.grid[this.sx][this.sy].change(255);
                this.grid[this.sx][this.sy].isStart=false;
                this.sx=x;
                this.sy=y;
              }
              else if(!this.grid[x][y].isObstacle && !this.grid[x][y].isTarget && !this.grid[x][y].isStart) {
                this.grid[x][y].isTarget=true;
                this.grid[x][y].change(75);
                this.grid[this.tx][this.ty].change(255);
                this.grid[this.tx][this.ty].isTarget=false;
                this.tx=x;
                this.ty=y;
              }
            }
          }
        }
        this.dragType="None";
      };
    };
    this.canvas = new p5(sketch);
  }

}
