import React, { useState } from "react";
import "./styles.css";
interface EditableCardProps {
  polygon: Polygon;
  onEditVertices: (id: string, vertices: Vertex[]) => void;
  onEditSides: (id: string, sides: number) => void;
}

export const PolygonEditCard: React.FC<EditableCardProps> = ({
  polygon,
  onEditVertices,
  onEditSides,
}) => {
  const [editingSides, setEditingSides] = useState(polygon.sides);

  const handleSave = (vertecies: Vertex[], id: string) => {
    onEditVertices(id, vertecies);
  };
  const handleVerticesChange = (
    index: number,
    field: keyof Vertex,
    newValue: number,
  ) => {
    if (newValue) {
      const updatedVertices = [...polygon.vertices];
      updatedVertices[index] = { ...updatedVertices[index], [field]: newValue };
      handleSave(updatedVertices, polygon.id);
    }
  };

  const handleSidesChange = (newValue: number) => {
    if (newValue) {
      setEditingSides(newValue);
      onEditSides(polygon.id, newValue);
    }
  };

  return (
    <div className="card-container bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-semibold mb-2">Edit Polygon</h2>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-600"
          htmlFor="sides-input"
        >
          Sides:
        </label>
        <input
          type="number"
          min={3}
          max={12}
          value={editingSides}
          id="sides-input"
          onChange={(e) => handleSidesChange(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Vertices:
        </label>
        {polygon.vertices.map((vertex, index) => (
          <div key={vertex.id} className="flex mb-2">
            <input
              type="number"
              id={`x-input-${index}`}
              value={vertex.x.toFixed(0)}
              onChange={(e) =>
                handleVerticesChange(index, "x", parseInt(e.target.value, 10))
              }
              className="border border-gray-300 rounded p-2 w-1/2 mr-2"
            />
            <input
              type="number"
              id={`y-input-${index}`}
              value={vertex.y.toFixed(0)}
              onChange={(e) =>
                handleVerticesChange(index, "y", parseInt(e.target.value, 10))
              }
              className="border border-gray-300 rounded p-2 w-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
