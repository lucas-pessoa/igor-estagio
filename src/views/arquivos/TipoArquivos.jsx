import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTipoArquivo, deleteTipoArquivo } from "services/arquivosService";
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

class TipoArquivos extends React.Component {
    state = {
      deleteModal: false,
      tipos: [],
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
    }

    componentDidMount() {
      if(this.props.authState && this.props.authState.permissions) {
        this.onChange("userPermissions",this.props.authState.permissions);
      }
      const response = getAllTipoArquivo();
      response.then((arr) => {this.onChange("tipos",arr)});
    };

    getLink() {
      if(this.state.selectedItem) {
        return {
          pathname: '/admin/add-tipo-arquivo', state:{
          id: this.state.selectedItem.tipoarquivo_cod,
          nome: this.state.selectedItem.tipoarquivo_nome,
          descricao: this.state.selectedItem.tipoarquivo_descricao
        }};
      }
      else
      return {
        pathname: '/admin/tipo-arquivo'
      };
    }

    getName() {
      if(this.state.selectedItem) 
        return this.state.selectedItem.tipoarquivo_nome;
      else
        return '';
    }

    
  render() {
    const { tipos,userPermissions } = this.state;
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
                      <Typography>Tipos de Arquivo</Typography>
                    </Grid>
                    <PermissibleRender
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_AREAS']}
                    >
                      <Grid item>
                      <Link to="/admin/add-tipo-arquivo">
                        <Button className="pull-right" color="primary" size="sm" type="button">
                            Adicionar novos tipos
                        </Button>
                      </Link>
                      </Grid>
                  </PermissibleRender>
                  </Grid>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                tipos && tipos!==undefined &&
                Object.keys(tipos).map((item,index) => {
                   return (
                      <tr key={index}>
                        <td> 
                           <Typography>{tipos[item].tipoarquivo_nome}</Typography>
                        </td>
                        <td>
                          <MultilineText text={tipos[item].tipoarquivo_descricao} />
                        </td>
                        <PermissibleRender
                          userPermissions={userPermissions ? userPermissions : []}
                          requiredPermissions={['CRUD_AREAS']}
                          renderOtherwise={<td></td>}
                        >
                          <td className="text-right">
                            <UncontrolledDropdown onClick={() => this.onChange('selectedItem',tipos[item])}>
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
                                  <div className="modal-body">Deseja confirmar exlusão do tipo {this.getName()}?</div>
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
                                      deleteTipoArquivo(this.state.selectedItem.tipoarquivo_cod);
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
export default connect(mapStateToProps)(TipoArquivos);
