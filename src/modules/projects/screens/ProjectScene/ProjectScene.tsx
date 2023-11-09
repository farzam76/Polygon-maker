import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { updateProjectsPolygons } from "modules/projects/store/ProjectsReducer";
import { PolygonEditor } from "modules/projects/components";
import "./styles.css";

export const ProjectScene = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const projects = useAppSelector((state) => state.projects.projects);
  const project = useMemo(
    () => projects.find((project) => project.id === id),
    [id, projects],
  );
  const saveScene = useCallback(
    ({ projectId, polygons }: { polygons: Polygon[]; projectId: string }) => {
      dispatch(updateProjectsPolygons({ id: projectId, polygons }));
    },
    [dispatch],
  );

  return (
    <div className="scene-container ">
      <PolygonEditor
        project={project as unknown as Project}
        saveScene={saveScene}
      />
    </div>
  );
};
