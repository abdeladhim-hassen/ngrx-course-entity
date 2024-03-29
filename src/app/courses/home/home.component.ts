import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAdvancedCourses, selectBeginnerCourses, selectTotalPromotion } from '../courses.selectors';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
     private store: Store<AppState>) {

    }

    ngOnInit() {
      this.reload();
    }

    reload() {
      this.promoTotal$ = this.store.pipe(select(selectTotalPromotion))
      this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses))
      this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses))
  
    }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
