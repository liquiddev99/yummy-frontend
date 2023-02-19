export default function Cuisine({ cuisine }: { cuisine: string }) {
  const colors = ["green", "blue", "red", "purple"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <span className={`${color} py-1 px-3 rounded-2xl mr-1`}>{cuisine}</span>
  );
}
