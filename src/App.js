import ChartComponent from "./ChartComponent";

export default function App() {
  const data = [
    { value: 40 },
    { value: 60 }
  ];

  return (
    <div className="App">
      <ChartComponent data={data} />
    </div>
  );
}


