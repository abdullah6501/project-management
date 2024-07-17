// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environment/environment';

// interface ProjectFile {
//   file_name: string;
//   file_url: string;
// }

// @Component({
//   selector: 'app-videos',
//   templateUrl: './videos.component.html',
//   styleUrls: ['./videos.component.css']
// })
// export class VideosComponent implements OnInit {
//   projectName: string | null = null;
//   projectFiles: ProjectFile[] = [];
//   // selectedFileUrl: string | null = null;
//   public apiUrl = environment.PORTFOLIO_BASEURL;


//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.projectName = params['projectName'];
//       if (this.projectName) {
//         this.fetchProjectFiles(this.projectName);
//       }
//     });
//   }

//   fetchProjectFiles(projectName: string): void {
//     const url = `${this.apiUrl}/files/${projectName}`;
//     this.http.get<ProjectFile[]>(url).subscribe({
//       next: (files) => {
//         this.projectFiles = files;
//       },
//       error: (error) => {
//         console.error('Error fetching project files:', error);
//       }
//     });
//   }
//   // playVideo(fileUrl: string): void {
//   //   this.selectedFileUrl = fileUrl;
//   // }
// }






// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environment/environment';

// interface ProjectFile {
//   file_name: string;
//   file_url: string;
// }

// @Component({
//   selector: 'app-videos',
//   templateUrl: './videos.component.html',
//   styleUrls: ['./videos.component.css']
// })
// export class VideosComponent implements OnInit {
//   projectName: string | null = null;
//   projectFiles: ProjectFile[] = [];
//   public apiUrl = environment.PORTFOLIO_BASEURL;

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.projectName = params['projectName'];
//       if (this.projectName) {
//         this.fetchProjectFiles(this.projectName);
//       }
//     });
//   }

//   fetchProjectFiles(projectName: string): void {
//     const url = `${this.apiUrl}/files/${projectName}`;
//     this.http.get<ProjectFile[]>(url).subscribe({
//       next: (files) => {
//         this.projectFiles = files;
//       },
//       error: (error) => {
//         console.error('Error fetching project files:', error);
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ProjectFile {
  file_name: string;
  file_url: string;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  projectName: string | null = null;
  projectFiles: ProjectFile[] = [];
  public apiUrl = environment.PORTFOLIO_BASEURL;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectName = params['projectName'];
      if (this.projectName) {
        this.fetchProjectFiles(this.projectName);
      }
    });
  }

  fetchProjectFiles(projectName: string): void {
    const url = `${this.apiUrl}/files/${projectName}`;
    this.http.get<ProjectFile[]>(url).subscribe({
      next: (files) => {
        this.projectFiles = files;
        this.snackBar.open('Files Fetched successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Error fetching project files:', error);
        this.snackBar.open('Failed to Fetch Files.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  isVideo(fileName: string): boolean {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const fileExtension = fileName.split('.').pop();
    return videoExtensions.includes(fileExtension || '');
  }
}
