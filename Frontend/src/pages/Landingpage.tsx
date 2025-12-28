import About from "../components/About"
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
    </div>
  )
}

export default landingpage
