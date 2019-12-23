import React, { useState } from 'react'; 

// import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialItem = {
    name: '',
    price:'',
    imageURL:'',
    description:''
}; 

const FarmItemForm = props => {
    const [ newFarmItem, setNewFarmItem] = useState(initialItem); 

    const handleChange = event => {
        let value = event.target.value; 

        setNewFarmItem({
            ...item,
            [event.target.name]: value
        }); 
    }; 

    const handleSubmit = event => {
        e.preventDefault();
    }; 

    return (
        <div className="NewFarmItem-Form">
            <h2> Add Produce to Sell </h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="name"
                value={item.name}
                />
                <input
                type="price"
                name="price"
                onChange={handleChange}
                placeholder="price"
                value={item.price}
                />
                <input 
                type="string"
                name="imageURL"
                onChange={handleChange}
                placeholder="Picture of Product"
                value={item.imageURL}
                />
                <input 
                type="string"
                name="description"
                onChange={handleChange}
                placeholder="description"
                value={item.description}
                />

                <button className="button-edit">
                    Add To For Sale 
                </button>
            </form>
        </div>
    )

}

export default FarmItemForm; 