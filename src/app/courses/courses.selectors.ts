import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourses from "./reducers/courses.reducers";

export const selectCoursesState = 
    createFeatureSelector<fromCourses.CoursesState>(fromCourses.courseFeatureKey)


export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
)

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(cours => cours.category === "BEGINNER")
)
export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(cours => cours.category === "ADVANCED")
)

export const selectTotalPromotion = createSelector(
    selectAllCourses,
    courses => courses.filter(cours => cours.promo).length
)
export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
  )
