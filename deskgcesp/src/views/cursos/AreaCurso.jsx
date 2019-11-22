import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {getAllAreaCursos,deleteAreaCurso} from "services/cursosService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
  Grid,
  Typography
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from '@brainhubeu/react-permissible';

class AreaCurso extends React.Component {
    state = {
      deleteModal: false,
      areas: [],
      selectedItem: null,
      userPermissions: []
    };

    constructor(props) {
      super(props);
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

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }; 

    componentDidMount() {
      if(this.props.authState && this.props.authState.permissions) {
        this.onChange("userPermissions",this.props.authState.permissions);
      }
      const response = getAllAreaCursos();
      response.then((arr) => {this.onChange('areas',arr)});
    };

    getLink() {
      if(this.state.selectedItem) {
        return {
          pathname: '/admin/add-area-cursos', state:{
            id: this.state.selectedItem.areacurso_cod,
            nome: this.state.selectedItem.areacurso_nome,
            descricao: this.state.selectedItem.areacurso_descricao
        }};
      }
      else
      return {
        pathname: '/admin/area-cursos'
      };
    }

    getName() {
      if(this.state.selectedItem) 
        return this.state.selectedItem.areacurso_nome;
      else
        return '';
    }

    
  render() {
    const { areas, userPermissions } = this.state;    
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
                      <Typography>Área dos Cursos</Typography>
                    </Grid>
                    <PermissibleRender
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_AREAS']}
                    >
                      <Grid item>
                        <Link to="/admin/add-area-cursos">
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
                             {areas[item].areacurso_nome}
                         </td>
                         <td>
                           {areas[item].areacurso_descricao}
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
                                onClick={e => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <Link  to={this.getLink()} >
                                    <DropdownItem
                                      href="#pablo">
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
                                  <div className="modal-body">Deseja confirmar exlusão da area {this.getName()}?</div>
                                  <div className="modal-footer">
                                    <Button
                                      color="secondary"
                                      data-dismiss="modal"
                                      type="button"
                                      onClick={() => this.toggleModal("deleteModal")}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button color="primary" type="button" 
                                    onClick={() => {
                                      deleteAreaCurso(this.state.selectedItem.areacurso_cod);
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
export default connect(mapStateToProps)(AreaCurso);