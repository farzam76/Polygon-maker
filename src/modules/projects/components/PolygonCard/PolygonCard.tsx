import { useSpring, animated, config } from "@react-spring/web";
import "./styles.css";
import { useState } from "react";
import { Button } from "components/Button";
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
      <button
        onClick={() => {
          setShowCard(true);
        }}
      >
        add polygon
      </button>
      {showCard && (
        <animated.div
          className="floating-card"
          style={{ ...cardStyles, ...cardAnimation }}
        >
          <Button
            iconName="close"
            className="dismiss-button"
            onClick={() => setShowCard(false)}
          />

          <div className="card-content">{children}</div>
        </animated.div>
      )}
    </>
  );
};
