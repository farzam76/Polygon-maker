import { useSpring, animated, config } from '@react-spring/web';
import "./styles.css"
interface FloatingCardProps {
    content: string;
    color: string;
    onDismiss: () => void;
  }
export const PolygonCard : React.FC<FloatingCardProps> = ({ content, color, onDismiss }) => {
    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'translateX(100%)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        leave: { opacity: 0, transform: 'translateX(100%)' },
        config: config.wobbly,
      });
    
      const cardStyles = {
        background: color,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      };
    
      return (
        <animated.div
          className="floating-card"
          style={{ ...cardStyles, ...cardAnimation }}
        >
          <div className="card-content">{content}</div>
          <button className="dismiss-button" onClick={onDismiss}>
            Dismiss
          </button>
        </animated.div>
      );
};
