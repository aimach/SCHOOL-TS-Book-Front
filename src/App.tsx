import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wilder, { IWilderProps } from "./components/Wilder";
import AddForm from "./components/AddForm";
import AddSkill from "./components/AddSkill";

function App() {
  const [wilders, sestWilders] = useState<IWilderProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const wilders = await axios.get("http://localhost:5000/api/wilder");
      sestWilders(wilders.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main className="container">
        <section className="card-row">
          <AddForm />
          <AddSkill />
        </section>
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.map((wilder, index) => (
            <Wilder
              key={index}
              name={wilder.name}
              email={wilder.email}
              description={wilder.description}
              skills={wilder.skills}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
