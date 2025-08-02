import { Button } from "./components/Button"
import { FaRocket } from "react-icons/fa"; // ✅ Correct icon import
import { GrShareOption } from "react-icons/gr";
function App() {


  return (
    <>
     <div >
<Button variant="primary" size="lg" text="sign Up" onClick={()=>{console.log("clicked")}} icon={<FaRocket/>}/>
<Button  variant="secondary" size="lg" text="Share" onClick={()=>{console.log("clicked")}} icon={<GrShareOption/>}/>
     </div>
    </>
  )
}

export default App
