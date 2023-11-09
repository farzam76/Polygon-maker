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
        <div className="actions" aria-label="polygon-actions">
          <Button
            aria-label="delete-polygon-icon"
            iconName="delete"
            onClick={() => onDelete(id)}
          />
          <Button
            aria-label="edit-polygon-icon"
            iconName="edit"
            onClick={() => handleOnClick(id)}
          />
        </div>
      )}
    </>
  );
};
