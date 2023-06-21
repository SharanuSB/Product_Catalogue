import decode from "jwt-decode"
import { useEffect, useState } from "react"
import axios from "axios"
import EditItem from "./EditItem"


const DashBoard = () => {

    const [products, setProducts] = useState([])
    const [toggleEditBtn, setToggleEditBtn] = useState(false)
    const [show, setShow] = useState({})

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const role = decode(localStorage.getItem("token")).role

    useEffect(() => {
        (
            async () => {
                try {
                    const newProducts = await axios.get("http://localhost:3232/api/products", {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    setProducts(newProducts.data)
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }, [toggleEditBtn])

    const handleRemove = async (id) => {
        try {
            const confirmRemove = window.confirm("Sure you want to delete the Product")
            if (confirmRemove) {
                const product = await axios.delete(`http://localhost:3232/api/products/${id}`, {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })
                const newProducts = products.filter(ele => {
                    return ele._id != product.data._id
                })
                setProducts(newProducts)
            }

        } catch (error) {
            alert(error.message)
        }
    }


    const handleView = (id) => {

    }

    const handleEdit = (data) => {
        setToggleEditBtn(!toggleEditBtn)
        setShow(data)
        toggle()
    }

    return (
        <div className="container">
            <div className="row">

                {
                    toggleEditBtn && <EditItem data={show}
                        handleEdit={handleEdit}
                        toggle={toggle}
                        modal={modal}
                    />
                }

                {
                    products.map(product => {
                        return <div className="col-md-4 my-4" key={product._id}>

                            <li className="card p-4 fs-3 bg-subtle">
                                <blockquote>Name - {product.name}</blockquote>
                                <blockquote>Price - {product.price}</blockquote>

                                <div className="d-flex my-2 flex-row p-2 gap-2">
                                    <button className="btn btn-secondary btn-sm">Veiw</button>
                                    {
                                        ["moderator", "admin"].includes(role) &&
                                        <button className="btn btn-primary btn-sm" onClick={() => { handleEdit(product) }}>Edit</button>

                                    }
                                    {
                                        role.includes("admin") &&
                                        <button className="btn btn-danger btn-sm" onClick={() => { handleRemove(product._id) }}>remove</button>
                                    }

                                </div>

                            </li>

                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default DashBoard