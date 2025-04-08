export function CarsListSuspense() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4">
      {new Array(4).fill(0).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex h-96 w-full items-center justify-center rounded-lg bg-gray-200"
        ></div>
      ))}
    </div>
  );
}
