import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddForm from "./components/AddForm";
import AddSkill from "./components/AddSkill";
import { WildersProvider } from "./contexts/WildersContext";
import WildersGrid from "./components/WildersGrid";
import { useState } from "react";

function App() {
  const [showForms, setShowForms] = useState<boolean>(false);

  return (
    <div>
      <Header />
      <WildersProvider>
        <main className="container">
          <button className="button" onClick={() => setShowForms(!showForms)}>
            Add a wilder or a skill
          </button>
          {showForms ? (
            <section>
              <AddForm />
              <AddSkill />
            </section>
          ) : null}
          <WildersGrid />
        </main>
      </WildersProvider>
      <Footer />
    </div>
  );
}

export default App;
