import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { GridProvider } from "./providers/GridContext.jsx";
import { ColorProvider } from "./providers/ColorContext.jsx";
import Footer from "./components/footer/Footer.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
function App() {
  

  return (
    <>
      <GridProvider>
        <ColorProvider>
          <Header></Header>
          <Sidebar></Sidebar>
          <Grid></Grid>
          <Footer></Footer>
        </ColorProvider>
      </GridProvider>
    </>
  );
}

export default App;
