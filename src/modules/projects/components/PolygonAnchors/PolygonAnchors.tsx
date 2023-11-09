interface PolygonAnchorsProps {
  isSelected: boolean;
  vertices: Vertex[];
}
export const PolygonAnchors: React.FC<PolygonAnchorsProps> = ({
  isSelected,
  vertices,
}) => {
  return (
    <>
      {isSelected && (
        <g role="presentation" aria-label="Polygon Anchors">
          {vertices.map((vertex) => (
            <circle
              role="button"
              className="anchor"
              key={vertex.id}
              cx={vertex.x}
              cy={vertex.y}
              r="5"
              fill="blue"
              data-id={vertex.id}
              aria-label={`Vertex ${vertex.id}`}
            />
          ))}
        </g>
      )}
    </>
  );
};
