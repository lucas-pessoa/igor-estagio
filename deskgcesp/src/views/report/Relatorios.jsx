import React from "react";
import { connect } from "react-redux";
import { getAllCapitulos } from "services/superadmService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "utility/ReportSaver.js";
import { 
  getTopicosArea,
  getDocsEleCapitulo,
  getRegsIntCapitulo,
  getIndicacoes,
  getIndicacoesByCap,
  getDownloads
} from "services/reportService";
import {
  Container,
  CardHeader,
  Button,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row
} from "reactstrap";
import {
  Button as ButtonIcon,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";
import PrintIcon from '@material-ui/icons/Print';
import Header from "components/Headers/Header.jsx";

const reports = [
  {
    value: 'topicoArea',
    label: 'Tópicos criados por área',
    columns: ['Nome da área','Quantidade de tópicos']
  },
  {
    value: 'ticketArea',
    label: 'Tickets enviados por área',
    columns: []
  },
  {
    value: 'docEleitoralCap',
    label: 'Documento Eleitoral por capítulo',
    columns: ['Capítulo','Cidade','Documentos enviados']
  },
  {
    value: 'regInternoCap',
    label: 'Regimento Interno por capítulo',
    columns: ['Capítulo','Cidade','Regimentos enviados','Aprovado']
  },
  {
    value: 'chevalierCap',
    label: 'Chaveliers Indicados',
    columns: ['Nome indicado', 'Capítulo', 'Data envio', 'Status'],
    dropdownCap: true
  },
  {
    value: 'downloads',
    label: 'Arquivos baixados',
    columns: ['Nome','Quantidade de downloads']
  }
  // {
  //   value: 'curso',
  //   label: 'Inscritos em cursos'
  // }
]

class Relatorios extends React.Component {
  state = {
    selectedReport: null,
    searchedReport: null,
    filter: "",
    capitulos: [],
    selectedCap: null,
    disabledDropdown: true,
    disabledOrdering: true,
    disabledFilter: true,
    tableData: null
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.getTableHeaders = this.getTableHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
    //this.getData = this.getData.bind(this);
  }

  onChange = (myState, obj) => {
    this.setState({
      [myState]: obj
    });
  }

  componentDidMount() {
    const responseCap = getAllCapitulos();
    responseCap.then(caps => {
      if (caps)
        this.onChange('capitulos', caps);
    });
  };

  // getData() {
  //   return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear() + ' às ' + new Date().getHours() + ':' + new Date().getMinutes();
  // }

  search() {
    const { selectedReport } = this.state;
    if (selectedReport === null) {
      alert('Selecione um relatório!');
      return null;
    }
    switch (selectedReport.value) {
      case 'topicoArea':
        const responseTopico = getTopicosArea();
        responseTopico.then(topicos => {
          this.setState({
            searchedReport: selectedReport,
            tableData: topicos
          })
        })
        break;
      case 'ticketArea':
        break;
      case 'docEleitoralCap':
        const responseDoc = getDocsEleCapitulo();
        responseDoc.then(docs => {
          this.setState({
            searchedReport: selectedReport,
            tableData: docs
          })
        })
        break;
      case 'regInternoCap':
        const responseReg = getRegsIntCapitulo();
        responseReg.then(regs => {
          this.setState({
            searchedReport: selectedReport,
            tableData: regs
          })
        })
        break;
      case 'chevalierCap':
        if(this.state.selectedCap===null) {
          const responseChev = getIndicacoes();
          responseChev.then(indics => {
            this.setState({
              searchedReport: selectedReport,
              tableData: indics
            })
          })
        } 
        else {
          const responseChevCap = getIndicacoesByCap(this.state.selectedCap.cap_cod);
          responseChevCap.then(indics => {
            this.setState({
              searchedReport: selectedReport,
              tableData: indics
            })
          })
          .catch(function(error){
            this.setState({
              searchedReport: selectedReport,
              tableData: null
            })
          })
        } 
        break;

      case 'downloads':
        const responseDownloads = getDownloads();
        responseDownloads.then(downs => {
          this.setState({
            searchedReport: selectedReport,
            tableData: downs
          })
        })
        break;
    }
  }

  getTableHeaders() {
    const { searchedReport } = this.state;
    console.log('procurs',searchedReport);
    if (searchedReport === null)
      return null;

    switch(searchedReport.value) {
      case 'topicoArea':
          return (
            <tr>
              <th scope="col">Nome da área</th>
              <th scope="col">Quantidade de tópicos</th>
            </tr>
          );
      case 'ticketArea':
        break;
      case 'docEleitoralCap':
          return (
            <tr>
              <th scope="col">Capítulo</th>
              <th scope="col">Cidade</th>
              <th scope="col">Documentos enviados</th>
            </tr>
          );
      case 'regInternoCap':
          return (
            <tr>
              <th scope="col">Capítulo</th>
              <th scope="col">Cidade</th>
              <th scope="col">Regimentos enviados</th>
              <th scope="col">Aprovado</th>
            </tr>
          );
      case 'chevalierCap':
        return (
          <tr>
            <th scope="col">Nome indicado</th>
            <th scope="col">Capítulo</th>
            <th scope="col">Data envio</th>
            <th scope="col">Status</th>
          </tr>
        );

      case 'downloads':
        return (
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Quantidade de downloads</th>
          </tr>
        )

    }
    
  }

  getTableRows(dataRow,index) {
    const {searchedReport} = this.state;
    switch(searchedReport.value) {
      case 'topicoArea':
            console.log('row',dataRow);
            return (
              <tr key={index}>
                <td>
                  {dataRow.area.areaforum_nome}
                </td>
                <td>
                  {dataRow.qntdTopicos}
                </td>
              </tr>
            );
      case 'ticketArea':
        break;
      case 'docEleitoralCap':
          return (
            <tr key={index}>
              <td>
                {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
              </td>
              <td>
                {dataRow.capitulo.cap_cidade}
              </td>
              <td>
                {dataRow.docsEnviados}
              </td>
            </tr>
          );
      case 'regInternoCap':
        console.log('row',dataRow);
          return (
            <tr key={index}>
              <td>
                {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
              </td>
              <td>
                {dataRow.capitulo.cap_cidade}
              </td>
              <td>
                {dataRow.regEnviados}
              </td>
              <td>
              { 
                (dataRow.regEnviados > 0) ? (dataRow.regAprovado) ? 'Sim' : 'Não' : '-'
              }
              </td>
            </tr>
          );
      case 'chevalierCap':
        return (
          <tr key={index}>
            <td>
              {dataRow.nome}
            </td>
            <td>
            {dataRow.capitulo.cap_nome} n° {dataRow.capitulo.cap_numero}
            </td>
            <td>
              {dataRow.dataEnvio}
            </td>
            <td>
            { dataRow.status }
            </td>
          </tr>
       );

      case 'downloads': 
        return (
          <tr key={index}>
            <td>
              {dataRow.nome}
            </td>
            <td>
              {dataRow.downloaded}
            </td>
          </tr>
        )
    }
  }

  render() {
    const { capitulos, disabledDropdown, disabledFilter, searchedReport,tableData } = this.state;
    console.log('datatable',tableData);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Grid container spacing={3} alignContent="center" alignItems="center">
                    <Grid item>
                      <Typography>Escolha o tipo de relatório: </Typography>
                    </Grid>
                    <Grid item>
                      <UncontrolledDropdown>
                        <DropdownToggle caret>
                          {this.state.selectedReport ? this.state.selectedReport.label : "Relatório"}
                        </DropdownToggle>
                        <DropdownMenu >
                          {
                            reports.map((option, index) => {
                              console.log('opttt',option);
                              return (
                                <DropdownItem key={index} onClick={() => {
                                  this.onChange("selectedReport", option);
                                  if(this.state.selectedCap!==null)
                                    this.onChange("selectedCap",null);
                                  if(option.dropdownCap) 
                                    this.onChange('disabledDropdown',false);
                                  else if(this.state.disabledDropdown === false)
                                    this.onChange('disabledDropdown',true);
                                  
                                }}>
                                  {option.label}
                                </DropdownItem>
                              );
                            })

                          }
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Grid>
                    <Grid item>
                      <Typography>Capítulo:</Typography>
                    </Grid>
                    <Grid item>
                      <UncontrolledDropdown>
                        <DropdownToggle caret disabled={disabledDropdown}>
                          {this.state.selectedCap ? this.state.selectedCap.cap_nome + ' n° ' + this.state.selectedCap.cap_numero : 'Capítulo'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {
                            capitulos && capitulos !== null &&
                            Object.keys(capitulos).map((item, index) => {
                              return (
                                <DropdownItem key={index} onClick={() => { this.onChange("selectedCap", capitulos[item]) }}>
                                  {capitulos[item].cap_nome} n° {capitulos[item].cap_numero}
                                </DropdownItem>
                              );
                            })
                          }
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Grid>
                    <Grid item>
                      <Typography>Ordenar por:</Typography>
                    </Grid>
                    {/* <Grid item>
                      <UncontrolledDropdown>  
                        <DropdownToggle caret disabled={disabledDropdown}>
                            {}
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                              disabledOrdering === true && 
                              Object.keys(capitulos).map((item, index) => {
                                  return (
                                  <DropdownItem key={index} onClick={() => { this.onChange("selectedCap", capitulos[item]) }}>
                                      {capitulos[item].cap_nome} n° {capitulos[item].cap_numero}
                                  </DropdownItem>
                                  );
                              })
                            }
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Grid> */}
                    <Grid item>
                      <Typography>Filtro: </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        disabled={disabledFilter}
                        variant="outlined"
                        value={this.state.filter}
                        onChange={e => this.onChange("filter", e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => {
                          this.search();
                        }}
                      >
                        Buscar
                      </Button>
                    </Grid>
                    {
                      this.state.searchedReport!==null &&
                      <Grid item>
                        <ButtonIcon
                          variant="contained"
                          color="secondary"
                          startIcon={<PrintIcon/>}
                        >
                        <PDFDownloadLink
                          document={<PdfDocument data={tableData} report={searchedReport} />}
                          fileName="relatorio.pdf"  
                          style={{
                            color: "white",
                          }}
                        >
                          {({ blob, url, loading, error }) => 
                             loading ? "Carregando documento..." : "Gerar arquivo PDF"
                          }
                        </PDFDownloadLink>
                        </ButtonIcon>
                      </Grid>
                    }
                  </Grid>
                  <Divider />
                </CardHeader>
                  {
                    searchedReport!== null &&
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                      {/* {this.getTableHeaders()} */}
                      <tr>
                      {
                        searchedReport.columns.map(item => {
                          return (
                            <th scope="col">{item}</th>
                          )
                        })
                      }
                      </tr>
                      </thead>
                      <tbody>
                      {
                        tableData!==null && 
                        Object.keys(tableData).map((item,index) => {
                          return this.getTableRows(tableData[item],index);
                        })
                      }
                      </tbody>
                    </Table>  
                  }
                <br/><br/><br/><br/><br/><br/><br/>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps)(Relatorios);
