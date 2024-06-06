import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss']
})
export class WatchVideoComponent implements OnInit {
  
  videoId = '';
  urlSafe: any;
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef : MatDialogRef<WatchVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit() {   
    this.dialogRef.updateSize('40%', '50%'); 
    let object = this.data;
    // console.log(Object.keys(objeto));
    // console.log(typeof(object.videoId));
    object.videoId;

    const url = 'https://www.youtube.com/embed/'+object.videoId;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  onCancel():void{
    this.dialogRef.close();
  }

}