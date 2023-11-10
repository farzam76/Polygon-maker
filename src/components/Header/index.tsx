export const  Header =({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={`${className} w-full flex-shrink-0 bg-white border-b  border-gray-200`}
    >
      {children}
    </header>
  );
}
