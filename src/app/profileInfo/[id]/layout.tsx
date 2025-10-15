import Footer from "../../Components/Footer";
import MainProfilePage from "../../Components/MainProfilePage";
import Navbar from "../../Components/Navbar";

export default  function layout({children}){
    
  return  (
  <><Navbar></Navbar>
  {/* <MainProfilePage></MainProfilePage> */}
  {children}
  
  <Footer></Footer>
  </>
)

}