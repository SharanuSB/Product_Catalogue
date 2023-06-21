import Form from "./Form"
import axios from "axios"
import { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const EditItem = (props, args) => {


    const { data, handleEdit, toggle, modal } = props



    const submitForm = async (formData) => {
        try {
            const updatedProduct = await axios.put(`http://localhost:3232/api/products/${data._id}`, formData, {
                headers: {
                    "Auth": localStorage.getItem("token")
                }
            })
            if (!updatedProduct.data.errors) {
                handleEdit()
                toggle()
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            {/* <Button color="danger" onClick={toggle}>
                Click Me
            </Button> */}
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody >
                    <Form submitForm={submitForm}
                        {...data}
                    />
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '} */}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>

    )
}

export default EditItem
