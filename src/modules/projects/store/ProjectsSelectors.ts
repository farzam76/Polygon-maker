import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Define the original selector
const selectUserProjects = createSelector(
  (state) => state.allProjects,
  (state) => state.userData,
  (projects, userData) =>
    projects.filter((project) => userData.projectIds.includes(project.id))
);

// Define your custom hook
export function useUserProjects() {
  // Use the useSelector hook to select the user projects
  return useSelector(selectUserProjects);
}