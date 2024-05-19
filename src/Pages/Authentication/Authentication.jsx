import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import logo from "../../assets/logo-svd516f114-e-e.png"

export default function Authentication() {

    const [viewState, setViewState] = useState('login');

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div className="flex justify-center shadow-lg">
                <img src={logo} />
            </div>
            {viewState === 'login' && <Login onRegisterClick={setViewState} />}
            {viewState === 'register' && <Register onLoginClick={setViewState} />}
        </div>
    )
}
