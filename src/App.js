import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import Detail from "./pages/detail";
import Home from "./pages/home"

const oktaAuth = new OktaAuth({
  issuer: 'https://trial-9919449.okta.com/oauth2/default',
  clientId: '0oa5e7oxnem4lOVMI697',
  redirectUri: window.location.origin + '/login/callback'
});

function App() {

  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/detail' component={Detail} />
        <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
}

const AppWithRouterAccess = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouterAccess;
