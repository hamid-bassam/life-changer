import { Register } from "../../_components/Register";
import { Welcome } from "../../_components/Welcome";

export default function Home() {
  return (
    <Welcome >
      <Register />
    </Welcome>
  );
}