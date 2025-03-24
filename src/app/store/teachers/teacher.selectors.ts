import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeachersState, teachersFeatureKey } from './teacher.reducer';

export const selectTeachersState = createFeatureSelector<TeachersState>(teachersFeatureKey);

export const selectAllTeachers = createSelector(
  selectTeachersState,
  (state: TeachersState) => state.teachers
);
