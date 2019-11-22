import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addComentario,getComentarios,deleteComentario,fecharTopico,deleteTopico,responderComentario,deleteRespostaComentario} from "services/forumService";
import {
  CardBody,
  Col,
  Container,
  CardHeader,
  FormGroup,
  InputGroup,
  Modal,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  Row
} from "reactstrap";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from "@brainhubeu/react-permissible";
import SubdirectoryArrowRightRoundedIcon from '@material-ui/icons/SubdirectoryArrowRightRounded';
import MultilineText from "components/MultilineText.jsx";

class VisualizarTopico extends React.Component {
    state = {
        user: null,
        userDetail: null,
        topico: null,
        area: null,
        comentario: "",
        showResponseForm: false,
        comments: [],
        deleteComentarioModal: false,
        selectedComent: null,
        selectedResposta: null,
        userPermissions: [],
        closeModal: false,
        deleteTopicoModal: false,
        comentarioRespondido: null
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getData = this.getData.bind(this);
        this.toggleModal = this.toggleModal.bind(this);        
    }
    
    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
        if(this.props.authState && this.props.authState.permissions) {
            this.onChange("userPermissions",this.props.authState.permissions);
        }
        if(this.props.location.state && this.props.location.state.topico && this.props.location.state.area){
            this.onChange("topico",this.props.location.state.topico);
            this.onChange("area",this.props.location.state.area);
            this.onChange("user", this.props.location.state.user);
            this.onChange('userDetail', this.props.location.state.userDetail);

            const responseComment = getComentarios(this.props.location.state.topico.topico_cod);
            responseComment.then(comments => {
                if(comments){
                    this.onChange('comments',comments);
                }
            })
            .catch(function(error){

            });
        }
        
    };

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
    };

    getData() {
      return new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
    }

  render() {
    const {topico,area,comments,userPermissions,user} = this.state;
    return (
        <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
            <Card className="shadow">
                <CardHeader className="border-0">
                {
                    topico!==null && area!==null && user!==null && 
                    <div>
                    <Row>
                        <Col>
                            <Typography variant="h4">{topico.topico_titulo}</Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="10">
                            <Typography variant="subtitle2">
                                Enviado por: {topico.topico_username}, {topico.topico_data} em {area.areaforum_nome}  - {topico.topico_aberto ? 'ABERTO' : 'FECHADO'}
                            </Typography>
                        </Col>
                        <Col xs="2">
                        {
                            topico.topico_user === user &&
                            <div>
                                <Button
                                    outline
                                    className="my-4"
                                    color="primary"   
                                    type="button"
                                    size="sm"
                                    onClick={() => {
                                        this.toggleModal('deleteTopicoModal');
                                    }}
                                >
                                    Excluir tópico
                                </Button>
                                <Modal
                                    className="modal-dialog-centered"
                                    isOpen={this.state.deleteTopicoModal}
                                    toggle={() => this.toggleModal("deleteTopicoModal")}
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
                                            onClick={() => this.toggleModal("deleteTopicoModal")}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <Typography>Deseja mesmo excluir o tópico {topico.topico_titulo}?</Typography>
                                    </div>
                                    <div className="modal-footer">
                                        <Button
                                            color="secondary"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.toggleModal("deleteTopicoModal")}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button color="primary" type="button"
                                            onClick={() => {
                                                deleteTopico(area.areaforum_cod,topico.topico_cod);
                                                this.toggleModal("deleteTopicoModal");
                                            }}
                                        >
                                            Confirmar
                                        </Button>
                                    </div>
                                </Modal>
                            </div>
                        }
                        </Col>
                    </Row>
                    </div>
                }
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                {
                    //topico
                    topico!=null && area!==null ? 
                    <div>
                        <Card color='info' style={{ width: 'full-width'}}>
                            <CardContent> 
                                <MultilineText text={topico.topico_descricao} />
                                <Divider />
                                <Typography align="right">Comentário feito em {topico.topico_data} por {topico.topico_username}</Typography>
                            </CardContent>
                        </Card>
                        <br/>
                    </div>
                    : null
                }
                {
                    //comentários
                    Object.keys(comments).map((item,index) => {
                        //alert(comments[item].comentario);
                       return ( 
                        <div key={index}>
                                <Card key={index} color='info' style={{ width: 'full-width'}}>
                                    <CardContent>
                                        <MultilineText text={comments[item].comentario}/>
                                        <Divider />
                                        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                                            <Grid item xs="2">
                                                {
                                                    topico.topico_aberto === true && 
                                                    <Button
                                                        outline
                                                        className="my-4"
                                                        color="primary"   
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.onChange('comentarioRespondido',comments[item]);
                                                            this.onChange('showResponseForm',true);
                                                            //focar no text field
                                                        }}
                                                    >
                                                        Responder
                                                    </Button>
                                                }
                                               
                                            </Grid>
                                            <Grid item xs="2">
                                            {
                                                comments[item].coment_user === this.state.user && topico.topico_aberto === true &&
                                                <div>
                                                    <Button
                                                        outline
                                                        className="my-4"
                                                        color="primary"   
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => {
                                                            this.onChange('selectedComent',comments[item])
                                                            this.toggleModal("deleteComentarioModal");
                                                        }}
                                                    >
                                                        Excluir
                                                    </Button>
                                                    <Modal
                                                        className="modal-dialog-centered"
                                                        isOpen={this.state.deleteComentarioModal}
                                                        toggle={() => this.toggleModal("deleteComentarioModal")}
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
                                                                onClick={() => this.toggleModal("deleteComentarioModal")}
                                                            >
                                                                <span aria-hidden={true}>×</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <Typography>Deseja mesmo exlcuir esse comentário?</Typography>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <Button
                                                                color="secondary"
                                                                data-dismiss="modal"
                                                                type="button"
                                                                onClick={() => this.toggleModal("deleteComentarioModal")}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                            <Button color="primary" type="button"
                                                                onClick={() => {
                                                                    if(this.state.comentarioRespondido === null) { // comentário
                                                                        deleteComentario(topico.topico_cod,this.state.selectedComent.coment_cod);
                                                                    }
                                                                    else { //resposta
                                                                        deleteRespostaComentario(
                                                                            topico.topico_cod,
                                                                            this.state.selectedComent.coment_cod,
                                                                            this.state.selectedResposta.resposta_cod
                                                                        );
                                                                    }
                                                                    this.toggleModal("deleteComentarioModal");
                                                                }}
                                                            >
                                                                Confirmar
                                                            </Button>
                                                            
                                                        </div>
                                                    </Modal>
                                                </div>
                                            }
                                            </Grid>
                                            <Grid item xs="8">
                                                <Typography align="right">Comentário feito em {comments[item].coment_data} por {comments[item].coment_username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card> 
                                <br/>
                                {
                                    //respostas do comentario
                                    comments[item].respostas &&
                                    Object.keys(comments[item].respostas).map((item2,index2) => {
                                        console.log('coment',comments[item].respostas[item2]);
                                        return (
                                            <Grid container spacing={3}>
                                                <Grid item id="icone" xs="2">
                                                    <SubdirectoryArrowRightRoundedIcon fontSize="large"/>
                                                </Grid>
                                                <Grid item xs="10">
                                                    <Card key={index2} color='info' style={{ width: 'full-width'}}>
                                                        <CardContent>
                                                            <MultilineText text={comments[item].respostas[item2].resposta}/>
                                                            <Divider />
                                                            <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                                                                <Grid item xs="3">
                                                                    {
                                                                        topico.topico_aberto === true &&
                                                                        <Button
                                                                            outline
                                                                            className="my-4"
                                                                            color="primary"   
                                                                            type="button"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                this.onChange('selectedComent',comments[item]);
                                                                                this.onChange('selectedResposta',comments[item].respostas[item2]);
                                                                                this.toggleModal("deleteComentarioModal");
                                                                            }}
                                                                        >
                                                                            Excluir
                                                                        </Button>
                                                                    }
                                                                    
                                                                </Grid> 
                                                                <Grid item xs="9">
                                                                    <Typography align="right">
                                                                        Comentário feito em {comments[item].respostas[item2].resposta_data} por {comments[item].respostas[item2].resposta_username}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
                {
                    //resposta
                    this.state.showResponseForm ? 
                    <Card color='info' style={{ width: 'full-width'}}>
                        <CardContent>
                            {
                                this.state.comentarioRespondido!==null &&
                                <div>
                                    <Typography>Em resposta a {this.state.comentarioRespondido.coment_username}:</Typography>
                                    <Typography>"{this.state.comentarioRespondido.comentario}"</Typography>
                                </div>
                            }
                            <TextField
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows="6"
                                value={this.state.comentario}
                                onChange={e => this.onChange("comentario", e.target.value)}
                                fullWidth={true}
                            />
                            <Grid container justify="flex-end" spacing={4}>
                                <Grid item>
                                    <Button
                                        size="sm"
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            this.onChange('showResponseForm',false);
                                            this.onChange('comentarioRespondido',null);
                                        }}
                                    >
                                    Cancelar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        size="sm"
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            if(this.state.comentario !== "") {
                                                if(this.state.comentarioRespondido === null) { //resposta do tópico
                                                    addComentario(
                                                        this.state.user,
                                                        this.state.userDetail.userName,
                                                        this.state.topico.topico_cod,
                                                        this.state.comentario,
                                                        this.getData()
                                                    )
                                                }
                                                else {//resposta do comentário
                                                    responderComentario(
                                                        this.state.user,
                                                        this.state.userDetail.userName,
                                                        this.state.topico.topico_cod,
                                                        this.state.comentarioRespondido.coment_cod,
                                                        this.state.comentario,
                                                        this.getData()
                                                    )
                                                }
                                                this.onChange('comentarioRespondido',null);
                                            }
                                            else {
                                                alert("Digite algo para comentar!");
                                            }
                                        }}
                                    >
                                    Confirmar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    : null
                }
                
                {
                    (area!==null && user!== null && 
                    topico !==null && topico &&
                    topico.topico_aberto === true) ?
                    <Grid container spacing={3} justify="center">
                        <Grid item>
                            <Link to="/admin/forum">
                                <Button className="my-4" color="primary" type="button">
                                Voltar
                                </Button>
                            </Link>
                        </Grid>
                        <PermissibleRender
                            userPermissions={userPermissions}
                            requiredPermissions={['CLOSE_TOPIC']}
                        >
                            <Grid item>
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => {this.toggleModal("closeModal")}}
                                >
                                Fechar tópico
                                </Button>
                            </Grid>
                            <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.closeModal}
                                toggle={() => this.toggleModal("closeModal")}
                              >
                                <div className="modal-header">
                                  <h5 className="modal-title" id="closeModalLabel">
                                    Atenção!!
                                  </h5>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("closeModal")}
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body">Deseja realmente fechar o tópico?</div>
                                <div className="modal-footer">
                                  <Button
                                    color="secondary"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("closeModal")}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button color="primary" type="button" 
                                  onClick={() => {
                                    fecharTopico(area.areaforum_cod,topico.topico_cod,this.getData(),user);
                                    this.toggleModal("closeModal")}}
                                    > 
                                    Confirmar
                                  </Button>
                                </div>
                            </Modal>
                        </PermissibleRender>
                        <Grid item>
                        <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={() =>{this.onChange('showResponseForm',true)}}
                        >
                        Responder
                        </Button>
                        </Grid>
                    </Grid>
                    : 
                    <Grid container spacing={3} justify="center">
                        <Grid item>
                            <Link to="/admin/forum">
                                <Button className="my-4" color="primary" type="button">
                                Voltar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                }
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
export default connect(mapStateToProps)(VisualizarTopico);
