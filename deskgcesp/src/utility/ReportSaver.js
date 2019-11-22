import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import logoHeader from "assets/img/gcesp/header.png";
import {
    Table,
    TableHeader,
    TableBody,
    DataTableCell,
    TableCell
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    header: {
        display: 'row',
        alignContent: "center",
        padding: 10,
        textAlign: "center",
    },
    imageHeader: {
        padding: 15,
        height: 330,
        width: 1395,
    },
    reportTitle: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 800
    },
    // tableHeader: {
    //     fonsize: 16
    // },
    // tableRow: {
    //     fontFamily: 'Times-Roman',
    //     fontSize: 14
    // }
})

function getTableCells(report,data) {
    console.log('report',report,'data',data);
    switch(report.value) {
        case 'topicoArea':
            return (
              <TableBody key={index}>
                <DataTableCell 
                  {data.area.areaforum_nome}
                />
                <DataTableCell 
                  {data.qntdTopicos}
                />
              </TableBody>
            );
      case 'ticketArea':
        break;
      case 'docEleitoralCap':
          return (
            <TableBody key={index}>
              <DataTableCell 
                {data.capitulo.cap_nome} n° {data.capitulo.cap_numero}
              />
              <DataTableCell 
                {data.capitulo.cap_cidade}
              />
              <DataTableCell 
                {data.docsEnviados}
              />
            </TableBody>
          );
      case 'regInternoCap':
          return (
            <TableBody key={index}>
              <DataTableCell 
                {data.capitulo.cap_nome} {data.capitulo.cap_numero}
              />
              <DataTableCell 
                {data.capitulo.cap_cidade}
              />
              <DataTableCell 
                {data.regEnviados}
              />
              <DataTableCell 
              { 
                (data.regEnviados > 0) ? (data.regAprovado) ? 'Sim' : 'Não' : '-'
              }
              />
            </TableBody>
          );
      case 'chevalierCap':
        return (
          <TableBody key={index}>
            <DataTableCell 
              {data.nome}
            />
            <DataTableCell 
            {data.capitulo.cap_nome} n° {data.capitulo.cap_numero}
            />
            <DataTableCell 
              {data.dataEnvio}
            />
            <DataTableCell 
            { data.status }
            />
          </TableBody>
       );

      case 'downloads': 
        return (
          <TableBody key={index}>
            <DataTableCell 
              {data.nome}
            />
            <DataTableCell 
              {data.downloaded}
            />
          </TableBody>
        )
    }
}

export function PdfDocument(props) { 
    console.log('data',props.data);
    return (
        <Document>
            <Page size="A4">
                <View style={styles.header}>
                    <Image
                        source={logoHeader}
                        fixed
                    />
                    <Text style={styles.reportTitle}>
                        Relatório de {props.report.label}
                    </Text>
                </View>
                <Table data={props.data}>
                    <TableHeader>
                    {
                        props.report && props.report.columns &&
                        props.report.columns.map(item => {
                            return (
                                <TableCell>{item}</TableCell>
                            );
                        })
                    }
                    </TableHeader>
                        {/* <DataTableCell getContent={(r) => r.name}/>
                        <DataTableCell getContent={(r) => r.phone}/> */}
                    {
                        getTableBody(props.report,props.data)
                    }
                </Table>
            </Page>
        </Document>
    );  
}
