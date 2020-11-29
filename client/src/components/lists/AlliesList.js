import React, { useState } from 'react';
import AddShips from './AddShips';
import ShipsShown from './ShipsShown';
import PDFDownload from './PDFDownload';



import { connect } from 'react-redux';
const AlliesList = ({ points, alliesPoints }) => {

    const [shipsLoaded, changeShips] = useState(false);

    function addAllies() {
        changeShips(!shipsLoaded);
    }

    // function generatePDF(){
    //     window.scrollTo(0,0);
    //     const printArea = document.getElementById('allies-container');
    //     html2canvas(printArea, {allowTaint: true, useCORS: true}).then(canvas => {
    //         console.log(canvas);
    //         const dataURL  = canvas.toDataURL();
            
    //         const pdf = new jsPDF();

    //         const imgProps = pdf.getImageProperties(dataURL);
    //         const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    //         const pdfHeight = (imgProps.height * pdfWidth)/imgProps.width;


    //         pdf.addImage(dataURL, 'PNG', 10, 10, pdfWidth, pdfHeight);

    //         pdf.save('Allies_Ships.pdf');
    //     })
    // }
    return (
        <div className="allies-list-wrapper" id = "allies-container">
            <div className="allies-list-header-wrapper">
                <div className="text-wrapper">
                    <h4>Allies list</h4>
                    <p>{alliesPoints} / {points}</p>
                </div>
                <div className="save-options">
                    <PDFDownload id = "download" totalPoints = {points} sidePoints = {alliesPoints} faction = 'allies'/>
                </div>
            </div>
            <div className="line">
                <hr />
            </div>
            <div className="add-unit">
                <ShipsShown faction='allies' />

                <p onClick={e => addAllies(e)}>[{shipsLoaded ? '-' : '+'}] Add Unit</p>
                {shipsLoaded && (
                    <AddShips faction="allies" />
                )}

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    points: state.points,
    alliesPoints: state.factionPoints.allies
})

export default connect(mapStateToProps, {})(AlliesList);