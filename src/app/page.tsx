import Nav from './components/Nav';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Docs from './components/Docs';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Docs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
