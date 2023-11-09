import { Button } from "components/Button";

interface PolygonActionsProps {
  isSelected: boolean;
  onDelete: (id: string) => void;
  handleOnClick: (id: string) => void;
  id: string;
}

export const PolygonActions: React.FC<PolygonActionsProps> = ({
  isSelected,
  onDelete,
  handleOnClick,
  id,
}) => {
  return (
    <>
      {!isSelected && (
        <div className="actions" aria-label={`Polygon ${id} actions`}>
          <Button
           aria-label={`Delete Polygon ${id}`}
            iconName="delete"
            onClick={() => onDelete(id)}
          />
          <Button
            aria-label={`Edit Polygon ${id}`}
            iconName="edit"
            onClick={() => handleOnClick(id)}
          />
        </div>
      )}
    </>
  );
};
