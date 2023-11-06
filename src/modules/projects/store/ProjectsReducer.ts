import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type ProjectsInitialState = {
  polygons: Polygon[];
  projects: Project[];
};
const initialState: ProjectsInitialState = {
    polygons: [],
    projects: []
};

export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    updatePolygons(state, action) {
     state.polygons = action.payload;
    },
    updateProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    }
  },
});

export const { updatePolygons, updateProjects, addProject } = ProjectSlice.actions;
export default ProjectSlice.reducer;
