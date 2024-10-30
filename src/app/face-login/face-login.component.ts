import { Component } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-face-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, WebcamModule],
  templateUrl: './face-login.component.html',
  styleUrls: ['./face-login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FaceLoginComponent {
  constructor(private http: HttpClient, private router: Router) {}
  
  permissionStatus: string = '';
  camData: MediaStream | null = null; 
  capturedImage: string = '';
  trigger: Subject<void> = new Subject();

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  checkPermission() {
    navigator.mediaDevices.getUserMedia({ video: { width: 500, height: 500 } })
      .then((stream) => {
        this.permissionStatus = 'Allowed';
        this.camData = stream; 
        console.log(this.camData);
      })
      .catch(err => {
        this.permissionStatus = 'Not Allowed';
        console.log(this.permissionStatus);
      });
  }

  capture(event: WebcamImage) {
    console.log("event", event); 
    if (event && event.imageAsDataUrl) {
      this.capturedImage = event.imageAsDataUrl;
      this.sendImageToAPI(this.capturedImage); 
    } else {
      console.error('Captured image is not valid');
    }
  }
  
  captureImage() {
    this.trigger.next();
  }

  sendImageToAPI(imageData: string) {
 
    const payload = {
      image: imageData
    };

 
    this.http.post('http://127.0.0.1:8000/api/face-login/', payload)
      .subscribe((response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          this.stopCamera(); 
          this.router.navigate(['/home']);
        } else {
          alert(response.error);
        }
      }, (error) => {
        console.error('Error sending image:', error);
      });
  }

  stopCamera() {
    if (this.camData) {
      const tracks = this.camData.getTracks();
      tracks.forEach(track => track.stop()); 
      this.camData = null; 
    }
  }
}
