import React, { useContext } from 'react';
import { RegisterForm } from 'components/Authentication/Signup';
import { AccountPage } from './components/AccountPage';
import { AuthForm } from 'components/Authentication/Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostsPage } from './components/PostsPage';
import Context, { myContext } from 'components/Context';

function App(): JSX.Element {
  const ctx = useContext(myContext);
  console.log('current context is ', ctx);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AccountPage />} />{' '}
          {/* TODO: "/" should be routing to AuthPage */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/PostsPage" element={<PostsPage />} />
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<AuthForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
