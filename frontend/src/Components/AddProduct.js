import Form from "./Form"
import axios from "axios"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"

const AddProducts = (props) => {

    const submitForm = async (data) => {
        try {
            const newProduct = await axios.post("http://localhost:3232/api/products", data, {
                headers: {
                    "Auth": localStorage.getItem("token")
                }
            })
            if (newProduct.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${newProduct.data.error}`,
                })
            } else if (newProduct.data.errors) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${newProduct.data._message}`,
                })
            } else {
                Swal.fire(
                    'Good job!',
                    'Successfully added the product',
                    'success'
                )
                props.history.push("/dashboard")
            }

        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <div>
            <Form submitForm={submitForm} />
        </div>
    )
}

export default withRouter(AddProducts)