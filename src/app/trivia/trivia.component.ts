import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from '../app.component';

class Question {
  question: string;
  correct: string;
  allAnswers = [];
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  trivia: Question[] = [];
  apiURL = "https://opentdb.com/api.php?amount=5&category=11";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTrivia();
    console.log(this.trivia)
  }


  getTrivia(): void {
    this.http.get<any>(this.apiURL).subscribe( api_data => {
      //console.log(api_data);
      for(var tmp of api_data.results)  {
        let q = new Question();
        q.question = tmp.question.replace(/&quot;/g , "\"").replace(/&#039;/g, "\'").replace(/&amp;/g, "&");
        q.correct = tmp.correct_answer.replace(/&quot;/g, "\"").replace(/&#039;/g, "\'").replace(/&amp;/g, "&");
        q.allAnswers.push(q.correct);
        for(var ans of tmp.incorrect_answers) {
          q.allAnswers.push(ans.replace(/&quot;/g, "\"").replace(/&#039;/g, "\'").replace(/&amp;/g, "&"));
        }
        this.trivia.push(q);
      }
    });

    /** Using other api
    var apiUrl = settings.url;
    // tslint:disable-next-line: no-use-before-declare
    this.http.get<any>(apiUrl, settings).subscribe( api_data => {
      for (var factoid of api_data.trivia) {
        this.trivia.push(factoid);
        //console.log(factoid);
      }
    }); */
  }
}


var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://webknox-trivia-knowledge-facts-v1.p.rapidapi.com/trivia/search?topic=movie",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "195b12d6f0mshe52a785c6bbf16bp196bfbjsn7b9cebbaeae6",
		"x-rapidapi-host": "webknox-trivia-knowledge-facts-v1.p.rapidapi.com"
	}
};