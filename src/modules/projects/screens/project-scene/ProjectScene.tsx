import { PolygonEditor } from "../components";
import { useAppDispatch, useAppSelector } from "hooks";
import "./styles.css"
export const ProjectScene = () => {
  const polygons = useAppSelector((state) => state.projects.polygons);
  const dispatch = useAppDispatch();

  return (
    <div className="scene-container">
     <PolygonEditor />
    </div>
  );
};
