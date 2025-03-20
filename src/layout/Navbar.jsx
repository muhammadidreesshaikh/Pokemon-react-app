import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">React Pokemon App</Link>
                <Link className="btn btn-outline-light" to="/">Home</Link>
            </div>
        </nav>
    );
};

export default Navbar;