import React from "react";
import { Polygon } from "..";

interface PolygonEditorProps {
  polygons: Polygon[];
  onDeletePolygon: (id: string) => void;
  editVertices: (id: string, vertices: Vertex, index: number) => void;
}

export const PolygonEditor: React.FC<PolygonEditorProps> = ({
  polygons,
  onDeletePolygon,
  editVertices,
}) => {
  return (
    <div className="scene">
      {polygons.map((polygon, index) => (
        <Polygon
          editVertices={editVertices}
          key={polygon.id}
          index={index}
          {...polygon}
          onDelete={() => onDeletePolygon(polygon.id)}
        />
      ))}
    </div>
  );
};
