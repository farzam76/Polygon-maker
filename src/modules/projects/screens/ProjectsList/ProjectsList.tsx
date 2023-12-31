import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { useAppDispatch, useAppSelector } from "hooks";
import { addProject } from "modules/projects/store/ProjectsReducer";
import { updateGlobalUser } from "modules/global/GlobalReducer";
import { updateUserData } from "modules/authentication/screens/store/AuthenticationReducer";
import { genUniqueId } from "utils";
import { appRoutes } from "routes";

export const ProjectsList = () => {
  const allProjects = useAppSelector((state) => state.projects.projects);
  const userData = useAppSelector((state) => state.authentication.userData);

  const dispatch = useAppDispatch();

  const handleCreateProject = useCallback(() => {
    const projectId = genUniqueId();
    const updatedUserData = {
      ...userData,
      projectIds: [...userData.projectIds, projectId],
    };
    dispatch(updateGlobalUser(updatedUserData));
    dispatch(updateUserData(updatedUserData));
    //TODO: add a modal for this
    dispatch(
      addProject({
        name: "Project",
        description: "Project Description",
        id: projectId,
        timeStamp: Date.now(),
        polygons: [],
      }),
    );
  }, [userData, dispatch]);
  if (!allProjects || !userData) {
    return <div>Loading or empty state handling...</div>;
  }
  const userProjects = allProjects.filter((project) =>
    userData.projectIds.includes(project.id),
  );

  return (
    <div className="projects-list p-2">
      <Button className="p-1 ml-4 text-white" onClick={handleCreateProject}>
        New Project
      </Button>
      <div className="projects-container p-4 flex flex-row items-center gap-10">
        {userProjects.length > 0 &&
          userProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`${appRoutes.PROJECT_ROUTE}/${project.id}`}
            >
              <div className="max-w-sm rounded overflow-hidden bg-white relative">
                <div className="shadow-lg border border-transparent group">
                  <div className="px-6 py-4">
                    <h2 className="text-xl font-bold mb-2">
                      {project.name}#{index}
                    </h2>
                    <p className="text-gray-700 text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full transition-opacity opacity-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:border-blue-500"></div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
