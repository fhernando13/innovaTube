import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environonments/environment.prod';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiyoutubeService {

  apikey = environment.apikey;
  private youtubeUrl = 'https://youtube.googleapis.com/youtube/v3';
  private playlist = 'UCfIXdjDQH9Fau7y99_Orpjw';

  constructor(private http: HttpClient) { }

  getVideos() {

    const url = `${ this.youtubeUrl }/search`;

    const parametros = new HttpParams()
    .set('key', this.apikey)
    .set('channelId', this.playlist)
    .set('part', 'snippet')
    .set('maxResults', 1)
    
    
    return this.http.get<any>( url, { params:parametros })
              .pipe(map(res=>res))
  }

}
