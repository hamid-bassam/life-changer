"use client"
import { useState } from "react";
import { ColorPicker } from "../../../_components/ColorPicker";

export default function TestComponentPage() {
  const [color, setColor] = useState("");
  return (
    <>
      <p>{color}</p>
      <ColorPicker onChange={(e) => setColor(e)} />
    </>
  );
}