import { Component, OnInit } from '@angular/core';
import { ApiyoutubeService } from 'src/app/service/youtubeService/apiyoutube.service';
import { Video } from '../../../models/videos';

//Sweetalert
import Swal from 'sweetalert2'
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-listvideos',
  templateUrl: './listvideos.component.html',
  styleUrls: ['./listvideos.component.scss']
})
export class ListvideosComponent implements OnInit {

  title = '';
  time = '';
  videos: any

  constructor( private youtubeService: ApiyoutubeService){
    // this.youtubeService.getVideos().subscribe((res:any)=>{

    // })
  }

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos() {
    
    
    this.youtubeService.getVideos().subscribe({      
      next: (data) => {console.log(data),
                      this.videos = data.items},
      error: (err) => console.log(err),
    })
         
  }
 
  
}
