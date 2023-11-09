import React, { useCallback } from "react";
import { PolygonAnchors, PolygonActions } from "../index";
import useDragAndDrop from "modules/projects/hooks/useDragAndDrop";
import "./styles.css";

//TODO: overlaping polygons and what do with them?
interface Vertex {
  id: string;
  x: number;
  y: number;
}

interface PolygonProps {
  id: string;
  onDelete: (id: string) => void;
  vertices: Vertex[];
  editVertices: (id: string, vertices: Vertex[]) => void;
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
  const handleEditPosition = useCallback((newPosition: Position) => {
    editPosition(id, newPosition);
  }, []);
  const handleEditVertices = useCallback((newVertecies: Vertex[]) => {
    editVertices(id, newVertecies);
  }, []);
  const { handleClick, handleMouseMove, handleMouseUp, svgBoundaries } =
    useDragAndDrop({
      sceneContainerRef,
      vertices,
      editPosition: handleEditPosition,
      editVertices: handleEditVertices,
      position,
    });
    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Handle keyboard events
      if (e.key === "Enter" || e.key === " ") {
        handleClick(e as unknown as ReactMouseEvent);
      }
    };
  return (
    <>
      <div
        className={`draggable-polygon ${isSelected ? "focus:border-blue-500 border-2" : ""}`}
        onMouseDown={handleClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        style={{
          top: position.y,
          left: position.x,
          width: svgBoundaries.maxX + "px",
          height: svgBoundaries.maxY + "px",
          position: "absolute",
        }}
        role="button" 
        aria-label={`Polygon ${id}`}
        tabIndex={0} 
      >
        <svg
          viewBox={`30 30 ${svgBoundaries.maxX} ${svgBoundaries.maxY}`}
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
            <PolygonAnchors isSelected={isSelected} vertices={vertices} />
          </g>
        </svg>
        <PolygonActions
          id={id}
          isSelected={isSelected}
          onDelete={onDelete}
          handleOnClick={handleOnClick}
        />
      </div>
    </>
  );
};
