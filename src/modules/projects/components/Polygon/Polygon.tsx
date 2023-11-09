import React, { useState, MouseEvent, useEffect, useCallback } from "react";
import "./styles.css";
import { PolygonAnchors } from "../PolygonAnchors";
import { PolygonActions } from "../PolygonActions";
import useDragAndDrop from "modules/projects/hooks/useDragAndDrop";

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
