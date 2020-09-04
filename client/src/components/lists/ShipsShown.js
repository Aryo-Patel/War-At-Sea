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
        console.log(inputs);
    }, [alliesShips, axisShips]);
    allShips.forEach(ship => {
        alliesShips.forEach(allyShip => {
            if (allyShip.name === ship.name) {
                for (let i = 0; i < allyShip.quantity; i++) {
                    alliesArray.push(ship);
                }

            }
        });

        axisShips.forEach(axisShip => {
            if (axisShip.name === ship.name) {
                axisArray.push(ship);
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
    function deleteSingleShip(e) {
        let shipName = e.target.getAttribute('name');
        removeOneShip({ name: e.target.getAttribute('name') });
        let currShip = allShips.filter(ship => ship.name === shipName);
        currShip = currShip[0];
        let axisNations = ['Italy', 'Finland', 'Japan', 'Germany'];
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
            {faction === 'allies' ? (
                alliesArray.map(allyShip => {
                    let currShip = alliesShips.filter(ship => ship.name == allyShip.name);
                    return (
                        allyShip.image ?
                            <div key={i++} className="ship-wrapper" name={allyShip.name} onClick={e => toggleCheckAllies(e)}>
                                <span key={i++} className="no-pointer">Lock: </span>

                                {currShip[0].locked ? <input key={i++} className="no-pointer" name={allyShip.name} type="checkbox" checked /> :
                                    <input key={i++} className="no-pointer" name={allyShip.name} type="checkbox" />}
                                <i name={allyShip.name} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
                                <div key={i++} className="ship-placard no-pointer">
                                    <img key={i++} className="image-ship-placard no-pointer" src={allyShip.image} alt={allyShip.name} />
                                </div>
                            </div>
                            :
                            <div key={i++} className="ship-wrapper" name={allyShip.name} onClick={e => toggleCheckAllies(e)}>
                                <span key={i++} className="no-pointer">Lock: </span>

                                {currShip[0].locked ? <input key={i++} className="no-pointer" name={allyShip.name} type="checkbox" checked /> :
                                    <input key={i++} className="no-pointer" name={allyShip.name} type="checkbox" />}
                                <i name={allyShip.name} className="fa fa-trash delete" onClick={e => deleteSingleShip(e)}></i>
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
                    <h1>axis test</h1>
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