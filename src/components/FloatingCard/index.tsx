import { useSpring, animated, config } from "@react-spring/web";
import { Button } from "components/Button";
import "./styles.css";

interface FloatingCardProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
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
      {isOpen && (
        <animated.div
          className="floating-card"
          style={{ ...cardStyles, ...cardAnimation }}
        >
          <Button
            iconName="close"
            className="dismiss-button"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsOpen(false)}
            aria-label="Dismiss Polygon Card"
          />

          <div className="text-md color-#333">{children}</div>
        </animated.div>
      )}
    </>
  );
};
