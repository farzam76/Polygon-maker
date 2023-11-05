
export const DropContainer: React.FC = () => {
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('polygon'));
    // Handle the drop action, which can include updating the position of the dropped polygon
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="drop-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Render your draggable polygons here */}
    </div>
  );
};


