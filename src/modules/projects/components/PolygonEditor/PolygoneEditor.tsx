import React, { useCallback, useEffect, useRef, useState } from "react";
import { Polygon, PolygonMaker, PolygonEditCard, EditorActions } from "..";
import { genUniqueId } from "utils";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";

const MutatePolygonVertices = (
  newSides: number,
  oldVertices: Vertex[],
  x: number,
  y: number
) => {
  const oldSides = oldVertices.length;
  const angleIncrement = (2 * Math.PI) / newSides;
  const center = { x, y };

  const newVertices: Vertex[] = [...oldVertices];

  // If the new number of sides is greater than the old number, add new vertices
  if (newSides > oldSides) {
    //TODO: better possinoning of new vertices
    for (let i = oldSides; i < newSides; i++) {
      const angle = i * angleIncrement;
      const vertexX = center.x + Math.cos(angle) * 30;
      const vertexY = center.y + Math.sin(angle) * 30;
      newVertices.push({ x: vertexX, y: vertexY, id: genUniqueId() });
    }
  }
  // If the new number of sides is less than the old number, remove vertices
  else if (newSides < oldSides) {
    newVertices.splice(newSides);
  }

  return newVertices;
};

const calculatePolygonVertices = (sides: number, x: number, y: number) => {
  const vertices = [];
  const angleIncrement = (2 * Math.PI) / sides;

  for (let i = 0; i < sides; i++) {
    const angle = i * angleIncrement;
    const vertexX = x + Math.cos(angle) * 50;
    const vertexY = y + Math.sin(angle) * 50;
    vertices.push({ x: vertexX, y: vertexY, id: genUniqueId() });
  }

  return vertices;
};

interface PolygonEditorProps {
  saveScene: ({
    projectId,
    polygons,
  }: {
    projectId: string;
    polygons: Polygon[];
  }) => void;
  project: Project;
}

export const PolygonEditor: React.FC<PolygonEditorProps> = ({
  saveScene,
  project,
}) => {
  const params = useParams();
  const [polygons, setPolygons] = useState<Polygon[]>(project?.polygons || []);
  const [polygonIdCounter, setPolygonIdCounter] = useState(0);
  const [selectedPolygon, setSelectedPolygon] = useState<Polygon | null>(null);

  const sceneContainerRef = useRef<HTMLDivElement>(null);

  const debouncedAction = debounce((polygons: Polygon[]) => {
    //type gymnastics :)
    saveScene({ projectId: params.id || "Default", polygons });
  }, 300);

  useEffect(() => {
    debouncedAction(polygons);

    return () => debouncedAction.cancel();
  }, [polygons,debouncedAction]);

  const handleDeletePolygon = useCallback((id: string) => {
    setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => polygon.id !== id)
    );
    setSelectedPolygon(null);
  }, []);

  const editVertices = (id: string, updatedVertices: Vertex[]) => {
    setPolygons((prevPolygons) => {
      const oldPolygon = prevPolygons.find((polygon) => polygon.id === id);
      if (oldPolygon)
        setSelectedPolygon({ ...oldPolygon, vertices: updatedVertices });
      return prevPolygons.map((polygon) =>
        polygon.id === id ? { ...polygon, vertices: updatedVertices } : polygon
      );
    });
  };

  const handleCreatePolygon = (sides: number) => {
    const newPolygon: Polygon = {
      id: genUniqueId(),
      sides,
      vertices: calculatePolygonVertices(sides, 100, 100),
      position: { x: 0, y: 0 },
    };
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    setPolygonIdCounter(polygonIdCounter + 1);
  }

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

  const clickAwayHandler = useCallback(
    (e: ReactMouseEvent) => {
      if (e.target === sceneContainerRef.current) {
        setSelectedPolygon(null);
      }
    },
    [sceneContainerRef]
  );

  const handleStartEditing = useCallback(
    (id: string) => {
      setSelectedPolygon(polygons.find((p) => p.id === id) || null);
    },
    [polygons]
  );

  const onEditSides = (id: string, sides: number) => {
    const newVertices = MutatePolygonVertices(
      sides,
      selectedPolygon?.vertices || [],
      selectedPolygon?.position.x || 0,
      selectedPolygon?.position.y || 0
    );
    editVertices(id, newVertices);
  };

  return (
    <>
      <EditorActions>
        <PolygonMaker onCreatePolygon={handleCreatePolygon} />
      </EditorActions>
      {selectedPolygon ? (
        <PolygonEditCard
          polygon={selectedPolygon}
          onEditVertices={editVertices}
          onEditSides={onEditSides}
        />
      ) : null}

      <div
        ref={sceneContainerRef}
        className="scene border-black"
        onClick={clickAwayHandler}
      >
        {polygons.map((polygon) => (
          <Polygon
            isSelected={selectedPolygon?.id === polygon.id}
            handleOnClick={handleStartEditing}
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
