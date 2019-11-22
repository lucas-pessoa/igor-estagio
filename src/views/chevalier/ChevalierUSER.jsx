import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getIndicacoesByUser,downloadFicha,deleteIndicacao} from "services/chevalierService";
import { saveAs } from 'file-saver';
import {
  Button,
  Col,
  Card,
  CardBody,
  Container,
  Row,
} from "reactstrap";
import {
  Divider,
  ExpansionPanelActions,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";

class ChevalierUSER extends React.Component {
    state = {
        indicacoes: null,
        user: null
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderData = this.renderData.bind(this);
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
      if(this.props.authState && this.props.authState.loggedIn) {
        this.onChange("user",this.props.authState.user.user.uid);
        const response = getIndicacoesByUser(this.props.authState.user.user.uid);
        response.then(indicacoes => {
          if(indicacoes)
            this.onChange("indicacoes",indicacoes);
        })
        .catch(error => { //nao tem tickets com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {indicacoes} = this.state;
      if(indicacoes === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhuma indicação enviada!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            indicacoes &&
            Object.keys(indicacoes).map((item,index) => {
              console.log(index,indicacoes[item]);
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <div>
                    <Row>
                      <Col>
                        <Typography>Nome: {indicacoes[item].indic_nomeIndicado}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Typography>Capítulo: {indicacoes[item].capitulo.cap_nome}</Typography>
                      </Col>
                      <Col>
                        <Typography>Status: {indicacoes[item].indic_status}</Typography>
                      </Col>
                    </Row>
                  </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <div>
                    <Row>
                      <Col>
                        <Typography>Enviado em: {indicacoes[item].indic_dataEnvio}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography>ID DeMolay do indicado: {indicacoes[item].indic_idIndicado}</Typography>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col>
                        <Typography>Informações sobre o Presidente do Conselho:</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Typography>Nome: {indicacoes[item].indic_nomePCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>CPF: {indicacoes[item].indic_cpfPCC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Typography>Email: {indicacoes[item].indic_emailPCC}</Typography>
                      </Col>
                      <Col>
                        <Typography>Telefone: {indicacoes[item].indic_telefonePCC}</Typography>
                      </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Button 
                          outline
                          className="my-4"
                          color="primary"   
                          type="button"
                          onClick={() => {
                            const fileResponse = downloadFicha(indicacoes[item].indic_cod);
                            fileResponse.then((file) => {
                                saveAs(file,'ficha_' + indicacoes[item].indic_nomeIndicado);
                            })
                          }}
                        >
                          Baixar ficha
                        </Button>
                    </Col>
                    </Row>
                    {
                      // tickets[item].ticket_status === 'Fechado' &&
                      // <Row>
                      //   <Col>
                      //     <Typography>Fechado em: {}</Typography>
                      //   </Col>
                      // </Row>
                    }
                  </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  {
                    indicacoes[item].indic_status === 'Enviado' &&
                    <ExpansionPanelActions>
                      <Button size="small" color="primary"
                        onClick={() => {
                          deleteIndicacao(indicacoes[item].indic_cod);
                        }}>
                        Deletar indicação
                      </Button>
                    </ExpansionPanelActions>
                }
                </ExpansionPanel>
                
              );
                
            })
          }
          </div>
        );
      }
    }
    
  render() {
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
                {this.renderData()}
                <div className="text-center">
                  <Link to="/admin/indicarChevalier">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      
                    >
                      Indicar membro
                    </Button>
                  </Link>
                </div>
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
export default connect(mapStateToProps)(ChevalierUSER);
