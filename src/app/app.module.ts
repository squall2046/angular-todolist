import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// manually import forms module
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { TodoListComponent } from './components/todolist/todolist.component';

// manually import storage module
import { StorageService } from './services/storage.service';

@NgModule({
  // components
  declarations: [
    AppComponent,
    SearchComponent,
    TodoListComponent
  ],

  // modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],

  //services
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
