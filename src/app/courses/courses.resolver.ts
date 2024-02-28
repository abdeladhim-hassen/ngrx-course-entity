import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CourseResolver  {
    Loading = false
  constructor( private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<any> {
  

    return this.store.pipe(
      select(areCoursesLoaded),
      tap(
       coursesloaded  => {
            if(!this.Loading && ! coursesloaded){
                this.Loading = true
                this.store.dispatch(loadAllCourses())
            }
           
        }),
        filter(coursesloaded => !!coursesloaded),
        first(),
        finalize(()=>{this.Loading = false})
    )
  }
}
