import { useState, useEffect, useCallback } from "react";

interface useDragAndDropProps {
  sceneContainerRef: React.RefObject<HTMLDivElement>;
  vertices: Vertex[];
  editPosition: (position: { x: number; y: number }) => void;
  editVertices: (vertices: Vertex[]) => void;
  position: Position;
}
const useDragAndDrop = ({
  sceneContainerRef,
  vertices,
  editPosition,
  editVertices,
  position,
}: useDragAndDropProps) => {
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
  }, [vertices]);

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (isDragging || draggingVertex) {
      if (isDragging) {
        const deltaX = e.movementX;
        const deltaY = e.movementY;

        const newX = position.x + deltaX;
        const newY = position.y + deltaY;

        editPosition({ x: newX, y: newY });
      } else if (draggingVertex) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;
        const newVertexX = initialVertexX + deltaX;
        const newVertexY = initialVertexY + deltaY;

        const clampedX = Math.min(
          Math.max(newVertexX, boundaries.minX),
          boundaries.maxX,
        );
        const clampedY = Math.min(
          Math.max(newVertexY, boundaries.minY),
          boundaries.maxY,
        );

        const newVertices = vertices.map((vertex) => {
          return vertex.id === draggingVertex.id
            ? { ...vertex, x: clampedX, y: clampedY }
            : vertex;
        });

        editVertices(newVertices);
        updateSvgBoundary();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingVertex(null);
  };

  const handleClick = (e: ReactMouseEvent) => {
    if (e.target && e.target instanceof Element) {
      const target = e.target;

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

  return { handleClick, svgBoundaries, handleMouseMove, handleMouseUp };
};

export default useDragAndDrop;
