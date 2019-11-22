import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {getAllArquivos,getAllTipoArquivo,downloadArquivo,deleteArquivo,mudarVisibilidade} from "services/arquivosService";
import { saveAs } from 'file-saver';
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
// core components
import {
  Typography,
  Grid
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import {PermissibleRender} from "@brainhubeu/react-permissible";

class Arquivos extends React.Component {
  state = {
    user: null,
    arquivos: [],
    tipos: [],
    deleteModal: false,
    selectedItem: null,
    userPermissions: []
  }
  constructor(props){
    super(props);
    this.activeRoute.bind(this);
    this.changeState.bind(this);
    this.getTipos.bind(this);
    this.getFile.bind(this);
  }
  
  activeRoute(routeName) {
  return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  closeCollapse = () => {
      this.setState({
        collapseOpen: false
      });
  };

  changeState = (myState,value) => {
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
      this.changeState("user",this.props.authState.user.user.uid);
        if(this.props.authState.permissions) 
          this.changeState("userPermissions",this.props.authState.permissions);
    }
    const responseArq = getAllArquivos();
    const responseTipo = getAllTipoArquivo();
    responseArq.then((arqs) => {
      this.changeState("arquivos",arqs);   
      this.getTipos();   
    });
    responseTipo.then((tipos) => {
      this.changeState("tipos",tipos);
      this.getTipos();
    });
  };

  getTipos = () => {
    const {tipos,arquivos} = this.state;
    //console.log("tipossss: ",tipos);
    //console.log("arq: ",arq);
    if(tipos && arquivos) {
      Object.keys(arquivos).map((item) => {
        Object.keys(tipos).map((item2) => {
          if(arquivos[item].tipoarquivo_cod === tipos[item2].tipoarquivo_cod) {
            arquivos[item].tipoarquivo_cod = tipos[item2].tipoarquivo_nome;
          }
        });

      });
    }
  }

  getFile = (arq) => {
    const data = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    const response = downloadArquivo(arq.arquivo_cod,this.state.user,data);
    response.then((file) => {
      saveAs(file,arq.arquivo_nome);
    })
  }

  getName() {
    if(this.state.selectedItem) 
      return this.state.selectedItem.areaticket_nome;
    else
      return '';
  }
    
  render() {
    const {arquivos,tipos,userPermissions} = this.state;
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
                  <Grid container spacing={3} jutify="flex-start">
                    <Grid item>
                      <Typography>Arquivos</Typography>
                    </Grid>
                    <Grid item>
                      <Link to="/admin/tipo-arquivo">
                        <Button className="pull-right" color="primary" size="sm" type="button">
                            Visualizar tipos de arquivos
                        </Button>
                      </Link>
                    </Grid>
                    <PermissibleRender
                      userPermissions={userPermissions ? userPermissions : []}
                      requiredPermissions={['CRUD_ARQUIVO']}
                    >
                      <Grid item>
                        <Link to="/admin/add-arquivos">
                          <Button className="pull-right" color="primary" size="sm" type="button">
                              Adicionar arquivo
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
                      <th scope="col">Tipo</th>
                      <th scope="col">Vísivel</th>
                      <th scope="col"/>
                      <th scope="col"/>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      arquivos && arquivos!==undefined &&
                      Object.keys(arquivos).map((item,index) => {
                        if(tipos) {
                          Object.keys(tipos).map((item2) => {
                            //console.log("tipo:",index,tipos[item]);
                            if(arquivos[item].tipoarquivo_cod === tipos[item2].tipoarquivo_cod) {
                              arquivos[item].tipoarquivo_nome = tipos[item2].tipoarquivo_nome;
                            }
                          });
                        }
                        
                      return (
                        <tr key={index}>
                          <td>    
                            {arquivos[item].arquivo_nome}
                          </td>
                          <td>
                            {arquivos[item].tipoarquivo_nome}
                          </td>
                          <td>
                            {arquivos[item].arquivo_visivel ? "Sim" : "Não"}
                          </td>
                          <td>
                            <Button onClick={() => {this.getFile(arquivos[item])}}>
                              Download
                            </Button>
                          </td>
                          <PermissibleRender
                            userPermissions={userPermissions ? userPermissions : []}
                            requiredPermissions={['CRUD_ARQUIVO']}
                            renderOtherwise={<td></td>}
                          >
                            <td className="text-right">
                              <UncontrolledDropdown onClick={() => this.changeState('selectedItem',arquivos[item])}>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={e => e.preventDefault()}> 
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                    onClick={() => {
                                      mudarVisibilidade(this.state.selectedItem.arquivo_cod,!this.state.selectedItem.arquivo_visivel);
                                      //refresh -> window.location.reload(false); => funciona mas nao mantem logado, por enquanto gambi
                                    }}
                                  >
                                    {arquivos[item].arquivo_visivel ? "Tornar invisível" : "Tornar visível"}
                                  </DropdownItem>
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
                                    <div className="modal-body"> Deseja confirmar exlusão do arquivo {this.getName()}? </div>
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
                                        deleteArquivo(this.state.selectedItem.arquivo_cod);
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

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Arquivos);
