
import Footer from "../components/HomePage/Footer";
import Hero from "../components/HomePage/Hero";
import Nav from "../components/HomePage/Nav";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="section-margin ">
        <Nav />
      </section>
      <section className="section-margin  ">
        <Hero />
      </section>
      <section className="section-margin ">
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
