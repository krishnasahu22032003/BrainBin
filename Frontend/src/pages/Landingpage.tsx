import About from "../components/About"
import FAQ from "../components/FAQ"
import Features from "../components/Features"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"

const landingpage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Features/>
      <About/>
      <Testimonials/>
      <FAQ/>
    </div>
  )
}

export default landingpage
