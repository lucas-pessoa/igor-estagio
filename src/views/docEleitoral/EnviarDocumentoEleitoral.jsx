import React from "react";
import { connect } from "react-redux";
import { enviarDocumento } from "services/docEleitoralService";
import ReactDatetime from "react-datetime";
import { isValidEmail, isValidCPF } from "utility/util.js";
import { getAllCapitulos } from "services/superadmService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Col,
  CustomInput,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledDropdown,
  Row,
} from "reactstrap";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField
} from '@material-ui/core';
import Header from "components/Headers/Header.jsx";
import InputMask from "react-input-mask";
import StepperComponent from "components/StepperComponent.jsx";

class EnviarDocumentoEleitoral extends React.Component {
  state = {
    selectedItem: "",
    arquivo: null,
    user: null,
    capitulos: [],
    selectedCap: null,
    nomeMC: "",
    emailMC: "",
    cpfMC: "",
    telefoneMC: "",
    nomePCC: "",
    telefonePCC: "",
    emailPCC: "",
    cpfPCC: "",
    dataInstalacao: null,
    dataIniciacao: null,
    dataElevacao: null,
    dataDiaDevocional: null, // ~18-mar
    dataDiaPatriota: null, // set
    dataDiaEducacional: null, // out
    dataDiaConforto: null, // ~natal
    dataDiaMaes: null, // ~ 2a semana mar
    dataDiaPais: null, // ~ 2a semana ago
    dataDiaGoverno: null, // nov
    dataDiaMemoriaFSL: null, // ~ 8-nov
    DataDiaMemoriaJD: null, // ~ 18-mar
    idMC: "",
    id1C: "",
    id2C: "",
    stepsContent: []
  }

  constructor(props) {
    super(props);
    this.handleFile.bind(this);
    this.getStepContent.bind(this);
    this.onChange.bind(this);
    this.checkInfos.bind(this);

  }

  onChange = (myState, obj) => {
    this.setState({
      [myState]: obj
    })
  }

  componentDidMount() {
    if (this.props.authState && this.props.authState.loggedIn) {
      this.onChange("user", this.props.authState.user.user.uid);
    }
    this.onChange("stepsContent", this.getStepContent());
    const responseCap = getAllCapitulos();
    responseCap.then(caps => {
      if (caps)
        this.onChange('capitulos', caps);
    });
  }

  handleFile() {
    const file = document.getElementById('fileInput').files[0];
    if (file)
      this.onChange("arquivo", file);
  }

  getName() {
    if (this.state.selectedItem)
      return this.state.selectedItem;
    return 'Selecione o semestre';
  }

  getFileLabel() {
    if (this.state.arquivo)
      return this.state.arquivo.name;
    else
      return 'Selecionar';
  }

