import { useState } from "react";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { GridProvider } from "./providers/GridContext.jsx";
import { ColorProvider } from "./providers/ColorContext.jsx";

function App() {
  

  return (
    <>
      <GridProvider>
        <ColorProvider>
          <Header></Header>

          <Grid></Grid>
        </ColorProvider>
      </GridProvider>
    </>
  );
}

export default App;
