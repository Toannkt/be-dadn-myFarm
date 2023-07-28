import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { publicRoutes, privateRoutes, loginRoute, homeRoute } from './routes';
import Layout from './components/Layout';
import GlobalContext from './context/GlobalContext';
import config from './config';

function App() {
    const { currentUser } = useContext(GlobalContext);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>{currentUser ? <Page /> : <Navigate to={config.routes.login} />}</Layout>
                                }
                            />
                        );
                    })}

                    <Route
                        path={homeRoute.path}
                        element={
                            <Layout>
                                {currentUser ? <Navigate to={config.routes.myfarm} /> : <homeRoute.component />}
                            </Layout>
                        }
                    />
                    <Route
                        path={loginRoute.path}
                        element={
                            <Layout>
                                {currentUser ? <Navigate to={config.routes.myfarm} /> : <loginRoute.component />}
                            </Layout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
