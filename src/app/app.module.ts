import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ForumPageComponent } from './forum/forum-page/forum-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InteractionService } from './interaction.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ForumPostComponent } from './forum/forum-post/forum-post.component';

const routes: Routes = [
  {path: 'movie-detail', component: MovieDetailComponent},
  {path: 'search-movie', component: MovieSearchComponent},
  {path: 'forum', component: ForumPageComponent, canActivate: [AuthGuard]},
  {path: 'post', component: ForumPostComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    ForumPageComponent,
    FavoritesComponent,
    HomeComponent,
    LoginComponent,
    ForumPostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
