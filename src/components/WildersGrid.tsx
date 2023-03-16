import Wilder from "./Wilder";
import { useWilders } from "../contexts/WildersContext";

export default function WildersGrid() {
  const { wilders } = useWilders();
  console.log("in app", wilders);
  return (
    <>
      <h2>Wilders</h2>
      <section className="card-row">
        {wilders.map((wilder) => (
          <Wilder key={wilder.id} {...wilder} />
        ))}
      </section>
    </>
  );
}
