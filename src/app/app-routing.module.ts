import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RectanglesComponent } from './rectangles/rectangles.component';



const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
