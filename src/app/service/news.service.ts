import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private API = environment.API_KEY;
  constructor(private http: HttpClient) {}

  // initialize news sources
  initSource() {
    return this.http.get(
      `https://newsapi.org/v2/sources?language=en&apikey=${this.API}`
    );
  }

  // get articles by id
  getArticleById(source: string) {
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${this.API}`
    );
  }

  // get all articles
  initArticles() {
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API}`
    );
  }
}
