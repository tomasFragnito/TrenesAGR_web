import './App.css';
import CardTrain from "./components/CardTrain";
import SelectedStation from "./components/SelectedStation";
import { useState } from "react";

function App() {
  const [estacionId, setEstacionId] = useState(null);

  return (
    <div>
      <SelectedStation onStationSelect={setEstacionId} />
      {estacionId && <CardTrain estacionId={estacionId} />}
    </div>
  );
}

export default App;
