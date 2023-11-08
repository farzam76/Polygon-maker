import React, { useCallback, useEffect, useRef, useState } from "react";
import { Polygon, PolygonCard, PolygonMaker } from "..";
import { genUniqueId } from "utils";
import { PolygonEditCard } from "../PolygonEditCard";

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

interface PolygonEditorProps {}

export const PolygonEditor: React.FC<PolygonEditorProps> = () => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [polygonIdCounter, setPolygonIdCounter] = useState(0);
  const [selectedPolygon, setSelectedPolygon] = useState<Polygon | null>(null);

  const sceneContainerRef = useRef<HTMLDivElement>(null);

  const handleDeletePolygon = useCallback((id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id)
    );
  }, []);

  const editVertices = useCallback((id: string, updatedVertices: Vertex[]) => {
    setPolygons((prevPolygons) =>
      prevPolygons.map((polygon) =>
        polygon.id === id
          ? { ...polygon, vertices: updatedVertices }
          : polygon
      )
    );
  }, []);


  const handleCreatePolygon = useCallback((sides: number) => {
    const newPolygon: Polygon = {
      id: genUniqueId(),
      sides,
      vertices: calculatePolygonVertices(sides, 100, 100), // Adjust position as needed
      position: { x: 0, y: 0 }, // Adjust position as needed
    };
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setPolygonIdCounter(polygonIdCounter + 1);
  }, []);

  const handleEditPosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setPolygons((prevPolygons) =>
        prevPolygons.map((polygon) => {
          if (polygon.id === id) {
            return { ...polygon, position };
          }
          return polygon;
        })
      );
    },
    []
  );

  return (
    <>
      <PolygonCard>
        <PolygonMaker onCreatePolygon={handleCreatePolygon} />
      </PolygonCard>
      {selectedPolygon && (<PolygonEditCard polygon={selectedPolygon} onEditVertices={editVertices}/>)}

      <div ref={sceneContainerRef} className="scene border-black">
        {polygons.map((polygon) => (
          <Polygon
            isSelected={selectedPolygon?.id === polygon.id}
            handleOnClick={(id) => setSelectedPolygon(polygons.find((p) => p.id === id) || null)}
            editPosition={handleEditPosition}
            editVertices={editVertices}
            sceneContainerRef={sceneContainerRef}
            key={polygon.id}
            {...polygon}
            onDelete={() => handleDeletePolygon(polygon.id)}
          />
        ))}
      </div>
    </>
  );
};


