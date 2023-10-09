import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StoriesComponent } from './stories.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Story } from 'src/app/stores/story/story.interface';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { fromStory } from 'src/app/stores/story';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let store: MockStore;
  const initialPage = { skip: 0, take: 5 };
  const initialState = {
    story: {
      stories: [
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
        {
          title: 'My YC app: Dropbox - Throw away your USB drive',

          url: 'http://www.getdropbox.com/u/2/screencast.html',
        },
      ],
      loading: false,
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoriesComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showStories$ when reload is called', () => {
    const dummyStories: Story[] = [
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    ];

    store.overrideSelector(fromStory.selectStories, dummyStories);
    store.overrideSelector(fromStory.selectLoading, false);
    spyOn(store, 'dispatch').and.callThrough();

    component.reload();
    fixture.detectChanges();

    expect(component.storiesList).toEqual(dummyStories);
    expect(store.dispatch).toHaveBeenCalledWith(fromStory.load());
  });

  it('should handle pageChange', () => {
    const pageChangeEvent: PageChangeEvent = { skip: 1, take: 5 };
    const storiesList: Story[] = [
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    ];
    component.pageSize = 5;
    component.storiesList = storiesList;

    component.pageChange(pageChangeEvent);

    expect(component.stories).toEqual({
      data: storiesList.slice(
        initialPage.skip,
        initialPage.skip + initialPage.take
      ),
      total: storiesList.length,
    });
  });

  it('should handle pageChange when take is zero', () => {
    const storiesList: Story[] = [];
    component.storiesList = storiesList;
    const pageChangeEvent: PageChangeEvent = { skip: 0, take: 0 };

    component.pageChange(pageChangeEvent);

    expect(component.stories).toEqual({
      data: [],
      total: storiesList.length,
    });
  });

  it('should handle search', () => {
    const storiesList: Story[] = [
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    ];
    const searchTerm = 'drive';
    component.storiesList = storiesList;
    component.stories = {
      data: storiesList,
      total: storiesList.length,
    };
    component.searchForm = new FormGroup({
      title: new FormControl(searchTerm),
    });

    component.search();

    const filteredData = storiesList.filter((x) =>
      x.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(component.stories).toEqual({
      data: filteredData.slice(
        initialPage.skip,
        initialPage.skip + initialPage.take
      ),
      total: filteredData.length,
    });
  });

  it('should handle search when searchTerm is empty', () => {
    const storiesList: Story[] = [
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',

        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    ];
    component.storiesList = storiesList;
    component.searchForm = new FormGroup({
      title: new FormControl(''),
    });

    component.search();

    expect(component.stories).toEqual({
      data: storiesList.slice(
        initialPage.skip,
        initialPage.skip + initialPage.take
      ),
      total: storiesList.length,
    });
  });

  it('should handle search when searchTerm is not found', () => {
    const storiesList: Story[] = [
      {
        title: 'My YC app: Dropbox - Throw away your USB drive',
        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    ];
    component.storiesList = storiesList;
    component.searchForm = new FormGroup({
      title: new FormControl('notfound'),
    });

    component.search();

    expect(component.stories).toEqual({
      data: [],
      total: 0,
    });
  });

  it('should handle clear', () => {
    const searchTerm = 'drive';
    component.searchForm = new FormGroup({
      title: new FormControl(searchTerm),
    });

    component.clear();

    expect(component.searchForm.get('title')?.value).toEqual(null);
  });
});
