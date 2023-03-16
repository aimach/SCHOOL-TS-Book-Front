import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddForm from "./components/AddForm";
import AddSkill from "./components/AddSkill";
import { WildersProvider } from "./contexts/WildersContext";
import WildersGrid from "./components/WildersGrid";

function App() {
  return (
    <div>
      <Header />
      <WildersProvider>
        <main className="container">
          <section className="card-row">
            <AddForm />
            <AddSkill />
          </section>
          <WildersGrid />
        </main>
      </WildersProvider>
      <Footer />
    </div>
  );
}

export default App;
