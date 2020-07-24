import React, { useState, useEffect } from 'react';

const axios = require('axios');
const AddtoDB = props => {
    const [shipProperties, updateProperties] = useState({
        nation: "",
        units: "",
        name: "",
        points: ""
    });

    // useEffect(() => {
    //     console.log(shipProperties);
    // }, [shipProperties]);

    async function submitForm(e) {
        e.preventDefault();

        if (shipProperties.name !== "" && shipProperties.nation !== "" && shipProperties.units !== "" && shipProperties.points !== "") {
            const config = {
                headers: {
                    'Content-Type': "application/json"
                }
            };
            try {
                const body = shipProperties;
                console.log(shipProperties);
                await axios.put('/ships', body, config);
                console.log('ship posted');
            } catch (err) {
                console.log(err);
            }
        }
        else {
            alert("Info not filled out completely");
        }
    }

    function inputUpdate(e) {
        updateProperties({
            ...shipProperties,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="db-container" onSubmit={async (e) => await submitForm(e)}>
            <div className="db-container-banner">
                <h3 className="db-container-header">Add a new ship</h3>
                <hr />
            </div>
            <div className="specifications">
                <input placeholder="Nation" name="nation" value={shipProperties.nation} onChange={e => inputUpdate(e)} />
                <input placeholder="Number of units available" type="number" name="units" value={shipProperties.units} onChange={e => inputUpdate(e)} />
                <input placeholder="Ship name" name="name" value={shipProperties.name} onChange={e => inputUpdate(e)} />
                <input placeholder="Points Value/Unit" name="points" type="number" value={shipProperties.points} onChange={e => inputUpdate(e)} />
            </div>
            <div className="submit-holder">
                <input type="submit" className="database-submit" splaceholder="submit" />
            </div>

        </form>
    )
}

export default AddtoDB;