import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetailByID } from "services/superadmService";
import { encaminharIndicacao, getVotacao, abrirVotacao, encerrarVotacao, votar, downloadFicha } from "services/chevalierService";
import { saveAs } from 'file-saver';
import {
  Button,
  CardHeader,
  Col,
  CardBody,
  Container,
  Form,
  Row,
} from "reactstrap";
import {
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from "@brainhubeu/react-permissible"
import MultilineText from "components/MultilineText.jsx";

class VisualizarIndicacao extends React.Component {
  state = {
    user: null,
    indicacao: null,
    userPermissions: [],
    userDetails: null,
    showForm: false,
    aprovado: false,
    comentario: "",
    votacao: null,
    flagVotou: false,
    voto: null,
    showResults: false
  }
  constructor(props) {
    super(props);
    this.onChange.bind(this);
    this.getVotes.bind(this);
    this.getData.bind(this);
    this.renderVotingButton.bind(this);
    this.renderForm.bind(this);
    this.renderResults.bind(this);
    this.renderResultsButton.bind(this);
    
  }

  componentDidMount() {
    if (this.props.authState && this.props.authState.loggedIn) {
      this.onChange("user", this.props.authState.user.user.uid);
      if (this.props.authState.permissions) {
        this.onChange("userPermissions", this.props.authState.permissions);
      }
    }
    if (this.props.location.state && this.props.location.state.indicacao) {
      this.onChange('indicacao', this.props.location.state.indicacao);
      let stat = this.props.location.state.indicacao.indic_status;
      if (stat !== 'Enviado' && stat !== 'Encaminhado')
        this.getVotes(this.props.location.state.indicacao.indic_cod);
    }
    const response = getUserDetailByID(this.props.authState.user.user.uid);
    response.then(userDetails => {
      Object.keys(userDetails).map((item) => {
        let user = userDetails[item]
        this.onChange('userDetails', user);
      })
    });

  }

  getVotes(id) {
    const response = getVotacao(id);
    response.then(vote => {
      this.onChange('votacao', vote);
      let array = vote.votos;
      Object.keys(array).forEach((index) => {
        if (array[index].voto_user === this.state.user) {
          this.onChange('flagVotou', true);
          this.onChange('voto',array[index]);
          
          return;
        }
      });
    })
      .catch(function (error) {

      });
  }

  onChange(myState, val) {
    this.setState({
      [myState]: val
    });
  }

  getData() {
    return new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
  }

  renderForm() {
    if (this.state.flagVotou && this.state.voto && this.state.voto !== null) { //se ele ja votou nao deixa votar de novo -> flag que é setada quando pega os votos e ve se ja existe o voto do usuario
      return (
        <div>
          <Card body color='info' style={{ width: 'full-width' }}>
            <CardHeader>
                <Typography align="center" variant="h6">Votação para Chevalier</Typography>
            </CardHeader>
            <CardContent>
              <Row>
                <Col>
                  <Typography>Seu voto já foi computado!!</Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography>Data: {this.state.voto.voto_data}</Typography>
                </Col>
                <Col>
                  <Typography>Parecer: Candidato {this.state.voto.voto_aprovado === 'true' ? 'aprovado' : 'reprovado'}</Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <MultilineText text={'Comentario: ' + this.state.voto.voto_comentario}/>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </div>
      );
    }
    else {
      return (
        <div>
          <Card body color='info' style={{ width: 'full-width' }}>
            <CardHeader>
                <Typography align="center" variant="h6">Votação para Chevalier</Typography>
            </CardHeader>
            <CardContent>
              <Form role="form">
                <Row>
                  <Col>
                    <Typography>Selecione se o indicado está aprovado ou não:</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControl component="fieldset">
                      <RadioGroup defaultValue="false" row onChange={e => this.onChange("aprovado", e.target.value)}>
                        <FormControlLabel value="true" control={<Radio />} label="Aprovado" />
                        <FormControlLabel value="false" control={<Radio />} label="Reprovado" />
                      </RadioGroup>
                    </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Typography>Comentário: </Typography>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows="3"
                      rowsMax="5"
                      value={this.state.comentario}
                      onChange={e => this.onChange("comentario", e.target.value)}
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                    <Button
                      outline
                      size="sm"
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={() => {
                        this.onChange("showForm", false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      outline
                      size="sm"
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={() => {
                        votar(
                          this.state.indicacao.indic_cod,
                          this.state.user,
                          this.state.aprovado,
                          this.state.comentario,
                          this.getData()
                        );
                      }}
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </CardContent>
          </Card>
        </div>
      );
    }

  }

  renderResults() {
    const {indicacao,votacao} = this.state;
    console.log('indic',indicacao,'vot',votacao);
    if(indicacao === null || votacao === null)
      return null;

    return (
      <div>
        <Card body color='info' style={{ width: 'full-width' }}>
          <CardHeader>
            <Typography align="center" variant="h6">Votação Encerrada!</Typography>
          </CardHeader>
          <CardContent>
            <Row>
              <Col>
                <Typography>Candidato {indicacao.indic_status}</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography>Votantes: {votacao.votacao_aprovados + votacao.votacao_reprovados}</Typography>
              </Col>
              <Col>
                <Typography>Votos favoráveis: {votacao.votacao_aprovados}</Typography>
              </Col>
              <Col>
                <Typography>Votos desfavoráveis: {votacao.votacao_reprovados}</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography>Data Encaminhado: {votacao.votacao_dataEncaminhado}</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography>Data Abertura: {votacao.votacao_dataAbertura}</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography>Data Encerramento: {votacao.votacao_dataEncerramento}</Typography>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </div>
    )
  }

  renderVotingButton() {
    const { votacao, indicacao, userPermissions } = this.state;
    //console.log('renderizando vot', votacao,indicacao);
    if (votacao === null)
      return null;

    if (votacao.votacao_encerrada === false) {
      if (userPermissions.includes('MANAGE_VOTING')) {
        return (
          <PermissibleRender
            userPermissions={userPermissions}
            requiredPermissions={['VOTE_CHEVALIER', 'MANAGE_VOTING']}
          >
            <Grid item>
              <Button
                className="my-4"
                color="primary"
                type="button"
                onClick={() => this.onChange('showForm', !this.state.showForm)}
              >
                Votação
                  </Button>
            </Grid>
            {
              votacao.votos &&
              <Grid item>
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => encerrarVotacao(indicacao.indic_cod,this.getData())}
                >
                  Encerrar votação
                    </Button>
              </Grid>
            }
          </PermissibleRender>
        );
      }
      else if (userPermissions.includes('VOTE_CHEVALIER')){
        return (
          <PermissibleRender
            userPermissions={userPermissions}
            requiredPermissions={['VOTE_CHEVALIER']}
          >
            <Grid item>
              <Button
                className="my-4"
                color="primary"
                type="button"
                onClick={() => this.onChange('showForm', !this.state.showForm)}
              >
                Votação
                </Button>
            </Grid>
          </PermissibleRender>
        );
      }
    }
    else { //encerrou
      return (
        <PermissibleRender
          userPermissions={userPermissions}
          requiredPermissions={['MANAGE_VOTING']}
        >
          <Grid item>
            <Button
              className="my-4"
              color="primary"
              type="button"
              onClick={() => this.onChange('showResults',!this.state.showResults)}
            >
              Ver votação
              </Button>
          </Grid>
        </PermissibleRender>
      )
    }
  }

  renderResultsButton() {
    const {indicacao} = this.state;
    if(indicacao === null)
      return null;

    if(indicacao.indic_status === 'Aprovado' || indicacao.indic_status === 'Reprovado') {
      return (
        <Grid item>
          <Button
            className="my-4"
            color="primary"
            type="button"
            onClick={() => this.onChange('showResults',!this.state.showResults)}
          >
            Ver votação
            </Button>
        </Grid>
      );
    }
    else return null;
  }

  render() {
    const { indicacao, userDetails, userPermissions } = this.state;
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0"> Detalhes da Indicação para Chevalier  </h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  {
                    indicacao && indicacao !== null &&
                    (
                      <div>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography >Informações do envio</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div>
                              <Row>
                                <Col>
                                  <Typography >Data: {indicacao.indic_dataEnvio}</Typography>
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col>
                                  <Typography>Usuário:</Typography>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Typography>Nome: {userDetails ? userDetails.userName : null}</Typography>
                                </Col>
                                <Col>
                                  <Typography>Email: {userDetails ? userDetails.userEmail : null}</Typography>
                                </Col>
                              </Row>
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography >Informações do capítulo</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div>
                              <Row>
                                <Col>
                                  <Typography >Capítulo {indicacao.capitulo.cap_nome} n° {indicacao.capitulo.cap_numero}</Typography>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Typography>Cidade: {indicacao.capitulo.cap_cidade}</Typography>
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col>
                                  <Typography>Presidente do Conselho Consultivo:</Typography>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Typography>Nome: {indicacao.indic_nomePCC}</Typography>
                                </Col>
                                <Col>
                                  <Typography>CPF: {indicacao.indic_cpfPCC}</Typography>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Typography>Email: {indicacao.indic_emailPCC}</Typography>
                                </Col>
                                <Col>
                                  <Typography>Telefone: {indicacao.indic_telefonePCC}</Typography>
                                </Col>
                              </Row>
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography >Informações do indicado</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div>
                              <br></br>
                              <Row>
                                <Col>
                                  <Typography>Nome: {indicacao.indic_nomeIndicado}</Typography>
                                </Col>
                                <Col>
                                  <Typography>ID DeMolay: {indicacao.indic_idIndicado}</Typography>
                                </Col>
                              </Row>
                              <Row>

                                <Col>
                                  <Typography>Ficha de indicação:</Typography>
                                </Col>
                                <Col>
                                  <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => {
                                      const fileResponse = downloadFicha(indicacao.indic_cod);
                                      fileResponse.then((file) => {
                                          saveAs(file,'ficha_' + indicacao.indic_nomeIndicado);
                                      })
                                    }}
                                  >
                                    Download
                                </Button>
                                </Col>
                              </Row>
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <br /><br />
                        <div>
                          {
                            this.state.showForm &&
                            this.renderForm()
                          }
                          {
                            this.state.showResults && 
                            this.renderResults()
                          }
                        </div>
                        <Grid container spacing={3} justify="center">
                          <Grid item>
                            <Link to="/admin/indicacoes">
                              <Button
                                className="my-4"
                                color="primary"
                                type="button"
                              >
                                Voltar
                              </Button>
                            </Link>
                          </Grid>
                          {
                            indicacao.indic_status === 'Enviado' &&
                            (
                              <PermissibleRender
                                userPermissions={userPermissions}
                                requiredPermissions={['ENCAMINHAR_INDICACAO']}
                              >
                                <Grid item>
                                  <Button
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                    onClick={() => {
                                      encaminharIndicacao(indicacao.indic_cod, this.getData());
                                    }}
                                  >
                                    Encaminhar para votação
                                  </Button>
                                </Grid>
                              </PermissibleRender>
                            )
                          }
                          {
                            indicacao.indic_status === 'Encaminhado' &&
                            <PermissibleRender
                              userPermissions={userPermissions}
                              requiredPermissions={['MANAGE_VOTING']}
                            >
                              <Grid item>
                                <Button
                                  className="my-4"
                                  color="primary"
                                  type="button"
                                  onClick={() => {
                                    abrirVotacao(indicacao.indic_cod,this.getData());
                                    this.getVotes(indicacao.indic_cod);
                                  }}
                                >
                                  Abrir votação
                              </Button>
                              </Grid>
                            </PermissibleRender>
                          }
                          {
                            indicacao.indic_status === 'Votacao' &&
                            this.renderVotingButton()

                          }
                          {
                            this.renderResultsButton()
                            
                          }
                        </Grid>

                      </div>

                    )
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


const mapStateToProps = (state) => ({
  ...state
});
export default connect(mapStateToProps)(VisualizarIndicacao);