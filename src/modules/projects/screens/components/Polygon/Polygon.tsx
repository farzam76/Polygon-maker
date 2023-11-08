import React, { useState, MouseEvent, useEffect, useCallback } from "react";
import "./styles.css";
import { Button } from "components/Button";

interface Vertex {
  id: string;
  x: number;
  y: number;
}

interface PolygonProps {
  id: string;
  onDelete: (id: string) => void;
  vertices: Vertex[];
  editVertices: (id: string, vertices: Vertex[], vertexId: string) => void;
  editPosition: (id: string, position: { x: number; y: number }) => void;
  position: { x: number; y: number };
  sceneContainerRef: React.RefObject<HTMLDivElement>;
  handleOnClick: (id: string) => void;
  isSelected: boolean;

}

export const Polygon: React.FC<PolygonProps> = ({
  id,
  onDelete,
  vertices,
  editVertices,
  editPosition,
  position,
  sceneContainerRef,
  handleOnClick,
  isSelected,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingVertex, setDraggingVertex] = useState<Vertex | null>(null);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialVertexX, setInitialVertexX] = useState(0);
  const [initialVertexY, setInitialVertexY] = useState(0);

  const [boundaries, setSceneBoundaries] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });
  const [svgBoundaries, setSvgBoundaries] = useState({
    minX: 0,
    minY: 0,
    maxX: 150,
    maxY: 150,
  });

  useEffect(() => {
    const container = sceneContainerRef?.current;
    if (container) {
      const { width, height } = container.getBoundingClientRect();

      const minX = 0;
      const minY = 0;
      const maxX = width;
      const maxY = height;

      setSceneBoundaries({ minX, minY, maxX, maxY });
    }
  }, [sceneContainerRef?.current]);
  const updateSvgBoundary = useCallback(() => {
    const minX = Math.min(...vertices.map((v) => v.x));
    const minY = Math.min(...vertices.map((v) => v.y));
    const maxX = Math.max(...vertices.map((v) => v.x));
    const maxY = Math.max(...vertices.map((v) => v.y));
    setSvgBoundaries({
      minX,
      minY,
      maxX,
      maxY,
    });
  }, []);
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging || draggingVertex) {
      if (isDragging) {
        const deltaX = e.movementX;
        const deltaY = e.movementY;

        const newX = position.x + deltaX;
        const newY = position.y + deltaY;

        editPosition(id, { x: newX, y: newY });
      } else if (draggingVertex) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;
        const newVertexX = initialVertexX + deltaX;
        const newVertexY = initialVertexY + deltaY;

        const clampedX = Math.min(
          Math.max(newVertexX, boundaries.minX),
          boundaries.maxX
        );
        const clampedY = Math.min(
          Math.max(newVertexY, boundaries.minY),
          boundaries.maxY
        );

        const newVertices = vertices.map((vertex) => {
          return vertex.id === draggingVertex.id
            ? { ...vertex, x: clampedX, y: clampedY }
            : vertex;
        });

        editVertices(id, newVertices, draggingVertex.id);
        updateSvgBoundary();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingVertex(null);
  };

  const handleClick = (e: MouseEvent) => {
    if (e.target && e.target instanceof Element) {
      const target = e.target as Element;

      if (target.tagName === "circle") {
        const vertexId = target.getAttribute("data-id");
        const vertex = vertices.find((v) => v.id === vertexId);
        if (vertex) {
          setDraggingVertex(vertex);

          setInitialMouseX(e.clientX);
          setInitialMouseY(e.clientY);
          setInitialVertexX(vertex.x);
          setInitialVertexY(vertex.y);
        }
      } else {
        
        setIsDragging(true);
        setInitialMouseX(e.clientX);
        setInitialMouseY(e.clientY);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
    <div
      className="draggable-polygon"
      onMouseDown={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        left: position.x + "px",
        top: position.y + "px",
        width: svgBoundaries.maxX + "px",
        height: svgBoundaries.maxY + "px",
        position: "absolute",
      }}
    >
      <svg
        viewBox="30 30 150 150"
        id={`svg-${id}`}
        width={svgBoundaries.maxX}
        height={svgBoundaries.maxY}
      >
        <g>
          <polygon
            points={vertices
              .map((vertex) => `${vertex.x},${vertex.y}`)
              .join(" ")}
            fill="lightblue"
          />
          {isSelected && (<g>
          {vertices.map((vertex) => (
            <circle
              className="anchor"
              key={vertex.id}
              cx={vertex.x}
              cy={vertex.y}
              r="5"
              fill="blue"
              data-id={vertex.id}
            />
          ))}
          </g>)}
        </g>
      </svg>
      {!isSelected && (<div className="actions" aria-label="polygon-actions">
      <Button aria-label="delete-polygon-icon" iconName="delete" onClick={() => onDelete(id)}/>
      <Button aria-label="edit-polygon-icon" iconName="edit" onClick={() => handleOnClick(id)}/>
      </div>)}
    </div>
    </>
  );
};
