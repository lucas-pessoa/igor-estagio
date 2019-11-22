import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getTicketsByUser} from "services/ticketsService";
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

class TicketsUSER extends React.Component {
    state = {
        tickets: null,
        user: "",
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
        const response = getTicketsByUser(this.props.authState.user.user.uid);
        response.then(tickets => {
          if(tickets)
            this.onChange("tickets",tickets);
        })
        .catch(error => { //nao tem tickets com esse usuario
          return 
        })
      }
    };

    renderData() {
      const {tickets} = this.state;
      if(tickets === null) {
        return (
          <div>
            <Row>
              <Typography>Nenhum ticket enviado!</Typography>
            </Row>
          </div>
        );
      }
      else {
        return (
          <div>
          {
            tickets &&
            Object.keys(tickets).map((item,index) => {
              return (
                  <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Row>
                      <Col>
                        <Typography>Status: {tickets[item].ticket_status}</Typography>
                      </Col>
                      <Col>
                        <Typography>Assunto: {tickets[item].ticket_assunto}</Typography>
                      </Col>
                    </Row>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <div>
                    <Row>
                      <Col>
                        <Typography>Enviado em: {tickets[item].ticket_dataAbertura}</Typography>
                      </Col>
                    </Row>
                    {
                      tickets[item].ticket_status === 'Fechado' &&
                      <Row>
                        <Col>
                          <Typography>Fechado em: {tickets[item].fechamento.fechamento_data}</Typography>
                        </Col>
                      </Row>
                    }
                    <Row>
                      <Col>
                        <Typography></Typography>
                      </Col>
                    </Row>
                  </div>
                  </ExpansionPanelDetails>
                  <Divider />
                  <ExpansionPanelActions>
                  <Link to={{
                            pathname:'/admin/ver-ticket', state:{
                              ticket: tickets[item],
                              path: "/admin/ticketsUSER"
                          }}}>
                    <Button size="small" color="primary"
                      onClick={() => {
                        //deletetickets(ticket.tickets_cod);
                      }}>
                      Visualizar detalhes
                    </Button>
                  </Link>
                  </ExpansionPanelActions>
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
                  <Link to="/admin/abrir-ticket">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      
                    >
                      Abrir novo ticket
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
export default connect(mapStateToProps)(TicketsUSER);
