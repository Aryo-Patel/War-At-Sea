import React from 'react';
import {Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    image: {
        width: "50%",
        padding: 10
      },
    section: {
        flexGrow: "1"
    }
});

export const TestPDF = () => {
    return (
        <Document>
            <Page size = "A4" style = {styles.page}>
                <View style = {styles.section}>
                    <Text>Hello World!</Text>
                </View>
                <View>
                    <Image style = {styles.image} src = "http://res.cloudinary.com/dd3ohuzsz/image/upload/v1596653612/qjpi12978vat1mclqpj9.jpg" />
                </View>
                <View style = {styles.section}>
                    <Text>We're inside a PDF</Text>
                </View>
            </Page>
        </Document>
    )
}

export const DownloadApp = () =>{
    return(
        <div>
            <PDFDownloadLink document = {<TestPDF />} fileName = 'pleaseWork.pdf'>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}

// default TestPDF;