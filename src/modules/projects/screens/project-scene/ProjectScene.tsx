import React, { useCallback, useState } from "react";
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
  console.log("%c Polygon scene", "color: red; font-weight: bold;");

  const handleCreatePolygon = (sides: number) => {
    const newPolygon: Polygon = {
      id: `polygon-${polygonIdCounter}`,
      sides,
      vertices: calculatePolygonVertices(sides, 100, 100), // Adjust position as needed
    };
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setPolygonIdCounter(polygonIdCounter + 1);
  };

  const handleDeletePolygon = useCallback((id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id),
    );
  }, []);

  const editVertices = useCallback(
    (id: string, vertices: Vertex, vertexid: number) => {
        setPolygons((prevPolygons) =>
            prevPolygons.map((polygon) => {
            if (polygon.id === id) {
                const updatedVertices = [...polygon.vertices];
                updatedVertices[vertexid] = vertices;
                return { ...polygon, vertices: updatedVertices };
            }
            return polygon;
            }),
        );
        
    },
    [],
  );

  return (
    <div className="container">
      <div className="container" style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: "100%" }}>
            <PolygonMaker onCreatePolygon={handleCreatePolygon} />
            <PolygonEditor
              editVertices={editVertices}
              polygons={polygons}
              onDeletePolygon={handleDeletePolygon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
