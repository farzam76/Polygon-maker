import { useSpring, animated, config } from "@react-spring/web";
import { useState } from "react";
import { Button } from "components/Button";
import "./styles.css";


interface FloatingCardProps {
  children: React.ReactNode;
}

export const PolygonCard: React.FC<FloatingCardProps> = ({ children }) => {
  const [showCard, setShowCard] = useState(true);

  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: config.wobbly,
  });

  const cardStyles = {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  return (
    <>
      <Button
      role="button"
      aria-label="Show Polygon Card"
        onClick={() => {
          setShowCard(true);
        }}
        onKeyDown={(e) => e.key === "Enter" && setShowCard(true)}
        className="p-1 ml-4 mt-1 text-white"
      >
        add polygon
      </Button>
      {showCard && (
        <animated.div
          className="floating-card"
          style={{ ...cardStyles, ...cardAnimation }}
        >
          <Button
            iconName="close"
            className="dismiss-button"
            onClick={() => setShowCard(false)}
            onKeyDown={(e) => e.key === "Enter" && setShowCard(false)}
            aria-label="Dismiss Polygon Card"
          />

          <div className="text-md color-#333">{children}</div>
        </animated.div>
      )}
    </>
  );
};
