import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";

interface PolygonMakerProps {
  onCreatePolygon: (sides: number) => void;
}

export const PolygonMaker: React.FC<PolygonMakerProps> = ({
  onCreatePolygon,
}) => {
  const [sides, setSides] = useState(3);

  const handleCreatePolygon = () => {
    onCreatePolygon(sides);
    setSides(3); // Reset the number of sides
  };

  return (
    <div className="polygon-maker">
      <h2>Polygon Maker</h2>
      <label>
        Number of Sides:
        <input
          type="number"
          min="3"
          value={sides}
          onChange={(e) => setSides(Number(e.target.value))}
        />
      </label>
      <button onClick={handleCreatePolygon}>Create Polygon</button>
    </div>
  );
};
