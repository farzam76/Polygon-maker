import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Polygon } from "..";

interface Polygon {
  id: string;
  sides: number;
  vertices: { x: number; y: number }[]; // Array of vertex coordinates
}

interface PolygonEditorProps {
  polygons: Polygon[];
  onDeletePolygon: (id: string) => void;
}

export const PolygonEditor: React.FC<PolygonEditorProps> = ({
  polygons,
  onDeletePolygon,
}) => {
  return (
    <Droppable droppableId="polygon-editor-droppable" >
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="scene"
          {...provided.droppableProps}
        >
          {polygons.map((polygon, index) => (
            <Polygon
              key={polygon.id}
              index={index}
              {...polygon}
              onDelete={() => onDeletePolygon(polygon.id)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
