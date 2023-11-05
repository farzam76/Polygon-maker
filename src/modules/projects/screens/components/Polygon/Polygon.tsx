import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface DraggablePolygonProps {
  id: string;
  index: number;
  sides: number;
  onDelete: (id: string) => void;
  vertices: { x: number; y: number }[]; // Array of vertex coordinates
}

export const Polygon: React.FC<DraggablePolygonProps> = ({
  id,
  index,
  onDelete,
  vertices,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="draggable-polygon"
        >
          <svg>
            <polygon
              points={vertices
                .map((vertex) => `${vertex.x},${vertex.y}`)
                .join(" ")}
              fill="lightblue"
            />{" "}
          </svg>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </Draggable>
  );
};
