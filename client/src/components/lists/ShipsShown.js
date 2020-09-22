import React, { useEffect } from 'react';


import { connect } from 'react-redux';
import { toggleLock, removeOneShip } from '../../actions/ships';
import { setFactionPoints } from '../../actions/points';
// import shipsInPlay from '../../reducers/shipsInPlay';
const ShipsShown = props => {
    const { alliesShips, axisShips, faction, allShips, toggleLock, removeOneShip, setFactionPoints } = props;
    let alliesArray = [];
    let axisArray = [];
    let inputs;
    useEffect(() => {
        inputs = document.querySelectorAll('inputs[class=no-pointer');
    }, [alliesShips, axisShips]);
    allShips.forEach(ship => {
        alliesShips.forEach(allyShip => {
            if (allyShip.name === ship.name && ship.nation !== 'Axis Neutral / Instalations') {
                alliesArray.push({ ...ship, secretName: allyShip.secretName, locked: allyShip.locked });

            }
        });
        axisShips.forEach(axisShip => {
            if (axisShip.name === ship.name && ship.nation !== 'Allies Neutral / Instalations') {
                axisArray.push({ ...ship, secretName: axisShip.secretName, locked: axisShip.locked });
            }
        });
    });

    function toggleCheckAllies(e) {
        let classArr = Array.from(e.target.classList);
        if (classArr.indexOf('fa') == -1) {
            let shipName = e.target.getAttribute('name');
            toggleLock(shipName, 'allies');

            let input = e.target.querySelector('input');
            if (input) {
                input.checked = !input.checked;
            }
        }
    }
    function toggleCheckAxis(e) {
        let classArr = Array.from(e.target.classList);
        if (classArr.indexOf('fa') == -1) {
            let shipName = e.target.getAttribute('name');
            console.log(shipName);
            toggleLock(shipName, 'axis');

            let input = e.target.querySelector('input');
            if (input) {
                input.checked = !input.checked;
            }
        }
    }
    function deleteSingleShip(e) {
        let shipName = e.target.getAttribute('name');
        removeOneShip({ name: e.target.getAttribute('name') });
        let shipIdentifier = shipName.split(' ');
        shipIdentifier.splice(shipIdentifier.length - 1, 1);
        shipIdentifier = shipIdentifier.join(' ');
        console.log(shipIdentifier);
        let currShip = allShips.filter(ship => ship.name === shipIdentifier);
        currShip = currShip[0];
        console.log(currShip);
        let axisNations = ['Italy', 'Finland', 'Japan', 'Germany', 'Axis Neutral/Instalations'];
        if (axisNations.indexOf(currShip.nation) !== -1) {
            setFactionPoints('axis', -currShip.points);
        }
        else {
            setFactionPoints('allies', -currShip.points);
        }
    }
    let i = 0;
    return (
        <div className="display-ship-wrapper">
            <input type = 'checkbox' checked = {false} />
            {faction === 'allies' ? (
                alliesArray.map(allyShip => {
                    //let currShip = alliesShips.filter(ship => ship.secretName == allyShip.secetName);
                    return (
                        allyShip.image ?
                            <div key={i++} className="ship-wrapper" name={allyShip.secretName} onClick={e => toggleCheckAllies(e)}>
                                <span key={i++} className="no-pointer">Lock: </span>
                                {console.log(alliesShips)}
                                {allyShip.locked ? <input key={i++} className="no-pointer" name={allyShip.secretName} type="checkbox" checked /> :
                                    <input key={i++} className="no-pointer" name={allyShip.secretName} type="checkbox" />}
                                <i name={allyShip.secretName} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
                                <div key={i++} className="ship-placard no-pointer">
                                    <img key={i++} className="image-ship-placard no-pointer" src={allyShip.image} alt={allyShip.name} />
                                </div>
                            </div>
                            :
                            <div key={i++} className="ship-wrapper" name={allyShip.secretName} onClick={e => toggleCheckAllies(e)}>
                                <span key={i++} className="no-pointer">Lock: </span>

                                {allyShip.locked ? <input key={i++} className="no-pointer" name={allyShip.secretName} type="checkbox" checked /> :
                                    <input key={i++} className="no-pointer" name={allyShip.secretName} type="checkbox" />}
                                <i name={allyShip.secretName} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
                                <div key={i++} className="ship-placard no-pointer">
                                    <h3 key={i++} className="no-pointer">{allyShip.name}</h3>
                                    <h5 key={i++} className="no-pointer">{allyShip.nation}</h5>
                                    <h5 key={i++} className="no-pointer">{allyShip.points}</h5>
                                </div>
                            </div>
                    )
                }
                )
            )
                :
                (
                    axisArray.map(axisShip => {
                        //let currShip = alliesShips.filter(ship => ship.secretName == axisShip.secetName);
                        return (
                            axisShip.image ?
                                <div key={i++} className="ship-wrapper" name={axisShip.secretName} onClick={e => toggleCheckAxis(e)}>
                                    <span key={i++} className="no-pointer">Lock: </span>

                                    {axisShip.locked ? <input key={i++} className="no-pointer" name={axisShip.secretName} type="checkbox" checked /> :
                                        <input key={i++} className="no-pointer" name={axisShip.secretName} type="checkbox" />}
                                    <i name={axisShip.secretName} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
                                    <div key={i++} className="ship-placard no-pointer">
                                        <img key={i++} className="image-ship-placard no-pointer" src={axisShip.image} alt={axisShip.name} />
                                    </div>
                                </div>
                                :
                                <div key={i++} className="ship-wrapper" name={axisShip.secretName} onClick={e => toggleCheckAxis(e)}>
                                    <span key={i++} className="no-pointer">Lock: </span>

                                    {axisShip.locked ? <input key={i++} className="no-pointer" name={axisShip.secretName} type="checkbox" checked /> :
                                        <input key={i++} className="no-pointer" name={axisShip.secretName} type="checkbox" />}
                                    <i name={axisShip.secretName} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
                                    <div key={i++} className="ship-placard no-pointer">
                                        <h3 key={i++} className="no-pointer">{axisShip.name}</h3>
                                        <h5 key={i++} className="no-pointer">{axisShip.nation}</h5>
                                        <h5 key={i++} className="no-pointer">{axisShip.points}</h5>
                                    </div>
                                </div>
                        )
                    }
                    )
                )}
        </div>
    )
}

const mapStateToProps = state => ({
    alliesShips: state.shipsInPlay.allies,
    axisShips: state.shipsInPlay.axis,
    allShips: state.allShips,
});

export default connect(mapStateToProps, { toggleLock, removeOneShip, setFactionPoints })(ShipsShown);