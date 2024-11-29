import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

function AnimatedCard({ children }: { children: React.ReactNode }) {
    const scale = useSharedValue(1);
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withSpring(scale.value) }],
      };
    });
  
    return (
      <Animated.View
        onTouchStart={() => (scale.value = 1.15)}
        onTouchEnd={() => (scale.value = 1)}
        style={animatedStyle}
      >
        {children}
      </Animated.View>
    );
  }

export default AnimatedCard;