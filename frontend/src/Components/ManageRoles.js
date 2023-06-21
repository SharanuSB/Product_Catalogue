import axios from "axios"
import { useState, useEffect } from "react"

const ManageRoles = (props) => {
    const [users, setUsers] = useState([])
    const [btnClick, setBtnClick] = useState(false)


    useEffect(() => {
        (
            async () => {
                try {
                    const users = await axios.get("http://localhost:3232/api/users", {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    setUsers(users.data)
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }, [btnClick])

    const moderators = users.filter(ele => ele.role == "moderator")
    const customers = users.filter(ele => ele.role == "customer")

    const handleBtnClick = () => {
        setBtnClick(!btnClick)
    }

    const handleChangeRole = async (id) => {
        try {
            const user = await axios.put(`http://localhost:3232/api/users/changeRole/${id}`, {}, {
                headers: {
                    "Auth": localStorage.getItem("token")
                }
            })
            handleBtnClick()
            console.log(user.data)
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 my-5 card p-2 bg-light">
                    <h2>Listing customers : {customers.length}</h2>
                    <table className="table border table-hover table-secondary table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.role}</td>
                                        <td><button
                                            onClick={() => { handleChangeRole(ele._id) }}
                                            className="btn btn-primary btn-sm"
                                        >Promote as Mod</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="col-md-5 my-5 card p-2">
                    <h2>Listing moderators : {moderators.length}</h2>
                    <table className="table border table-hover table-secondary">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                moderators.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.role}</td>
                                        <td><button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => { handleChangeRole(ele._id) }}
                                        >Demote as customer</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageRoles