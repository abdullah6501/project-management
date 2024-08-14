import { Injector, NgModule } from '@angular/core';
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
<<<<<<< HEAD
import { AuthModule } from '@auth0/auth0-angular';
import { createCustomElement } from '@angular/elements';
=======
import { MatTooltip } from '@angular/material/tooltip';
>>>>>>> 1ae0dc9004a8abd535a9475fc74f134113bcbb38

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
    }),
    // AuthModule.forRoot({
    //   domain: 'YOUR_AUTH0_DOMAIN',
    //   clientId: 'YOUR_AUTH0_CLIENT_ID',
    //   redirectUri: window.location.origin
    // }),
  ],
  providers: [],
  // entryComponents: [ListComponent], 
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {
    const el = createCustomElement(ListComponent, { injector });
    customElements.define('list', el);  // Define custom element
  }

  ngDoBootstrap() {}  // Manually bootstrap the app
}
