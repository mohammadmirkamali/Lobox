"use client";

import { useState } from "react";
import Select from "./components/select";

export default function Home() {
  const [options, setOptions] = useState([
    "Education",
    "Art",
    "Sport",
    "Games",
    "Health",
    "Science",
    "Others",
  ]);
  return (
    <div className="home">
      <Select {...{ options, setOptions }} />
    </div>
  );
}
