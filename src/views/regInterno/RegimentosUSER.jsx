import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getRegByUser,deleteReg} from "services/regInternoService";
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
import MultilineText from "components/MultilineText.jsx";

class RegimentosUSER extends React.Component {
    state = {
        reg: null,
        user: "",
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderData = this.renderData.bind(this);
        this.getInfos = this.getInfos.bind(this);
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
        const response = getRegByUser(this.props.authState.user.user.uid);
        response.then(reg => {
          if(reg)
            this.onChange("reg",reg);
        })
        .catch(error => { //nao tem reg com esse usuario
          return 
        })
      }
    };
    getInfos(reg) {
      if(reg.reg_status === 'Enviado') {
        return (
          <div>
            <ExpansionPanelDetails>
            <div>
              <Row>
                <Col>
                  <Typography>Nome do MC: {reg.reg_nomeMC}</Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography>Nome do PCC: {reg.reg_nomePCC}</Typography>
                </Col>
              </Row>
            </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" color="primary"
              onClick={() => {
                deleteReg(reg.reg_cod);
              }}>
                Deletar
              </Button>
            </ExpansionPanelActions>
            </div>
        );
      }
      else { //aprovado ou reprovado
        return (
          <div>
            <ExpansionPanelDetails>
            <div>
              <Row>
                <Col>
                  <Typography>Data da resposta: {reg.resposta.resp_data}</Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <MultilineText text={'Observação: ' + reg.resposta.resp_comentario} />
                </Col>
              </Row>
            </div>
            </ExpansionPanelDetails>
            </div>
        )

      }
    }

    renderData() {
      const {reg} = this.state;
      if(reg === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhum regimento enviado!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            reg &&
            Object.keys(reg).map((item,index) => {
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Row>
                      <Col>
                        <Typography>Enviado em: {reg[item].reg_dataEnvio}</Typography>
                      </Col>
                      <Col>
                        <Typography>Status: {reg[item].reg_status}</Typography>
                      </Col>
                    </Row>
                  </ExpansionPanelSummary>
                  {this.getInfos(reg[item])}
                  
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
                  <Link to="/admin/enviar-regInterno">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                    >
                      Enviar novo regimento
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
export default connect(mapStateToProps)(RegimentosUSER);
