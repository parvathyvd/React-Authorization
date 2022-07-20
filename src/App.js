import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useGlobalContext } from "./store/auth-context";

function App() {
  const { isLoggedIn } = useGlobalContext();
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
