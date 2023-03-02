import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login"
import  Checkout from "./components/Checkout";
import { Route, Switch } from "react-router-dom";
import Product from "./components/Products"
import { ThemeProvider } from "@emotion/react";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
       
     <Switch>
     
     
        <Route exact path="/">
          <Product />
        </Route>
        
        <Route exact path="/login">
          <Login />
        </Route>
        
        <Route exact path="/register">
          <Register />
        </Route>
        
        <Route exact path="/Checkout">
          <Checkout />
        </Route>
          
          </Switch>
    </div>
    
  );
}

export default App;
