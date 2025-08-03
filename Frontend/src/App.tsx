import { Button } from "./components/Button"
import { FaRocket, FaBars, FaBell, FaUser } from "react-icons/fa"; // ✅ Correct icon import
import { GrShareOption } from "react-icons/gr";
import Card from "./components/Card";
function App() {


  return (
    <>
     <div >
<Button variant="primary" size="lg" text="sign Up" onClick={()=>{console.log("clicked")}} icon={<FaRocket/>}/>
<Button  variant="secondary" size="lg" text="Share" onClick={()=>{console.log("clicked")}} icon={<GrShareOption/>}/>
  <Card
      Title="Dashboard"
      lefticon={<FaBars />}
      righticon1={<FaBell />}
      righticon2={<FaUser />}
      heading="Today's Summary"
      points={[
        "You have 5 new notifications.",
        "Server CPU usage is at 65%.",
        "Backup completed successfully.",
      ]}
      hashtags={["system", "notifications"]}
      date="Aug 3, 2025"
    />
     </div>
    </>
  )
}

export default App
