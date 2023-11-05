import React, { useState } from "react";
import { PolygonMaker, PolygonEditor } from "../components";
import { genUniqueId } from "utils";

// Function to calculate polygon vertices based on the number of sides and position
const calculatePolygonVertices = (sides: number, x: number, y: number) => {
  const vertices = [];
  const angleIncrement = (2 * Math.PI) / sides;

  for (let i = 0; i < sides; i++) {
    const angle = i * angleIncrement;
    const vertexX = x + Math.cos(angle) * 50; // Adjust the radius as needed
    const vertexY = y + Math.sin(angle) * 50; // Adjust the radius as needed
    vertices.push({ x: vertexX, y: vertexY, id: genUniqueId() });
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
    console.log(result);
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.index === destination.index) return;

    setPolygons((prevPolygons) => {
      const polygonIndex = prevPolygons.findIndex(
        (polygon) => polygon.id === result.draggableId,
      );
      const updatedPolygon = {
        ...prevPolygons[polygonIndex],
        position: destination.index,
      };
      const updatedPolygons = [...prevPolygons];
      updatedPolygons.splice(polygonIndex, 1, updatedPolygon);
      return updatedPolygons;
    });
  };

  const handleDeletePolygon = (id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id),
    );
  };

  return (
    <div className="container">
      <div className="container" style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: "100%" }}>
            <PolygonMaker onCreatePolygon={handleCreatePolygon} />
            <PolygonEditor
              editVertices={(id, vertices, index) => {
                setPolygons((prevPolygons) => {
                  const polygonIndex = prevPolygons.findIndex(
                    (polygon) => polygon.id === id,
                  );
                  const updatedPolygon = {
                    ...prevPolygons[polygonIndex],
                    vertices: prevPolygons[polygonIndex].vertices.map(
                      (vertex, vertexIndex) => {
                        if (vertexIndex === index) {
                          return vertices;
                        }
                        return vertex;
                      },
                    ),
                  };
                  const updatedPolygons = [...prevPolygons];
                  updatedPolygons.splice(polygonIndex, 1, updatedPolygon);
                  return updatedPolygons;
                });
              }}
              polygons={polygons}
              onDeletePolygon={handleDeletePolygon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
