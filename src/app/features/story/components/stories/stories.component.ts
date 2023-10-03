import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Story } from 'src/app/stores/story/story.interface';
import { fromStory } from 'src/app/stores/story';
import { DataResult } from '@progress/kendo-data-query';
import { fromLoading } from 'src/app/stores/story/loading';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoriesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();
  public stories!: DataResult;
  public storiesList: Story[] = [];
  public loading: boolean = false;
  public pageSize: number = 10;
  public skip: number = 0;
  
  public loading$: Observable<boolean> = this.store.select(
    fromLoading.selectLoading
  );
  public stories$: Observable<Story[]> = this.store.select(
    fromStory.selectStories
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fromStory.load());
    this.showStories();
    this.showLoading();
  }
  public pageChange(state: PageChangeEvent): void {
    this.skip = state.skip;
    this.stories = {
      data: this.storiesList.slice(this.skip, this.skip + this.pageSize),
      total: this.storiesList.length,
    };
  }

  public searchForm: FormGroup = new FormGroup({
    title: new FormControl('')
  });

  public search(): void {
    var searchValue = this.searchForm.get('title')?.value.toLowerCase(); 
    var data = this.storiesList.filter((x) =>
      x.title.toLowerCase().includes(searchValue)
    );
    this.stories = {
      data: data.slice(this.skip, this.skip + this.pageSize),
      total: data.length,
    };
   
  }

  public clear(): void {
    this.searchForm.reset();
  }
  public showLoading() {
    this.loading$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result) => {
        this.loading = result;
      });
  }
  public showStories() {
    this.stories$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result) => {
        this.storiesList = result;
        this.stories = {
          data: this.storiesList.slice(this.skip, this.skip + this.pageSize),
          total: this.storiesList.length,
        };
      });
  }
  public reload(): void {
    this.store.dispatch(fromStory.load());
    this.showStories();
  }
  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
