import { Link } from "react-router-dom";
import { authStore } from "../../store/authStore";

export const Logout = () => {
    return (
        <Link className="logout" to="#" onClick={authStore.logout}>
            <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </Link>
    );
}
