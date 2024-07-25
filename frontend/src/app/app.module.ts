import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddlistComponent } from './addlist/addlist.component';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddlistDialogComponent } from './addlist-dialog/addlist-dialog.component';
import { VideosComponent } from './videos/videos.component';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltip } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddlistComponent,
    AddlistDialogComponent,
    VideosComponent
    // MatTooltip
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
