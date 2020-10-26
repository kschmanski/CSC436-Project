import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule} from "@angular/forms";
import { ForumPageComponent } from './forum-page/forum-page.component';

const routes: Routes = [
  {path: 'movie-detail', component:MovieDetailComponent},
  {path: 'todo', component:TodoListComponent},
  {path: 'forum', component:ForumPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    TodoListComponent,
    ForumPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
