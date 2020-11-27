import React, {useEffect, useState} from 'react';
import {Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image} from '@react-pdf/renderer';

import { connect } from 'react-redux';
let LOADING = true;
const ships = [];
const styles = StyleSheet.create({
    page: {
        flexDirection: "column"
    },
    headSection:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5%',
        fontSize: '12'
    },
    section: {
        width: '100vw',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '10px',
        marginLeft: '40px'
    },
    pageNumber: {
        position: 'absolute',
        bottom: '3',
        right: '3',
        padding: '15px',
        fontSize: '12'
    }
});

const TestPDF = (props) => {

    let i = 0;
    let currentDate = new Date();

    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
    let year = currentDate.getFullYear();
    year = year + "";
    let lastPage = 0;
    return(
            <Document onRender = {() => {LOADING  = false}}>
            <Page size = "A4" style = {styles.page}>
                <View style = {styles.headSection} fixed>
                    <Text>Faction: {props.faction === 'allies' ? 'Allies' : 'Axis'}</Text>
                    <Text>Points: {props.sidePoints}/{props.totalPoints}</Text>
                    <Text>Date: {month + ""}/{date + ""}/{year.substring(2) + ""}</Text>
                </View>
                <View style = {styles.pageNumber} fixed>
                    <Text render={({ pageNumber, totalPages }) => (
                                         `${pageNumber} / ${totalPages}`
                                         )} fixed />
                </View>
                <View style = {styles.section}>
                   {props.ships.map((ship, index) => {
                       if(index%6 == 0 && props.ships.length > index){
                           return (
                                <View>
                                    <Image style = {{height: '239px', width: '170px', padding: '10px'}} src={ship.image}/>

                                </View>
                           )
                       }
                       else{
                        return (
                            ship.image ?
                                <View>
                                    <Image style = {{height: '239px', width: '170px', padding: '10px'}} src={ship.image}/>
                                </View>
                                    
                            :
                            <View>
                            </View>
    
                           )
                       }
                       
                   })}

                </View>
            </Page>
        </Document>
        
    )
}
const PDFDownload = (props) => {
    const {alliesShips, axisShips, allShips, faction}  = props;
    let alliesArray = [];
    let axisArray = [];
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
    let shipsToSend = faction  == 'allies' ? alliesArray : axisArray;
    return(
        
            <PDFDownloadLink document = {<TestPDF sidePoints = {props.sidePoints} totalPoints = {props.totalPoints} ships = {shipsToSend} faction = {faction}/>} fileName = {faction + '.pdf'}>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <i className="fa fa-file-pdf-o"></i>)}
            </PDFDownloadLink>
        
    )
}

const mapStateToProps = state => ({
    alliesShips: state.shipsInPlay.allies,
    axisShips: state.shipsInPlay.axis,
    allShips: state.allShips,
})

export default connect(mapStateToProps, {})(PDFDownload)