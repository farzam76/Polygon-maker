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
        <g>
          {vertices.map((vertex) => (
            <circle
              className="anchor"
              key={vertex.id}
              cx={vertex.x}
              cy={vertex.y}
              r="5"
              fill="blue"
              data-id={vertex.id}
            />
          ))}
        </g>
      )}
    </>
  );
};
