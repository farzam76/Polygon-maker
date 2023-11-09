import React, { useEffect, useState } from "react";
import "./styles.css"
interface EditableCardProps {
  polygon: Polygon;
  onEditVertices: (id: string, vertices: Vertex[]) => void;
  onEditSides?: (sides: number) => void;
}

export const PolygonEditCard: React.FC<EditableCardProps> = ({
  polygon,
  onEditVertices,
  onEditSides,
}) => {
  useEffect(() => {
    console.log("PolygonEditCard: useEffect: polygon", polygon);
  }, [polygon]);

  const [editingVertices, setEditingVertices] = useState([...polygon.vertices]);
  const [editingSides, setEditingSides] = useState(polygon.sides);

  const handleVerticesChange = (index: number, field: keyof Vertex, newValue: number) => {
    const updatedVertices = [...editingVertices];
    updatedVertices[index] = { ...updatedVertices[index], [field]: newValue };
    setEditingVertices(updatedVertices);
  };

  const handleSidesChange = (newValue: number) => {
    setEditingSides(newValue);
  };

  const handleSave = () => {
    onEditVertices(polygon.id, [...editingVertices]);
    //onEditSides(editingSides);
  };

  return (
    <div className="card-container bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-semibold mb-2">Edit Polygon</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Sides:
        </label>
        <input
          type="number"
          value={editingSides}
          onChange={(e) => handleSidesChange(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Vertices:
        </label>
        {editingVertices.map((vertex, index) => (
          <div key={vertex.id} className="flex mb-2">
            <input
              type="number"
              value={vertex.x}
              onChange={(e) => handleVerticesChange(index, 'x', parseInt(e.target.value, 10))}
              className="border border-gray-300 rounded p-2 w-1/2 mr-2"
            />
            <input
              type="number"
              value={vertex.y}
              onChange={(e) => handleVerticesChange(index, 'y', parseInt(e.target.value, 10))}
              className="border border-gray-300 rounded p-2 w-1/2"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};
