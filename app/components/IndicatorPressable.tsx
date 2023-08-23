import { Pressable, ActivityIndicator } from 'react-native';

export default function IndicatorPressable({ children, isLoading, className, ...props }) {
  return (
    <Pressable {...props} className={`p-2 rounded-md relative z-[-10] mt-4 animate-pulse flex flex-row justify-center ${ !isLoading ? "bg-red-600" : "bg-red-400"} ${className}`} disabled={isLoading}>
      { isLoading ? (
        <ActivityIndicator className="mr-4" />
      ) : null }
      { children }
    </Pressable>
  );
}
