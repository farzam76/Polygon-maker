import React, { useCallback, useState } from "react";
import { Polygon, PolygonCard, PolygonMaker } from "..";
import { genUniqueId } from "utils";


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
export const PolygonEditor: React.FC = () => {
  console.log("%c Polygon editor", "color: red; font-weight: bold;");
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [polygonIdCounter, setPolygonIdCounter] = useState(0);


  const handleDeletePolygon = useCallback((id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id)
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
        })
      );
    },
    []
  );

  const handleCreatePolygon = useCallback((sides: number) => {
    const newPolygon: Polygon = {
      id: `polygon-${polygonIdCounter}`,
      sides,
      vertices: calculatePolygonVertices(sides, 100, 100), // Adjust position as needed
    };
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setPolygonIdCounter(polygonIdCounter + 1);
  },[]);
  return (
    <>
      <PolygonCard>
        <PolygonMaker onCreatePolygon={handleCreatePolygon} />
      </PolygonCard>
      <div className="scene p-10 border-black">
        {polygons.map((polygon) => (
          <Polygon
            editVertices={editVertices}
            key={polygon.id}
            {...polygon}
            onDelete={() => handleDeletePolygon(polygon.id)}
          />
        ))}
      </div>
    </>
  );
};
