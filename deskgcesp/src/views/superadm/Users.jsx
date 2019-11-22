import React from "react";
import { connect } from "react-redux";
import {getAllRoles,getAllUsers,changeRole} from "services/superadmService.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Modal,
  Table,
  Container,
  Row,
} from "reactstrap";
import {
  Typography
} from "@material-ui/core";
// core components
import Header from "components/Headers/Header.jsx";

class Users extends React.Component {
  state = {
    user: null,
    users: [],
    roles: [],
    modal: false,
    selectedItem: null
  }
  constructor(props){
    super(props);
    this.activeRoute.bind(this);
    // this.changeState.bind(this);
    // this.getTipos.bind(this);
    // this.getFile.bind(this);
  }
  
  activeRoute(routeName) {
  return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  onChange = (myState,value) => {
    this.setState({
      [myState]: value
    })
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentDidMount() {
    if(this.props.authState && this.props.authState.loggedIn) {
      this.onChange("user",this.props.authState.user.user.uid);
    }
    const responseUsers = getAllUsers();
    const responseRoles = getAllRoles();
    responseUsers.then((users) => {
      this.onChange("users",users);
    });
    responseRoles.then((roles) => {
      this.onChange("roles",roles);
    });
  };

  getName() {
    if(this.state.selectedItem) 
      return this.state.selectedItem;
    else
      return 'Papeis';
  }
    
  render() {
    const {users,roles} = this.state;
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
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Email</th>
                      <th scope="col">Papel</th>
                      <th scope="col"/>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users && users!==undefined &&
                      Object.keys(users).map((item,index) => {              
                      return (
                        <tr key={index}>
                          <td>    
                            {users[item].userName}
                          </td>
                          <td>    
                            {users[item].userEmail}
                          </td>
                          <td>    
                            {users[item].userRole}
                          </td>
                          <td>
                            <Button onClick={() => this.toggleModal("modal")}>
                              Alterar papel
                            </Button>
                            <Modal
                                  className="modal-dialog-centered"
                                  isOpen={this.state.modal}
                                  toggle={() => this.toggleModal("modal")}
                                >
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="modalLabel">
                                      Atenção!!
                                    </h5>
                                    <button
                                      aria-label="Close"
                                      className="close"
                                      data-dismiss="modal"
                                      type="button"
                                      onClick={() => this.toggleModal("modal")}
                                    >
                                      <span aria-hidden={true}>×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <Row>
                                      <Col>
                                        <Typography>Permissão atual: {users[item].userRole}</Typography>
                                      </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                      <Col>
                                        <Typography>Selecione a nova permissão: </Typography>
                                      </Col>
                                      <Col>
                                      <UncontrolledDropdown> 
                                        <DropdownToggle caret>
                                          {this.getName()}
                                        </DropdownToggle>
                                        <DropdownMenu > 
                                        {
                                          // POPULATE DROPDOWN
                                          roles && roles!==undefined &&
                                            Object.keys(roles).map((item,index) => {
                                              return (
                                              <DropdownItem key = {index} onClick = {() => {this.onChange("selectedItem",roles[item])}}> 
                                                {roles[item]} 
                                              </DropdownItem>
                                              );
                                            })
                                        } 
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="modal-footer">
                                    <Button
                                      color="secondary"
                                      data-dismiss="modal"
                                      type="button"
                                      onClick={() => {this.toggleModal("modal")}}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button color="primary" type="button" 
                                    onClick={() => {
                                      if(this.state.selectedItem) {
                                        changeRole(users[item].userId,this.state.selectedItem);
                                        this.toggleModal("modal")
                                      }
                                      else
                                        alert("Selecione uma permissão!");
                                      }}
                                      > 
                                      Confirmar
                                    </Button>
                                  </div>
                                </Modal>
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

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Users);
