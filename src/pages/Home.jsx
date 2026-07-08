import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Facetas from '../components/Facetas'
import MarcasProyectos from '../components/MarcasProyectos'
import Galeria from '../components/Galeria'
import VideoCTA from '../components/VideoCTA'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-bone">
        <Hero />
        <About />
        <Facetas />
        <MarcasProyectos />
        <Galeria />
        <VideoCTA />
      </main>
      <Footer />
    </>
  )
}

export default Home
