import React, { MouseEventHandler, useCallback, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"; // The default
import "./styles.css";

interface DraggablePolygonProps {
  id: string;
  sides: number;
  onDelete: (id: string) => void;
  vertices: Vertex[];
  editVertices: (id: string, vertices: Vertex, index: number) => void;
}

interface DndEvent {
  e: DraggableEvent;
  data: DraggableData;
  id: string;
}
//TODO: make a seprate draggable polygon component
const PolygonComponent: React.FC<DraggablePolygonProps> = ({
  id,
  onDelete,
  vertices,
  editVertices,
}) => {
  console.log("%c Polygon", "color: red; font-weight: bold;");
  const [isEditing, setIsEditing] = useState(false);
  const onMove = ({ e, data, id: vertexId }: DndEvent) => {
    e.stopPropagation();
    const { x, y } = data;
    const index = vertices.findIndex((vertex) => vertex.id === vertexId);
    const updatedVertices = { ...vertices[index], x, y };
    editVertices(id, updatedVertices, index);
  };
  const onDrag = useCallback((payload: DndEvent) => {
    onMove(payload);
    setIsEditing(true);
  }, []);
  const onStop = useCallback((payload: DndEvent) => {
    onMove(payload);
    setIsEditing(false);
  }, []);
  const onStart = useCallback((payload: DndEvent) => {
    onMove(payload);
    setIsEditing(true);
  }, []);
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
          {vertices.map((vertex) => (
            <Draggable
              defaultClassName="anchor-point"
              key={vertex.id}
              onDrag={(e, data) => {
                onDrag({ e, data, id:vertex.id });
              }}
              onStart={(e, data) => {
                onStart({ e, data, id:vertex.id });
              }}
              onStop={(e, data) => {
                onStop({ e, data, id:vertex.id });
              }}
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

export const Polygon = React.memo(PolygonComponent);
