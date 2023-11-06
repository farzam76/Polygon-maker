import { Button } from "components/Button";
import { useAppDispatch, useAppSelector } from "hooks";
import { addProject } from "modules/projects/store/ProjectsReducer";
import { Link } from "react-router-dom";
import { genUniqueId } from "utils";

export const ProjectsList = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  const handleCreateProject = () => {
    dispatch(
      addProject({
        name: "New Project",
        description: "New Project Description",
        id: genUniqueId(),
      })
    );
  };

  return (
    <>
      <Button onClick={handleCreateProject}>New Project</Button>
      <div>
        {projects.map((project) => (
          <Link to={`/${project.id}`}>
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={project.id}
            >
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
