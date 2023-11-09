import { useState } from "react";
import { Button } from "components/Button";
import { FloatingCard } from "components/FloatingCard";

import "./styles.css";

interface EditorActionsProps {
  children: React.ReactNode;
}

export const EditorActions: React.FC<EditorActionsProps> = ({ children }) => {
  const [showCard, setShowCard] = useState(true);

  return (
    <>
      <Button
        role="button"
        aria-label="Show Polygon Card"
        onClick={() => {
          setShowCard(true);
        }}
        onKeyDown={(e) => e.key === "Enter" && setShowCard(true)}
        className="p-1 ml-4 mt-2 text-white"
      >
        add polygon
      </Button>
      <FloatingCard isOpen={showCard} setIsOpen={setShowCard}>
        <div className="text-md color-#333">{children}</div>
      </FloatingCard>
    </>
  );
};
