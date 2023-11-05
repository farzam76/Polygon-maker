import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {PolygonMaker,PolygonEditor} from "../components";

interface Polygon {
  id: string;
  sides: number;
  vertices: { x: number; y: number }[]; // Array of vertex coordinates
}

// Function to calculate polygon vertices based on the number of sides and position
const calculatePolygonVertices = (sides: number, x: number, y: number) => {
    const vertices = [];
    const angleIncrement = (2 * Math.PI) / sides;
  
    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const vertexX = x + Math.cos(angle) * 50; // Adjust the radius as needed
      const vertexY = y + Math.sin(angle) * 50; // Adjust the radius as needed
      vertices.push({ x: vertexX, y: vertexY });
    }
  
    return vertices;
  };

export const ProjectScene = () => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [polygonIdCounter, setPolygonIdCounter] = useState(0);

  const handleCreatePolygon = (sides: number) => {
    const newPolygon: Polygon = {
        id: `polygon-${polygonIdCounter}`,
        sides,
        vertices: calculatePolygonVertices(sides, 100, 100), // Adjust position as needed
      };
      setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
      setPolygonIdCounter(polygonIdCounter + 1);
  };

  const handleMovePolygon = (result) => {
    if (!result.destination) return;
    const reorderedPolygons = Array.from(polygons);
    const [movedPolygon] = reorderedPolygons.splice(result.source.index, 1);
    reorderedPolygons.splice(result.destination.index, 0, movedPolygon);
    setPolygons(reorderedPolygons);
  };

  const handleDeletePolygon = (id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id)
    );
  };

  return (
    <div className="container">
     <div className="container" style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1 }}>
       
        <div style={{ height: "100%" }}>
            
          <DragDropContext onDragEnd={handleMovePolygon}>
          <PolygonMaker onCreatePolygon={handleCreatePolygon} />
            <PolygonEditor
              polygons={polygons}
              onDeletePolygon={handleDeletePolygon}
            />
          </DragDropContext>
        </div>
      </div>
    </div>
    </div>
  );
};
