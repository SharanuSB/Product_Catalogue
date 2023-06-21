
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { path, role } = rest
    return (
        <Route
            {...rest}
            render={(props) => {
                if (path == "/addProducts") {
                    return (
                        localStorage.getItem("token") && ["admin", "moderator"].includes(role) ?
                            (
                                <Component {...props} />
                            ) : (
                                <Redirect
                                    to={{ pathname: "/dashboard" }}
                                />
                            )
                    )
                } else if (path == "/manageRoles") {
                    return (
                        localStorage.getItem("token") && role.includes("admin") ?
                            (
                                <Component {...props} />
                            ) : (
                                <Redirect
                                    to={{ pathname: "/dashboard" }}
                                />
                            )
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute