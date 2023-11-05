import React, { useState } from "react";
import Draggable from "react-draggable"; // The default
import "./styles.css";
interface DraggablePolygonProps {
  id: string;
  index: number;
  sides: number;
  onDelete: (id: string) => void;
  vertices: Vertex[]; // Array of vertex coordinates
  editVertices: (id: string, vertices: Vertex, index: number) => void;
}
//TODO: make a seprate draggable polygon component
export const Polygon: React.FC<DraggablePolygonProps> = ({
  id,
  index,
  onDelete,
  vertices,
  editVertices,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const onDrag = (e, data, vertexIndex) => {
    e.stopPropagation();
    console.log(data, e, vertexIndex);
    editVertices(
      id,
      { x: data.x, y: data.y, id: vertices[vertexIndex].id },
      vertexIndex,
    );
    setIsEditing(true);
  };
  const onStop = (e, data) => {
    e.stopPropagation();
    console.log(data, e);
    setIsEditing(false);
  };
  const onStart = (e, data) => {
    e.stopPropagation();
    console.log(data, e);
    setIsEditing(true);
  };

  return (
    <Draggable
      disabled={isEditing}
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
      onDrag={(e, data) => {
        console.log(data, e);
      }}
    >
      <div className="draggable-polygon">
        <svg>
          <polygon
            points={vertices
              .map((vertex) => `${vertex.x},${vertex.y}`)
              .join(" ")}
            fill="lightblue"
          />{" "}
          {vertices.map((vertex, index) => (
            <Draggable
              defaultClassName="anchor-point"
              key={index}
              onDrag={(e, data) => {
                onDrag(e, data, index);
              }}
              onStart={onStart}
              onStop={onStop}
            >
              <circle
                className="anchor"
                cx={vertex.x}
                cy={vertex.y}
                r="5"
                fill="blue"
              />
            </Draggable>
          ))}
        </svg>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </Draggable>
  );
};
