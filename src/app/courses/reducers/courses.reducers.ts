import { createReducer, on } from "@ngrx/store";
import { Course, compareCourses } from "../model/course";
import { CourseActions } from "../actions.types";
import { EntityState, createEntityAdapter } from "@ngrx/entity";


export const courseFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
   allCoursesLoaded: Boolean
}

export const adapter = createEntityAdapter<Course>(
  {
    sortComparer: compareCourses,
  }
)
export const initialCoursesState = adapter.getInitialState({allCoursesLoaded: false})

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => 
  adapter.addMany(action.courses, {...state, allCoursesLoaded : true})
  ),
  on(CourseActions.courseUpdated, (state, action) => 
  adapter.updateOne(action.update, state)
  )
);
export const {selectAll}  = adapter.getSelectors();
