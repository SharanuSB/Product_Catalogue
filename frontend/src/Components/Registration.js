import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const Registration = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name, email, password
        }
        const user = await axios.post("http://localhost:3232/api/users/register", formData)
        try {
            if (user.data._id) {
                Swal.fire(
                    'Good job!',
                    'Sucessfully Registered Your Account',
                    'success'
                )
                props.history.push("/login")
            } else if (user.data?.keyValue) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is Already Registered'
                })
            } else if (user.data._message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${user.data.message}`
                })
            }
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <div className="d-flex justify-content-center ">
            <div className=" card p-4 shadow my-4 col-md-4">
                <h3 className="d-flex justify-content-center">Register Account</h3>

                <form onSubmit={handleRegisterSubmit}>
                    <label htmlFor="name" className="form-label">UserName</label><br />
                    <input type="text" className="form-control"
                        id="name" value={name}
                        placeholder="Enter your Name"
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    /><br />

                    <label htmlFor="email" className="form-label">Email</label><br />
                    <input type="text"
                        className="form-control"
                        id="email" value={email}
                        placeholder="Enter your email"
                        onChange={(e) => { setEmail(e.target.value) }} required /><br />

                    <label htmlFor="phone" className="form-label">Phone</label><br />
                    <input type="text"
                        className="form-control"
                        value={phone} id="phone"
                        placeholder="Enter your phone"
                        onChange={(e) => { setPhone(e.target.value) }} required /><br />

                    <label htmlFor="pass" className="form-label">PassWord</label><br />
                    <input type="text"
                        className="form-control"
                        value={password} id="pass"
                        placeholder="Enter your password"
                        onChange={(e) => { setPassword(e.target.value) }} required /><br />

                    <input type="submit" className="btn btn-primary" />

                </form>
            </div>
        </div>
    )
}

export default Registration