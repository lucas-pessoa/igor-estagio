import React from "react";
import { connect } from "react-redux";
import { responderDoc, downloadAtaDoc } from "../../services/docEleitoralService";
import { saveAs } from 'file-saver';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  Row
} from "reactstrap";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  TextField
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";

class ResponderDocumentoEleitoral extends React.Component {
    state = {
      doc: null,
      comentario: "",
      aprovado: false
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
    }
        // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      if(this.props.location.state && this.props.location.state.doc)
        this.onChange("doc",this.props.location.state.doc);
    };

    getData() {
      return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    }
    
  render() {
    const {doc} = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                <CardBody className="px-lg-5 py-lg-5">
                {
                  doc && doc!== null &&
                  (
                  <div>
                  <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography >Informações iniciais</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                    <Row>
                      <Col>
                        <Typography>Capítulo {doc.capitulo.cap_nome} n° {doc.capitulo.cap_numero}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Cidade: {doc.capitulo.cap_cidade}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography >Data do envio: {doc.doc_dataEnvio}</Typography>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col>
                        <Typography variant="h6">Informações do Mestre Conselheiro:</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Nome: {doc.doc_nomeMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>CPF: {doc.doc_cpfMC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Email: {doc.doc_emailMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>Telefone: {doc.doc_telefoneMC}</Typography>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col>
                        <Typography variant="h6">Informações do Presidente do Conselho Consultivo:</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Nome: {doc.doc_nomePCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>CPF: {doc.doc_cpfPCC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Email: {doc.doc_emailPCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>Telefone: {doc.doc_telefonePCC}</Typography>
                      </Col>
                    </Row>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography >Atividades capitulares</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {/* VERIFICAR SE É PRIMEIRO OU SEGUNDO SEMESTRE */}
                  <div>
                      <Row>
                      <Col>
                        <Typography>Datas das atividades obrigatórias da gestão:</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Instalação: {doc.atividades.dataInstalacao}</Typography>
                      </Col>
                      <Col>
                        <Typography>Iniciação: {doc.atividades.dataIniciacao}</Typography>
                      </Col>
                      <Col>
                        <Typography>Elevação: {doc.atividades.dataElevacao}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Dia dos Pais: {doc.atividades.dataDiaPais}</Typography>
                      </Col>
                      <Col>
                        <Typography>Dia do Patriota: {doc.atividades.dataDiaPatriota}</Typography>
                      </Col>
                      <Col>
                        <Typography>Dia Educacional: {doc.atividades.dataDiaEducacional}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Dia do Meu Governo: {doc.atividades.dataDiaGoverno}</Typography>
                      </Col>
                      <Col>
                        <Typography>Dia DeMolay de Conforto: {doc.atividades.dataDiaConforto}</Typography>
                      </Col>
                      <Col>
                        <Typography>Dia em Memória a Frank S. Land: {doc.atividades.dataDiaMemoriaFSL}</Typography>
                      </Col>
                    </Row>
                  </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography >Informações finais</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                    <Row>
                      <Col>
                        <Typography>Baixar ata de eleição:</Typography>
                      </Col>
                      <Col>
                        <Button
                          className="my-4"
                          color="primary"   
                          type="button"
                          onClick={() => {
                            const fileResponse = downloadAtaDoc(doc.doc_cod);
                            fileResponse.then((file) => {
                                saveAs(file,'ata_' + doc.doc_cap);
                            })
                          }}
                        >
                          Download
                        </Button>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>
                        <Typography>IDs dos Conselheiros:</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>MC: {doc.doc_idMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>1C: {doc.doc_id1C}</Typography>
                      </Col>
                      <Col>
                        <Typography>2C: {doc.doc_id2C}</Typography>
                      </Col>
                    </Row>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <br></br>
                <br></br>
                <Row>
                <Col>
                  <Typography>Observação sobre o Documento Eleitoral:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                <TextField
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows="4"
                  rowsMax="6"
                  value={this.state.comentario}
                  onChange={e => this.onChange("comentario", e.target.value)}
                  fullWidth={true}
                />
                </Col>
                </Row>
                <Row>
                <Col>
                  <Typography>Selecione se o Documento está aprovado ou não:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                <FormControl component="fieldset">
                  <RadioGroup defaultValue="false" row  onChange={e => this.onChange("aprovado",e.target.value)}> 
                    <FormControlLabel value="true" control={<Radio />} label="Aprovado" />
                    <FormControlLabel value="false" control={<Radio />} label="Reprovado" />
                  </RadioGroup>
                </FormControl>
                </Col>
                </Row>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"   
                    type="button"
                    onClick={() => 
                      responderDoc(doc.doc_cod,
                                  this.state.comentario,
                                  this.state.aprovado ? 'Aprovado' : 'Reprovado',
                                  this.getData()
                      )}
                  >
                    Enviar resposta
                  </Button>
                </div>
                </div>

                  )
                }
                
                </CardBody>
                </CardHeader>
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
export default connect(mapStateToProps)(ResponderDocumentoEleitoral);
