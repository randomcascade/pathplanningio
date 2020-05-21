import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RectanglesComponent } from './rectangles/rectangles.component';



const routes: Routes = [
  { path: 'rectangles', component: RectanglesComponent },
  { path: '', redirectTo: '/rectangles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
