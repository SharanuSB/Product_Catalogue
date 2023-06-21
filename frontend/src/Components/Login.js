import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleIsLoggenIn } = props

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email, password
        }
        try {
            const user = await axios.post("http://localhost:3232/api/users/login", formData)
            if (!user.data.error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
                localStorage.setItem("token", user.data)
                handleIsLoggenIn()
                props.history.push("/dashboard")
            } else if (user.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${user.data.error}`
                })
            }
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card p-4 shadow my-4 col-md-4">
                <h3>Login to Account</h3>
                <form onSubmit={handleLoginSubmit}>

                    <label htmlFor="email" className="form-label">Email</label><br />
                    <input type="text"
                        id="email" value={email}
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    /><br />

                    <label htmlFor="pass" className="form-label">PassWord</label><br />
                    <input type="password"
                        className="form-control"
                        value={password} id="pass"
                        placeholder="Enter your password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    /><br />

                    <input type="submit" className="btn btn-primary" />

                </form>
            </div>
        </div>
    )
}

export default Login