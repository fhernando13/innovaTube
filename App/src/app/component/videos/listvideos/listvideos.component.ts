import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiyoutubeService } from 'src/app/service/youtubeService/apiyoutube.service';
import { MatDialog } from '@angular/material/dialog';
import { WatchVideoComponent } from '../watch-video/watch-video.component';

@Component({
  selector: 'app-listvideos',
  templateUrl: './listvideos.component.html',
  styleUrls: ['./listvideos.component.scss']
})
export class ListvideosComponent implements OnInit {

  videos: any =[];
  videoId = '';
  
  constructor( private youtubeService: ApiyoutubeService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               public dialog: MatDialog){
   
  }

  ngOnInit(): void {
    this.listVideos();
  }

  listVideos() {        
    this.youtubeService.getVideos().subscribe({      
      next: (data) => { this.videos = data.items },
      error: (err) => console.log(err),
    })
         
  }

  openVideo(idVideo:string){
    console.log(idVideo);
    this.videoId =idVideo;
    const dialogRef = this.dialog.open(WatchVideoComponent, {
      data: {videoId:this.videoId}
    })
  }  
     
}
