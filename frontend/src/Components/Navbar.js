import { Link, Route } from "react-router-dom"
import Home from "./Home"
import Registration from "./Registration"
import Login from "./Login"
import AddProducts from "./AddProduct"
import DashBoard from "./DashBoard"
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import Swal from "sweetalert2"
import jwtDecode from "jwt-decode"
import ManageRoles from "./ManageRoles"
import PrivateRoute from "./PrivateRoute"
import ProtectedRoute from "./ProtectedRoute"



const Navbar = (props) => {

    const { handleIsLoggenIn } = props


    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "",
                    'Successfully logged out',
                    'success'
                )
                localStorage.removeItem("token")
                props.history.push("/")
            }
        })

    }

    let role
    if (localStorage.getItem("token")) {
        role = jwtDecode(localStorage.getItem("token")).role
    }

    return (
        <div >
            <div className="d-flex flex-row gap-5">
                <li><Link to="/">Home</Link></li>
                {
                    localStorage.getItem("token") ?
                        <div className="d-flex flex-row gap-5" >
                            <li><Link to="/dashboard">DashBoard</Link></li>
                            {
                                ["admin", "moderator"].includes(role) &&
                                <li><Link to="/addProducts">Add Product</Link></li>
                            }
                            {
                                role.includes("admin") &&
                                <li><Link to="/manageRoles">Manage Roles</Link></li>
                            }
                            <li><Link to="/#" onClick={handleLogout}>Logout</Link></li>
                        </div> :
                        <div className="d-flex flex-row gap-5">
                            <li><Link to="/registration">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </div>
                }
            </div>


            <Route path="/" component={Home} exact={true} />
            <Route path="/registration" component={Registration} exact={true} />
            <Route path="/login" render={(props) => {
                return <Login
                    {...props}
                    handleIsLoggenIn={handleIsLoggenIn}
                />
            }} />
            <PrivateRoute path="/dashboard" component={DashBoard} exact={true} />
            <ProtectedRoute path="/addProducts" role={role} component={AddProducts} exact={true} />
            <ProtectedRoute path="/manageRoles" role={role} component={ManageRoles} exact={true} />
        </div>
    )
}

export default withRouter(Navbar)