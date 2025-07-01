import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes as tabsRoutes } from './tabs/tabs-routing.module';

@NgModule({
  imports: [RouterModule.forRoot(tabsRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}