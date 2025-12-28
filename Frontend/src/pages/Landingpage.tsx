import About from "../components/About"
import CTA from "../components/CTA"
import FAQ from "../components/FAQ"
import Features from "../components/Features"
import Footer from "../components/Footer"
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
      <CTA/>
      <Footer/>
    </div>
  )
}

export default landingpage
