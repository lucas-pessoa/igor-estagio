import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAreaTickets, deleteAreaTicket } from "services/ticketsService";
// reactstrap components
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
  Modal,
  Media,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import {
  Grid,
  Typography
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from '@brainhubeu/react-permissible';
import MultilineText from "components/MultilineText.jsx";

class AreaTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          deleteModal: false,
          areas: [],
          selectedItem: null,
          userPermissions: []
        };
        this.activeRoute.bind(this);
        this.onChange = this.onChange.bind(this);
    }
        // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    closeCollapse = () => {
        this.setState({
          collapseOpen: false
        });
    };

    toggleModal = state => {
      this.setState({
        [state]: !this.state[state]
      });
    };

    onChange = (myState,value) => {
      this.setState({
        [myState]: value
      });
    }

    componentDidMount() {
      console.log('porp',this.props.authState );
      if(this.props.authState && this.props.authState.permissions) {
        this.onChange("userPermissions",this.props.authState.permissions);
      }
      const response = getAllAreaTickets();
      response.then((arr) => {this.onChange('areas',arr)});
    };

    getLink() {
      if(this.state.selectedItem) {
        return {
          pathname: '/admin/add-area-ticket', state:{
          id: this.state.selectedItem.areaticket_cod,
          nome: this.state.selectedItem.areaticket_nome,
          descricao: this.state.selectedItem.areaticket_descricao
        }};
      }
      else
      return {
        pathname: '/admin/area-ticket'
      };
    }

    getName() {
      if(this.state.selectedItem) 
        return this.state.selectedItem.areaticket_nome;
      else
        return '';
    }
    
  render() {
    const { areas,userPermissions } = this.state; 
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
                  <Grid container spacing={3} justify="flex-start">
                    <Grid item>
                      <Typography>Área dos Tickets</Typography>
                    </Grid>
                    <PermissibleRender
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_AREAS']}
                    >
                      <Grid item>
                        <Link to="/admin/add-area-ticket">
                          <Button className="pull-right" color="primary" size="sm" type="button">
                              Adicionar novas áreas
                          </Button>
                        </Link>
                      </Grid>
                  </PermissibleRender>
                  </Grid>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome da área</th>
                      <th scope="col">Descrição</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                areas && areas!==undefined &&
                  Object.keys(areas).map((item,index) => {
                   return (
                      <tr key={index}>
                       <td> 
                          <Typography>{areas[item].areaticket_nome}</Typography>
                       </td>
                       <td>
                         <MultilineText text={areas[item].areaticket_descricao} />
                       </td>
                       <PermissibleRender
                        userPermissions={userPermissions ? userPermissions : []}
                        requiredPermissions={['CRUD_CURSO']}
                        renderOtherwise={<td></td>}
                       >
                         <td className="text-right">
                            <UncontrolledDropdown onClick={() => this.onChange('selectedItem',areas[item])}>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}> 
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" >
                              <Link  to={this.getLink()}>
                                <DropdownItem href="#pablo">
                                  Alterar
                                </DropdownItem>
                              </Link>
                              <DropdownItem
                                href="#pablo"
                                onClick={e => {this.toggleModal("deleteModal")}}
                              >
                                Excluir
                              </DropdownItem>
                              <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.deleteModal}
                                toggle={() => this.toggleModal("deleteModal")}
                              >
                                <div className="modal-header">
                                  <h5 className="modal-title" id="deleteModalLabel">
                                    Atenção!!
                                  </h5>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("deleteModal")}
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body"> Deseja confirmar exlusão da area {this.getName()}? </div>
                                <div className="modal-footer">
                                  <Button
                                    color="secondary"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => {this.toggleModal("deleteModal")}}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button color="primary" type="button" 
                                  onClick={() => {
                                    deleteAreaTicket(this.state.selectedItem.areaticket_cod);
                                    this.toggleModal("deleteModal")}}
                                    > 
                                    Confirmar
                                  </Button>
                                </div>
                              </Modal>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                       </PermissibleRender>
                       
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

const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps,
  {getAllAreaTickets}
  )(AreaTicket);
