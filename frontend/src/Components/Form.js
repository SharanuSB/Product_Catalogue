
import { useState } from "react"


const Form = (props) => {

    const { submitForm, name: n, price: p } = props

    const [name, setName] = useState(n ? n : "")
    const [price, setPrice] = useState(p ? p : "")

    const handleProductSubmit = (e) => {
        e.preventDefault()

        const formData = {
            name, price
        }
        submitForm(formData)
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="card p-4 shadow my-4 col-md-4">
                    <h3>Add New Products</h3>
                    <form onSubmit={handleProductSubmit}>

                        <label htmlFor="email" className="form-label">Name</label><br />
                        <input type="text"
                            id="email" value={name}
                            className="form-control"
                            placeholder="Enter your Name"
                            onChange={(e) => { setName(e.target.value) }}
                            required
                        /><br />

                        <label htmlFor="pass" className="form-label">price</label><br />
                        <input type="number"
                            className="form-control"
                            value={price} id="pass"
                            placeholder="Enter product price"
                            onChange={(e) => { setPrice(e.target.value) }}
                            required
                        /><br />

                        <input type="submit" className="btn btn-primary" />


                    </form>
                </div>
            </div>

        </div>
    )
}

export default Form