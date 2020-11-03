import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule} from '@angular/forms';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'movie-detail', component: MovieDetailComponent},
  {path: 'search-movie', component: MovieSearchComponent},
  {path: 'forum', component: ForumPageComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    TodoListComponent,
    MovieSearchComponent,
    ForumPageComponent,
    FavoritesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
