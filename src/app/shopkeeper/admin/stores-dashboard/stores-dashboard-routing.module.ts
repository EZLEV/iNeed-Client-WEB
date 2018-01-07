import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresDashboardComponent } from './stores-dashboard.component';
import { AddStoresComponent } from './add-stores/add-stores.component';
import { EditStoresComponent } from './edit-stores/edit-stores.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { MustBeAdminGuard } from '../../guards/must-be-admin/must-be-admin.guard';

const routes: Routes = [
  {path: 'add', canActivate: [MustBeAdminGuard], data: {normal: true}, component: AddStoresComponent},
  {path: 'edit/:storeId', canActivate: [MustBeAdminGuard], data: {normal: true}, component: EditStoresComponent},
  {path: 'feedbacks/:storeId', component: FeedbacksComponent},
  {path: '', component: StoresDashboardComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresDashboardRoutingModule {
}
