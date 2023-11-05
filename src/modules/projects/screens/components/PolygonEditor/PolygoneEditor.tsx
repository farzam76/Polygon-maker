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
  console.log("%c Polygon editor", "color: red; font-weight: bold;");

  return (
    <div className="scene">
      {polygons.map((polygon) => (
        <Polygon
          editVertices={editVertices}
          key={polygon.id}
          {...polygon}
          onDelete={() => onDeletePolygon(polygon.id)}
        />
      ))}
    </div>
  );
};
