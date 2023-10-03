import { Injectable } from '@angular/core';
import { Story, StoryDto } from './story.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, retry, timer } from 'rxjs';

@Injectable()
export class StoryService {
  constructor(private httpClient: HttpClient) {}
  public getAllStories(): Observable<Story[]> {
    const endPoint = `${environment.apis.hackerNews}/api/Stories`;

    return this.httpClient.get<StoryDto[]>(endPoint).pipe(
      map((data) => this.transform(data)),
      catchError((error) => {
        throw error;
      }),
      retry({ count: 3, delay: this.shouldRetry })
    );
  }

  private shouldRetry(error: HttpErrorResponse) {
    //transient issues
    if (
      error.status === 503 || //service unavailable
      error.status === 408 || //timeout
      error.status === 500 //internal server error
    ) {
      return timer(1000);
    }

    throw error;
  }

  private transform(data: StoryDto[]): Story[] {
    return data.map((x) => ({
      title: x.title,
      url: x.url,
    }));
  }
}
