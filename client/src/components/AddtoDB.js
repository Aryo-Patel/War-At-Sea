import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
const axios = require('axios');
const $ = require('jquery');




const AddtoDB = ({ allShips }) => {
    const [shipProperties, updateProperties] = useState({
        nation: "",
        units: "",
        name: "",
        points: "",
        class: "",
        image: ""
    });
    const [locked, updateLock] = useState(true);
    const [existingShip, updateExistingShip] = useState({
        nation: "",
        units: "",
        name: "",
        points: "",
        class: "",
        image: ""
    });

    const [deleteShip, updateDeleteShip] = useState({
        name: ''
    });
    useEffect(() => {
        console.log(existingShip);
    }, [existingShip]);

    const [displayType, updateDisplayType] = useState('new ship');


    $(document).ready(function () {
        $('#add-new-ship').unbind().click(function () {
            updateDisplayType('new ship');
            if ($(this).hasClass('non-selected')) {
                $(this).removeClass('non-selected');
                $('#update-existing-ship').addClass('non-selected');
                $('#delete-existing-ship').addClass('non-selected');
            }
        });
        $('#update-existing-ship').unbind().click(function () {
            updateDisplayType('update ship');
            if ($(this).hasClass('non-selected')) {
                $(this).removeClass('non-selected');
                $('#add-new-ship').addClass('non-selected');
                $('#delete-existing-ship').addClass('non-selected');
            }
        });
        $('#delete-existing-ship').unbind().click(function () {
            updateDisplayType('delete ship');
            if ($(this).hasClass('non-selected')) {
                $(this).removeClass('non-selected');
                $('#add-new-ship').addClass('non-selected');
                $('#update-existing-ship').addClass('non-selected');
            }
        })

    })
    async function submitForm(e) {
        e.preventDefault();
        if (!locked) {
            if (displayType === 'new ship') {
                if (shipProperties.name !== "" && shipProperties.nation !== "" && shipProperties.units !== "" && shipProperties.points !== "") {
                    const config = {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    };

                    try {
                        const body = shipProperties;
                        console.log(shipProperties);

                        let newFormData = new FormData();
                        let newMyFile = document.getElementById('new-image');
                        let newLink;
                        if (newMyFile.files[0]) {
                            console.log('inside the file statement');
                            newFormData.append('image', newMyFile.files[0], newMyFile.files[0].name);
                            let data = await axios.post('/ships/ship-url', newFormData);

                            newLink = data.data;
                            console.log(newLink);
                            body.image = newLink;

                            await axios.put('/ships', body, config);
                            alert('Ship added with image');
                        }
                        else {
                            await axios.put('/ships', body, config);
                            alert('Ship added with no image');
                        }
                    } catch (err) {
                        console.log(err);
                        alert('Error adding new ship');
                    }
                }
                else {
                    alert("Info not filled out completely");
                }
            }
            else if (displayType === 'delete ship') {
                console.log(deleteShip);
                try {
                    await axios.delete('/ships/ship', { data: deleteShip }, { headers: { 'Content-Type': "application/json" } });
                    alert('Successfully deleted ' + deleteShip.name);
                }
                catch (err) {
                    alert('Error deleting ' + deleteShip.name);
                }
            }
            else {
                let formData = new FormData();
                let myFile = document.getElementById('update-image');
                let link;
                const config = {
                    headers: {
                        'Content-Type': "application/json"
                    }
                };
                if (myFile.files[0]) {
                    console.log('inside the file statement');
                    formData.append('image', myFile.files[0], myFile.files[0].name);
                    let data = await axios.post('/ships/ship-url', formData);

                    link = data.data;
                    console.log(link);
                    let body = existingShip;
                    body.image = link;
                    await axios.put('/ships/update', body, config);
                    // updateExistingShip({
                    //     ...existingShip,
                    //     image: link
                    // });
                    alert('Update complete');
                    console.log('existingShip should be updated now');
                }
                else {
                    //console.log(existingShip);
                    await axios.put('/ships/update', existingShip, config);
                    alert('Update complete');
                }


            }
        }

    }

    function inputUpdate(e) {
        updateProperties({
            ...shipProperties,
            [e.target.name]: e.target.value
        });
    }

    function changeTargetShip(e) {
        let shipName = e.target.value;

        let currShipInfo = allShips.filter(ship => ship.name === shipName);
        currShipInfo = currShipInfo[0];
        updateExistingShip({
            nation: currShipInfo.nation,
            class: currShipInfo.class,
            points: currShipInfo.points,
            units: currShipInfo.number_available,
            name: currShipInfo.name,
            image: currShipInfo.image ? currShipInfo.image : '',
            class: currShipInfo.class ? currShipInfo.class : ''
        });
    }
    function updateChangeProps(e) {
        updateExistingShip({
            ...existingShip,
            [e.target.name]: e.target.value
        })
    }

    function changeDeleteShip(e) {
        let shipName = e.target.value;
        updateDeleteShip({
            ...deleteShip,
            name: shipName
        });
    }
    function passwordCheck(e) {
        let password = document.getElementById('auth-pass').value;
        if (password === 'floatilla') {
            updateLock(false);
            document.getElementById('auth-pass').value = "";
        }
        else {
            alert('Invalid Password');
            document.getElementById('auth-pass').value = "";
        }
    }
    return (
        <form className="db-container" onSubmit={async (e) => await submitForm(e)}>
            <div className="db-container-banner">
                <div className="db-container-text-options">
                    <h3 className="db-container-header" id="add-new-ship">Add a new ship</h3>
                    <h3 className="db-container-header non-selected" id="update-existing-ship">Update Existing Ship</h3>
                    <h3 className="db-container-header non-selected" id="delete-existing-ship">Delete Existing Ship</h3>
                </div>

                <hr />
            </div>

            {locked ?
                <div className="authorization-block">
                    <h1 className="authorization-header">Not Authorized</h1>
                    <h4 className="authorization-sub-text">Please enter a valid password to modify the database</h4>
                    <div className="password-entry">
                        <input className="authorization-password" id="auth-pass" type="password" placeholder="Password" />
                        <button className="authorization-submit" onClick={e => passwordCheck(e)}>Submit</button>
                    </div>

                </div>
                :
                <div className="specifications">
                    {displayType === 'new ship' ? (
                        <Fragment>
                            <input placeholder="Nation" name="nation" value={shipProperties.nation} onChange={e => inputUpdate(e)} />
                            <input placeholder="Number of units available" type="number" name="units" value={shipProperties.units} onChange={e => inputUpdate(e)} />
                            <input placeholder="Ship name" name="name" value={shipProperties.name} onChange={e => inputUpdate(e)} />
                            <input placeholder="Points Value/Unit" name="points" type="number" value={shipProperties.points} onChange={e => inputUpdate(e)} />
                            <input placeholder="Ship class" name="class" value={shipProperties.class} onChange={e => inputUpdate(e)} />
                            <input type="file" name="image" id="new-image" onChange={e => inputUpdate(e)} />
                            <input type="submit" className="database-submit" placeholder="submit" />
                        </Fragment>
                    ) : displayType === 'update ship' ?
                            <Fragment>
                                <label htmlFor="ships">Choose the name of the ship to modify</label>
                                <select id='ship-selector' name="ships" onChange={e => changeTargetShip(e)}>
                                    {allShips.map(ship => (
                                        <option value={ship.name}>{ship.name}</option>
                                    ))}
                                </select>
                                <label for="nation">Nation: </label>
                                <input placeholder="Nation" name="nation" value={existingShip.nation} onChange={e => updateChangeProps(e)} />
                                <label for="units">Number Available: </label>
                                <input placeholder="Number available" name="units" value={existingShip.units} onChange={e => updateChangeProps(e)} />
                                <label for="points">Points: </label>
                                <input placeholder="Points" name="points" value={existingShip.points} onChange={e => updateChangeProps(e)} />
                                <label for="class">Class: </label>
                                <input placeholder="Class" name="class" value={existingShip.class} onChange={e => updateChangeProps(e)} />
                                {existingShip.image ? <img className="existing-image" src={existingShip.image} alt="ship image here" /> : <label>No image for {existingShip.name}</label>}
                                <input placeholder="Image" type="file" name="image" id="update-image" />
                                <input type="submit" className='database-submit' placeholder="submit" />
                            </Fragment>
                            :
                            <Fragment>
                                <label htmlFor="ships">Choose the name of the ship to delete</label>
                                <select id='ship-selector' name="ships" onChange={e => changeDeleteShip(e)}>
                                    {allShips.map(ship => (
                                        <option value={ship.name}>{ship.name}</option>
                                    ))}
                                </select>
                                <input type="submit" className="database-submit" placeholder="submit" />
                            </Fragment>
                    }
                </div>
            }
        </form>
    )
}
const mapStateToProps = state => ({
    allShips: state.allShips
});

export default connect(mapStateToProps, {})(AddtoDB);