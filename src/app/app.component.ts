import {
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'NewsApp';
  public sources: any = [];
  public articles: any = [];
  public selectedNewsChannel: string = "Top Ten Trending News";
  public currentYear = new Date().getFullYear()
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private newsservice: NewsService
  ) {}
  ngOnInit(): void {
        // initialize sources
        this.newsservice.initSource().subscribe({
          next: (res: any) => {
            this.sources = res.sources;
          },
        });

    // initialize articles
    this.newsservice.initArticles().subscribe({
      next: (res: any) => {
        this.articles = res.articles;
      },
    });
  }

    // get a particle sources
    searchSource(source:any) {
      this.newsservice.getArticleById(source.id).subscribe({
        next: (res:any) => {
          this.articles = res.articles
          this.selectedNewsChannel = source.name
        }
      })
    }
  // for the sidebar
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cd.detectChanges();
  }


}