  getStepContent() {
    const { capitulos } = this.state;
    console.log('caps', capitulos);
    //O QUE TEM QUE FAZER: VER COMO FAZ PRA MUDAR SE FOR 1 SEMESTRE, OU SE FOR OUTRO
    const content = [];
    content.push(
      <Form role="form">
        <Row>
          <Col>
            <Typography>Nome do Capítulo: </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <TextField
              margin="normal"
              variant="outlined"
              value={this.state.nomeCap}
              onChange={e => this.onChange("nomeCap", e.target.value)}
              fullWidth={true}
            /> */}
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {this.state.selectedCap ? this.state.selectedCap.cap_nome + ' n° ' + this.state.selectedCap.cap_numero : 'Capítulo'}
              </DropdownToggle>
              <DropdownMenu >
                {
                  capitulos && capitulos !== null &&
                  Object.keys(capitulos).map((item, index) => {
                    return (
                      <DropdownItem key={index} onClick={() => { this.onChange("selectedCap", capitulos[item]) }}>
                        {capitulos[item].cap_nome} n° {capitulos[item].cap_numero}
                      </DropdownItem>
                    );
                  })
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography>Nome completo do Mestre Conselheiro: </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.nomeMC}
              onChange={e => this.onChange("nomeMC", e.target.value)}
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Typography>E-mail do Mestre Conselheiro:</Typography>
          </Col>
          <Col >
            <Typography>CPF do Mestre Conselheiro:</Typography>
          </Col>
          <Col>
            <Typography>Telefone do Mestre Conselheiro:</Typography>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.emailMC}
              onChange={e => this.onChange("emailMC", e.target.value)}
              fullWidth={true}
            />
          </Col>
          <Col>
            <InputMask
              mask="999.999.999-99"
              onChange={e => this.onChange("cpfMC", e.target.value)}
              value={this.state.cpfMC}
            >
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
            </InputMask>
          </Col>
          <Col>
            <InputMask
              mask="(99) 99999-9999"
              onChange={e => this.onChange("telefoneMC", e.target.value)}
              value={this.state.telefoneMC}
            >
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
            </InputMask>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography>Nome completo do Presidente do Conselho Consultivo:</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.nomePCC}
              onChange={e => this.onChange("nomePCC", e.target.value)}
              fullWidth={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Typography>E-mail do Presidente do Conselho Consultivo:</Typography>
          </Col>
          <Col >
            <Typography>CPF do Presidente do Conselho Consultivo:</Typography>
          </Col>
          <Col>
            <Typography>Telefone do Presidente do Conselho Consultivo:</Typography>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.emailPCC}
              onChange={e => this.onChange("emailPCC", e.target.value)}
              fullWidth={true}
            />
          </Col>
          <Col>
            <InputMask
              mask="999.999.999-99"
              onChange={e => this.onChange("cpfPCC", e.target.value)}
              value={this.state.cpfPCC}
            >
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
            </InputMask>
          </Col>
          <Col>
            <InputMask
              mask="(99) 99999-9999"
              onChange={e => this.onChange("telefonePCC", e.target.value)}
              value={this.state.telefonePCC}
            >
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth={true}
              />
            </InputMask>
          </Col>
        </Row>
        {/*<Row>
            <Col>
                    <Typography>Selecione o semestre referente a documentação: </Typography>
            </Col>
            </Row>
             <Row>
            <Col>
            <FormControl component="fieldset" >
                <RadioGroup value={this.state.selectedItem} onChange={e => this.onChange("selectedItem",e.target.value)} row>
                    <FormControlLabel 
                        checked={this.state.selectedItem === 'option1'} value="option1" control={<Radio color="primary" />} label="1º semestre" 
                    />
                    <FormControlLabel 
                        checked={this.state.selectedItem === 'option2'} value="option2" control={<Radio color="primary" />} label="2º semestre" 
                    />
                </RadioGroup>
            </FormControl>
            </Col>
            </Row> */}
      </Form>
    );
    if (this.state.selectedItem && this.state.selectedItem === 'option1') {
      content.push( //1o semestre
        <Form>
          <Row>
            <Col>
              <Typography>Data da Instalação:</Typography>
            </Col>
            <Col>
              <Typography>Data da Iniciação:</Typography>
            </Col>
            <Col>
              <Typography>Data da Elevação:</Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataInstalacao}
                    onChange={e => this.onChange("dataInstalacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataIniciacao}
                    onChange={e => this.onChange("dataIniciacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataElevacao}
                    onChange={e => this.onChange("dataElevacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>Data do Dia Devocional:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia das Mães:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia em Memória a Jacques DeMolay:</Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaDevocional}
                    onChange={e => this.onChange("dataDiaDevocional", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaMaes}
                    onChange={e => this.onChange("dataDiaMaes", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaMemoriaJD}
                    onChange={e => this.onChange("dataDiaMemoriaJD", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      );
    }
    else {
      content.push(//2o semestre
        <Form>
          <Row>
            <Col>
              <Typography>Data da Instalação:</Typography>
            </Col>
            <Col>
              <Typography>Data da Iniciação:</Typography>
            </Col>
            <Col>
              <Typography>Data da Elevação:</Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataInstalacao}
                    onChange={e => this.onChange("dataInstalacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataIniciacao}
                    onChange={e => this.onChange("dataIniciacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataElevacao}
                    onChange={e => this.onChange("dataElevacao", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>Data do Dia dos pais:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia do Patriota:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia Educacional:</Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaPais}
                    onChange={e => this.onChange("dataDiaPais", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaPatriota}
                    onChange={e => this.onChange("dataDiaPatriota", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaEducacional}
                    onChange={e => this.onChange("dataDiaEducacional", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography>Data do Dia do Meu Governo:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia DeMolay de Conforto:</Typography>
            </Col>
            <Col>
              <Typography>Data do Dia em Memória a Frank Sherman Land:</Typography>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaGoverno}
                    onChange={e => this.onChange("dataDiaGoverno", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaConforto}
                    onChange={e => this.onChange("dataDiaConforto", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <ReactDatetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    value={this.state.dataDiaMemoriaFSL}
                    onChange={e => this.onChange("dataDiaMemoriaFSL", e._d.toLocaleDateString())}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      );
    }
    content.push(
      <Form>
        <Row>
          <Col>
            <Typography>Anexe a Ata de Eleição assinada: </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3">
              <CustomInput
                label={this.getFileLabel()}
                id="fileInput"
                type="file"
                required
                onChange={() => { this.handleFile() }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography>Preencha a nominata da diretoria somente com o ID: </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography>MC:</Typography>
          </Col>
          <Col>
            <Typography>1C:</Typography>
          </Col>
          <Col>
            <Typography>2C:</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.idMC}
              onChange={e => this.onChange("idMC", e.target.value)}
              fullWidth={true}
            />
          </Col>
          <Col>
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.id1C}
              onChange={e => this.onChange("id1C", e.target.value)}
              fullWidth={true}
            />
          </Col>
          <Col>
            <TextField
              margin="normal"
              variant="outlined"
              value={this.state.id2C}
              onChange={e => this.onChange("id2C", e.target.value)}
              fullWidth={true}
            />
          </Col>
        </Row>
      </Form>
    );

    return content;
  }


  //AGORA: COMO FAZ PRA DAR BACK E TER AS INFOS TODAS SALVAS??? -- descobrir outro jeito de fazer essas paradas
  checkInfos(step, state) {
    //console.log("checkandoInfos",state);
    if (step == 0) {
      if (state.selectedCap === null)
        alert("Selecione o capítulo");
      else if (!state.nomeMC)
        alert("Digite o nome completo do Mestre Conselheiro");
      else if (!state.emailMC)
        alert("Digite o email do Mestre Conselheiro");
      else if (!isValidEmail(state.emailMC))
        alert("Digite um e-mail válido para o Mestre Conselheiro");
      else if (!state.cpfMC)
        alert("Digite o CPF do Mestre Conselheiro");
      else if (!isValidCPF(state.cpfMC))
        alert("Digite um CPF válido para o Mestre Conselheiro");
      else if (!state.telefoneMC)
        alert("Digite o telefone do Presidente do Conselho Consultivo");
      else if (!state.nomePCC)
        alert("Digite o nome completo do Presidente do Conselho Consultivo");
      else if (!state.emailPCC)
        alert("Digite o email do Presidente do Conselho Consultivo");
      else if (!isValidEmail(state.emailPCC))
        alert("Digite um e-mail válido para o Presidente do Conselho Consultivo")
      else if (!state.cpfPCC)
        alert("Digite o CPF do Presidente do Conselho Consultivo");
      else if (!isValidCPF(state.cpfPCC))
        alert("Digite um CPF válido para o Presidente do Conselho Consultivo");
      else if (!state.telefonePCC)
        alert("Digite o telefone do Presidente do Conselho Consultivo");
      else return true;

    }
    else if (step == 1) {
      //VERIFICAR SE É 1o SEMESTRE OU SEGUNDO
      //if(this.state.selectedItem === "option1")
      if (!state.dataInstalacao)
        alert("Selecione uma data para a Instalação");
      else if (!state.dataIniciacao)
        alert("Selecione uma data para a Iniciação");
      else if (!state.dataElevacao)
        alert("Selecione uma data para a Elevação");
      else if (!state.dataDiaPais)
        alert("Selecione uma data para o Dia dos Pais");
      else if (!state.dataDiaPatriota)
        alert("Selecione uma data para o Dia do Patriota");
      else if (!state.dataDiaEducacional)
        alert("Selecione uma data para o Dia Educacional");
      else if (!state.dataDiaGoverno)
        alert("Selecione uma data para o Dia do Meu Governo");
      else if (!state.dataDiaConforto)
        alert("Selecione uma data para o Dia DeMolay de Conforto");
      else if (!state.dataDiaMemoriaFSL)
        alert("Selecione uma data para o Dia em Memória a Frank Sherman Land");
      else return true;
    }
    else {
      if (!state.arquivo)
        alert("Selecione o arquivo com a Ata de Eleição assinada!");
      else if (!state.idMC)
        alert("Digite o ID DeMolay do Mestre Conselheiro");
      else if (!state.id1C)
        alert("Digite o ID DeMolay do 1º Conselheiro");
      else if (!state.id2C)
        alert("Digite o ID DeMolay do 2º Conselheiro");
      else {
        const data = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
        //VERIFICAR SE É 1o SEMESTRE OU SEGUNDO
        //if(this.state.selectedItem === "option1")
        //colocar as datas -> documento/datas/... : colocar em um array e mandar a opcao, ai dentro do enviarDocumento ve qual opcao que é e tira do array na ordem certa
        const arr = [];
        arr.push(state.dataInstalacao); arr.push(state.dataIniciacao); arr.push(state.dataElevacao);
        arr.push(state.dataDiaPais); arr.push(state.dataDiaPatriota); arr.push(state.dataDiaEducacional);
        arr.push(state.dataDiaGoverno); arr.push(state.dataDiaConforto); arr.push(state.dataDiaMemoriaFSL);
        enviarDocumento(//
          state.user,
          state.selectedCap,
          state.nomeMC,
          state.emailMC,
          state.cpfMC,
          state.telefoneMC,
          state.nomePCC,
          state.emailPCC,
          state.cpfPCC,
          state.telefonePCC,
          state.arquivo,
          state.idMC,
          state.id1C,
          state.id2C,
          arr,
          data
        );
        return true;
      }
    }
    return false;

  }

  render() {
    //console.log('state',this.state);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>x'
            {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Enviar documento eleitoral</h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <StepperComponent
                    steps={['Informações iniciais', 'Atividades capitulares', 'Informações finais']}
                    content={this.getStepContent()}
                    onNext={this.checkInfos}
                    state={this.state} />
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
})

export default connect(mapStateToProps)(EnviarDocumentoEleitoral);

// <Row>
//                     <Col>
//                             <Typography>Adicione o arquivo com as informações necessárias para o envio do documento eleitoral: </Typography>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Col>
//                         <FormGroup className="mb-3">
//                             <CustomInput
//                             id="fileInput"
//                             type="file"
//                             required
//                             onChange={() => {this.handleFile()}}
//                             />
//                         </FormGroup>
//                     </Col>
//                     </Row>
//                     <div className="text-center">
//                     <Button
//                         className="my-4"
//                         color="primary"
//                         type="button"
//                         onClick={() => this.checkInfos()}
//                     >
//                         Enviar
//                     </Button>
//                     </div>