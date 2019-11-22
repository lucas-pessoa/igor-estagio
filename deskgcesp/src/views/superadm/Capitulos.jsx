import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getAllCapitulos,addCapitulo,updateCapitulo,deleteCapitulo} from "services/superadmService";
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
  Col
} from "reactstrap";
import {
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import {PermissibleRender} from "@brainhubeu/react-permissible";

class Capitulos extends React.Component {
    state = {
      deleteModal: false,
      addModal: false,
      updateModal: false,
      capitulos: [],
      selectedItem: null,
      userPermissions: [],
      nome: "",
      numero: "",
      cidade: ""
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    toggleModal = state => {
      this.setState({
        [state]: !this.state[state]
      });

      if(state === "addModal"){
        this.onChange('nome',"");
        this.onChange('numero',"");
        this.onChange('cidade',"");
      }
        
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
      const response = getAllCapitulos();
      response.then((caps) => {
        this.onChange("capitulos",caps);
      })
      .catch(function(error){

      });
    };
    
    
  render() {
    const {capitulos,userPermissions} = this.state;
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
                      <Typography>Capítulos</Typography>
                    </Grid>
                    <Grid item>
                        <Button className="pull-right" color="primary" size="sm" type="button" onClick={() => this.toggleModal('addModal')}>
                              Adicionar capítulo
                        </Button>
                        <Modal
                            id="addModal"
                            className="modal-dialog-centered"
                            isOpen={this.state.addModal}
                            toggle={() => this.toggleModal("addModal")}
                        >
                            <div className="modal-header">
                            <h5 className="modal-title">
                                ADICIONAR CAPÍTULO
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("addModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                            </div>
                            <div className="modal-body">
                                <Row>
                                    <Col xs="8">
                                        <Typography>Nome:</Typography>
                                    </Col>
                                    <Col>
                                        <Typography>Número:</Typography>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"	
                                        value={this.state.nome}
                                        onChange={e => this.onChange("nome", e.target.value)}
                                        fullWidth={true}
                                    />
                                    </Col>
                                    <Col>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.numero}
                                        onChange={e => this.onChange("numero", e.target.value)}
                                        fullWidth={true}
                                    />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography>Cidade:</Typography>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.cidade}
                                        onChange={e => this.onChange("cidade", e.target.value)}
                                        fullWidth={true}
                                    />
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("addModal")}
                            >
                                Cancelar
                            </Button>
                            <Button color="primary" type="button" 
                            onClick={() => {
                                if(this.state.nome === "")
                                    alert('Digite o nome do capítulo!');
                                else if(this.state.numero === "")
                                    alert('Digite o número do capítulo!');
                                else if(this.state.cidade === "")
                                    alert('Digite a cidade do capítulo!');
                                else {
                                    addCapitulo(this.state.nome,this.state.numero,this.state.cidade);
                                    this.toggleModal("addModal");
                                }
                            }}
                                > 
                                Confirmar
                            </Button>
                            </div>
                        </Modal>
                    </Grid>
                  </Grid>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Número</th>
                      <th scope="col">Cidade</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {// we first verify if the statCardState is undefined
                
                capitulos && capitulos!==undefined &&
                Object.keys(capitulos).map((item,index) => {
                   return (
                      <tr key={index} id="rowCurso">
                        
                       <td> 
                            {capitulos[item].cap_nome}
                       </td>
                       <td>
                            {capitulos[item].cap_numero}
                       </td>
                       <td>
                            {capitulos[item].cap_cidade}
                       </td>
                       <PermissibleRender
                        userPermissions={userPermissions ? userPermissions : []}
                        requiredPermissions={['CRUD_CAPITULOS']}
                        renderOtherwise={<td></td>}
                       >
                        <td className="text-right">
                          <UncontrolledDropdown onClick={() => {
                            this.onChange("selectedItem",capitulos[item]);
                            this.onChange('nome',capitulos[item].cap_nome);
                            this.onChange('numero',capitulos[item].cap_numero);
                            this.onChange('cidade',capitulos[item].cap_cidade);
                          }}>
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
                                <DropdownItem
                                href="#pablo"
                                onClick={() => this.toggleModal("updateModal")}>
                                Alterar
                                </DropdownItem>
                                <Modal
                                    id="updateModal"
                                    className="modal-dialog-centered"
                                    isOpen={this.state.updateModal}
                                    toggle={() => this.toggleModal("updateModal")}
                                >
                                    <div className="modal-header">
                                    <h5 className="modal-title">
                                        Atenção!!
                                    </h5>
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.toggleModal("updateModal")}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                    </div>
                                    <div className="modal-body">
                                    <Row>
                                        <Col xs="8">
                                            <Typography>Nome:</Typography>
                                        </Col>
                                        <Col>
                                            <Typography>Número:</Typography>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="8">
                                        <TextField
                                            margin="normal"
                                            variant="outlined"	
                                            value={this.state.nome}
                                            onChange={e => this.onChange("nome", e.target.value)}
                                            fullWidth={true}
                                        />
                                        </Col>
                                        <Col>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.numero}
                                            onChange={e => this.onChange("numero", e.target.value)}
                                            fullWidth={true}
                                        />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Typography>Cidade:</Typography>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.cidade}
                                            onChange={e => this.onChange("cidade", e.target.value)}
                                            fullWidth={true}
                                        />
                                        </Col>
                                    </Row>
                                    </div>
                                    <div className="modal-footer">
                                    <Button
                                        color="secondary"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.toggleModal("updateModal")}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button color="primary" type="button" 
                                    onClick={() => {
                                        if(this.state.nome === "")
                                            alert('Digite o nome do capítulo!');
                                        else if(this.state.numero === "")
                                            alert('Digite o número do capítulo!');
                                        else if(this.state.cidade === "")
                                            alert('Digite a cidade do capítulo!');
                                        else {
                                            updateCapitulo(this.state.selectedItem.cap_cod,this.state.nome,this.state.numero,this.state.cidade);
                                            this.toggleModal("updateModal");
                                        }
                                    }}
                                        > 
                                        Confirmar
                                    </Button>
                                    </div>
                                </Modal>
                                <DropdownItem
                                    href="#pablo"
                                    onClick={e => {this.toggleModal("deleteModal")}}
                                >
                                    Excluir
                                </DropdownItem>
                                <Modal
                                    id="deleteModal"
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
                                    <div className="modal-body">Deseja confirmar exlusão do capítulo {this.state.selectedItem ? this.state.selectedItem.cap_nome : ''}?</div>
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
                                        deleteCapitulo(this.state.selectedItem.cap_cod);
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
export default connect(mapStateToProps)(Capitulos);
