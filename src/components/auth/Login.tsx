import { FormEventHandler } from "react";
import { authStore } from "../../store/authStore";

export const Login = () => {
    const err = authStore.error;
  
    const onLogin: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        if (!form) {
            return;
        }

        const formData = new FormData(form);

        const login = formData.get('login');
        const password = formData.get('password');

        if (!login || !password) {
            return;
        }

        authStore.login({
          login: login.toString(),
          password: password.toString()
        })
    }

    return (
        <div className="auth">
            <div className="auth__container">
                <h1>ToDo List</h1>
                <form className="auth__form" onSubmit={onLogin}>
                    <label htmlFor="login" />
                    <input type="text" placeholder="Login" id="login" name="login" />
                    <label htmlFor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                    />
                    <button type="submit">Log In</button>
                    <p className="errors">{err}</p>
                </form>
            </div>
        </div>
    );
}
