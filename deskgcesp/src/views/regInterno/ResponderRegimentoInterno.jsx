import React from "react";
import { connect } from "react-redux";
import { responderReg, downloadRegInterno } from "services/regInternoService";
import { saveAs } from 'file-saver';
import {
  Card,
  CardBody,
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
import MultilineText from "components/MultilineText.jsx";

class ResponderRegimentoInterno extends React.Component {
    state = {
        reg: null,
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
        console.log("props",this.props);
        if(this.props.location.state && this.props.location.state.reg)
            this.onChange("reg",this.props.location.state.reg)
    };

    getData() {
      return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    }

  render() {
    const {reg} = this.state;
    return (
        <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardBody className="px-lg-5 py-lg-5">
                {
                  reg && reg!== null &&
                  (
                  <div>
                  <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Typography >Informações básicas</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                    <Row>
                      <Col>
                        <Typography>Capítulo {reg.capitulo.cap_nome} n° {reg.capitulo.cap_numero}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Cidade: {reg.capitulo.cap_cidade}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography >Data do envio: {reg.reg_dataEnvio}</Typography>
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
                        <Typography>Nome: {reg.reg_nomeMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>CPF: {reg.reg_cpfMC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Email: {reg.reg_emailMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>Telefone: {reg.reg_telefoneMC}</Typography>
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
                        <Typography>Nome: {reg.reg_nomePCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>CPF: {reg.reg_cpfPCC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>Email: {reg.reg_emailPCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>Telefone: {reg.reg_telefonePCC}</Typography>
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
                    <Typography>Informações adicionar e Regimento</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                    <Row>
                      <Col>
                        <Typography>Baixar Regimento Interno:</Typography>
                      </Col>
                      <Col>
                        <Button
                          className="my-4"
                          color="primary"   
                          type="button"
                          onClick={() => {
                            const fileResponse = downloadRegInterno(reg.reg_cod);
                            fileResponse.then((file) => {
                              saveAs(file,'regimento_' + reg.reg_cap);
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
                        <Typography>MC: {reg.reg_idMC}</Typography>
                      </Col>
                      <Col>
                        <Typography>1C: {reg.reg_id1C}</Typography>
                      </Col>
                      <Col>
                        <Typography>2C: {reg.reg_id2C}</Typography>
                      </Col>
                    </Row>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <br></br>
                <br></br>
                <Row>
                <Col>
                  <Typography>Observação sobre o Regimento:</Typography>
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
                  <Typography>Selecione se o Regimento está aprovado ou não:</Typography>
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
                      responderReg(reg.reg_cod,
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
export default connect(mapStateToProps)(ResponderRegimentoInterno);
