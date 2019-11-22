import React from "react";
import { Link } from "react-router-dom";
import { getAllTickets,getAllAreaTickets } from "services/ticketsService"
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavItem,
  NavLink,
  Pagination,
  Modal,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  UncontrolledCollapse
} from "reactstrap";
import Header from "components/Headers/Header.jsx";
import {PermissibleRender} from "@brainhubeu/react-permissible";

class Tickets extends React.Component {
  state={
    tickets: [],
    areas: [],
    userPermissions: []
  }
  constructor(props) {
      super(props);
      this.activeRoute.bind(this);
      this.onChange.bind(this);
  }
      // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  onChange(myState,val){
    this.setState({
      [myState]: val
    });
  }
  
  componentDidMount() {
    if(this.props.authState && this.props.authState.permissions) {
      this.changeState("userPermissions",this.props.authState.permissions);
    }
    
    const responseT = getAllTickets();
    const responseA = getAllAreaTickets();
    responseT.then(tickets => {
      if(tickets)
        this.onChange("tickets",tickets);
    });
    responseA.then(areas => {
      if(areas)
        this.onChange("areas",areas);
    });
  }
  render() {
    const {tickets,areas} = this.state;
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
                    <span className="pull-right">Tickets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/admin/area-ticket">
                            <Button className="pull-right" color="primary" size="sm" type="button">
                                Visualizar Áreas do ticket
                            </Button>
                        </Link>
                    </span>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Assunto</th>
                      <th scope="col">Área</th>
                      <th scope="col">Data Abertura</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tickets && tickets!==undefined &&
                      Object.keys(tickets).map((item,index) => {
                        if(areas) {
                          Object.keys(areas).map((item2) => {
                            //console.log("tipo:",index,tipos[item]);
                            if(tickets[item].areaticket_cod === areas[item2].areaticket_cod) {
                              tickets[item].areaticket_nome = areas[item2].areaticket_nome;
                            }
                          });
                        }
                         return (
                          <tr key={index} id="rowCurso">
                            <td>
                              {tickets[item].ticket_assunto}
                            </td>
                            <td>
                              {tickets[item].areaticket_nome}
                            </td>
                            <td>
                              {tickets[item].ticket_dataAbertura}
                            </td>
                            <td>
                              {tickets[item].ticket_status}
                            </td>
                            <td className="text-right">
                            <Link  
                              to={{
                                  pathname:'/admin/ver-ticket', state:{
                                    ticket: tickets[item],
                                    path: "/admin/tickets"
                                }}}
                              >
                                <Button color="primary" type="button"
                                  > 
                                  Visualizar 
                                </Button>
                              </Link>
                                {/*o que pensei: ele vai pra tela de visualzar, vai ter todo o historico de respostas, se tiver aberto ele vai conseguir responder (ver de apertar botao e aparecer                                                                                                                                                                                                                                                                                                                                                                                                              form?)*/ }
                            </td>
                          </tr>
                         );
                    })
                  }
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tickets;
