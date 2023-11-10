import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type ProjectsInitialState = {
  projects: Project[];
};
const initialState: ProjectsInitialState = {
  projects: [],
};

export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    updateProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    updateProjectsPolygons(state, action) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          return { ...project, polygons: action.payload.polygons };
        }
        return project;
      });
    },
  },
});

export const { updateProjectsPolygons, updateProjects, addProject } =
  ProjectSlice.actions;
export default ProjectSlice.reducer;
