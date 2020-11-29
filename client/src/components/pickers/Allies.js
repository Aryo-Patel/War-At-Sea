import React, { useEffect } from 'react';
import $ from 'jquery';
import { addShips } from '../../actions/ships';
import { connect } from 'react-redux';
const Allies = (props) => {
    const inputStates = [];
    useEffect(() => {
        $('input[type=radio]').each(function (i) {
            $(this).attr('name', i + "");
            inputStates.push(false);

        })
        $('input[type=radio]').click(function (e) {
            let addShips = [];
            let index = parseInt($(this).prop('name'));
            if (index === 0) {
                for (let i = 1; i < 12; i++) {
                    $(`[name=${i + ""}]`).prop('checked', false);
                    inputStates[i] = false;
                }
            }
            else if (index === 12) {
                for (let i = 13; i < inputStates.length; i++) {
                    $(`[name=${i + ""}]`).prop('checked', false);
                    inputStates[i] = false;
                }
            }
            else if (index < 12) {
                $(`[name=0]`).prop('checked', false);
                inputStates[0] = false;
            }
            else {
                $(`[name=12]`).prop('checked', false);
                inputStates[12] = false;
            }
            inputStates[index] = !inputStates[index];
            if (!inputStates[index]) {
                $(this).prop('checked', false);
            }
            inputStates.forEach((state, index) => {
                if (state === true) {
                    let country = $(`[name=${index}]`).parent().text();
                    let faction;
                    if (index < 12) {
                        faction = 'allies';
                    }
                    else {
                        faction = 'axis';
                    }
                    addShips.push({
                        country,
                        faction
                    });

                }
            });
            props.addShips(addShips);
        });
    }, [inputStates, props])

    return (
        <div className="allies-wrapper">
            <div className="allies-text-wrapper">
                <h4 className="allies-text">Allies Faction</h4>
            </div>
            <div className="allies-items">
                <label className="container" id="all" aria-checked="false">All
                    <input type="radio" />
                    <span className="checkmark"></span>

                </label>
                <label className="container" id="france">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    France
                </label>
                <label className="container" id="new-zealand">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    New Zealand
                </label>
                <label className="container" id="united-kingdom">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    United Kingdom
                </label>
                <label className="container" id="australia">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Australia
                </label>
                <label className="container" id="greece">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Greece
                </label>
                <label className="container" id="poland">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Poland
                </label>
                <label className="container" id="united-states">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    United States
                </label>
                <label className="container" id="canada">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Canada
                </label>
                <label className="container" id="netherlands">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Netherlands
                </label>
                <label className="container" id="soviet-union">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Soviet Union
                </label>
                <label className="container" id="neutral">
                    <input type="radio" />
                    <span className="checkmark"></span>
                    Allies Neutral / Instalations
                </label>
            </div>
        </div>
    )
}
export default connect(null, { addShips })(Allies);