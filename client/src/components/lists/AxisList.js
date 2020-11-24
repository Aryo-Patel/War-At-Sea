import React, { useState } from 'react';
import AddShips from './AddShips';
import ShipsShown from './ShipsShown';
import { connect } from 'react-redux';
import PDFDownload from './PDFDownload';

import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
const AxisList = ({ points, axisPoints }) => {
    const [shipsLoaded, changeShips] = useState(false);

    function addAxis() {
        changeShips(!shipsLoaded);
    }
    function generateAxisPDF(){
        window.scrollTo(0,0);
        const printArea = document.getElementById('axis-container');
        html2canvas(printArea, {allowTaint: true, useCORS: true}).then(canvas => {
            
            const dataURL  = canvas.toDataURL();
            
            const pdf = new jsPDF();

            const imgProps = pdf.getImageProperties(dataURL);
            console.log(imgProps);
            const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
            const pdfHeight = (imgProps.height * pdfWidth)/imgProps.width;


            pdf.addImage(dataURL, 'PNG', 10, 10, pdfWidth, pdfHeight);

            pdf.save('Axis_Ships.pdf');
        })
    }
    return (
        <div className="axis-list-wrapper" id = "axis-container">
            <div className="axis-list-header-wrapper">
                <div className="text-wrapper">
                    <h4>Axis list</h4>
                    <p>{axisPoints} / {points}</p>
                </div>
                <div className="save-options">
                    <i className="fa fa-print"></i>
                    <PDFDownload id = "download" faction  = 'axis'/>
                </div>
            </div>
            <div className="line">
                <hr />
            </div>
            <div className="add-unit">
                <ShipsShown faction='axis' />
                <p onClick={e => addAxis(e)}>[{shipsLoaded ? '-' : '+'}] Add Unit</p>
                {shipsLoaded && (
                    <AddShips faction="axis" />
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    points: state.points,
    axisPoints: state.factionPoints.axis
})

export default connect(mapStateToProps, {})(AxisList);