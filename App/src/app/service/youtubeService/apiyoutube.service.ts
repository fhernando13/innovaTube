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
  private channelId = 'UCiMhD4jzUqG-IgPzUmmytRQ';

  constructor(private http: HttpClient) { }

  getVideos() {

    const url = `${ this.youtubeUrl }/search`;

    const parametros = new HttpParams()
    .set('key', this.apikey)
    .set('channelId', this.channelId)
    .set('part', 'snippet')
    .set('maxResults', 6)
    
    
    return this.http.get<any>( url, { params:parametros })
              .pipe(map(res=>res))
  }

}
