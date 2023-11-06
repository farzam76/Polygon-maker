import React, { useState } from "react";

interface PolygonMakerProps {
  onCreatePolygon: (sides: number) => void;
}

const polygonList = [
  { name: "Triangle", sides: 3 },
  { name: "Square", sides: 4 },
  { name: "Pentagon", sides: 5 },
  { name: "Hexagon", sides: 6 },
  { name: "Heptagon", sides: 7 },
  { name: "Octagon", sides: 8 },
  { name: "Nonagon", sides: 9 },
  { name: "Decagon", sides: 10 },
  { name: "Hendecagon", sides: 11 },
  { name: "Dodecagon", sides: 12 },
];

export const PolygonMaker: React.FC<PolygonMakerProps> = ({
  onCreatePolygon,
}) => {
  const [selectedPolygon, setSelectedPolygon] = useState(polygonList[0]);

  const handleCreatePolygon = () => {
    onCreatePolygon(selectedPolygon.sides);
  };

  const handlePolygonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const polygon = polygonList.find((p) => p.name === event.target.value);
    if (polygon) {
      setSelectedPolygon(polygon);
    }
  };

  return (
    <div className="polygon-maker">
      <h2>Polygons</h2>
      <label htmlFor="polygon-select">Select a polygon:</label>
      <select id="polygon-select" value={selectedPolygon.name} onChange={handlePolygonChange}>
        {polygonList.map((polygon) => (
          <option key={polygon.name} value={polygon.name}>
            {polygon.name} ({polygon.sides} sides)
          </option>
        ))}
      </select>
      <button className="text-gray-600 hover:text-red-500 focus:outline-none" onClick={handleCreatePolygon}>Create Polygon</button>
    </div>
  );
};
