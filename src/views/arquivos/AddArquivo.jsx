import React from "react";
import {Link} from "react-router-dom";
import {getAllTipoArquivo, uploadArquivo} from "services/arquivosService";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  CustomInput,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
} from "reactstrap";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Grid
} from "@material-ui/core";
// core components
import Header from "components/Headers/Header.jsx";

class AddArquivo extends React.Component {
  state = {
    nome: "",
    descricao: "",
    tipos: [],
    dataVisivel_inicio: null,
    dataVisivel_fim: null,
    arquivo: null,
    selectedItem: null,
    visivel: true
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getName = this.getName.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.getFileLabel = this.getFileLabel.bind(this);
    this.validarDatas = this.validarDatas.bind(this);
    this.checkForUpload = this.checkForUpload.bind(this);
    
  }

  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };

  componentDidMount() {
      const response = getAllTipoArquivo();
      response.then((arr) => {this.onChange("tipos",arr)});
  };
  
  getName() {
    if(this.state.selectedItem) 
      return this.state.selectedItem.tipoarquivo_nome;
    return '';
  };

  handleFile() {
    const file = document.getElementById('fileInput').files[0];
    if(file)
      this.onChange("arquivo",file);
  }

  getFileLabel() {
    if(this.state.arquivo)
      return this.state.arquivo.name;
    else
      return 'Selecionar';
  }

  validarDatas() { //final maior que inicial, as duas maior que data atual
    const {dataVisivel_inicio,dataVisivel_fim} = this.state;
    const dia  = new Date().getDate(), mes = new Date().getMonth(), ano = new Date().getFullYear();
    if(dataVisivel_fim.getFullYear() <= dataVisivel_inicio.getFullYear()) {
      if(dataVisivel_fim.getFullYear() < dataVisivel_inicio.getFullYear())
        alert("Selecione uma data final maior que inicial");
      else { //ano igual
        if(dataVisivel_fim.getMonth() <= dataVisivel_inicio.getMonth()) {
          if(dataVisivel_fim.getMonth() < dataVisivel_inicio.getMonth()) 
            alert("Selecione uma data final maior que inicial");
          else { //mes igual
            if(dataVisivel_fim.getDate() <= dataVisivel_inicio.getDate())
                alert("Selecione uma data final maior que inicial");
            else 
              return true;
          }
        }
        else 
          return true;
      }
    }
    else 
      return true;
 
    return false;
  }

  checkForUpload() {
    //validações
    if(!this.state.selectedItem)
      alert("Selecione um tipo de arquivo!");
    else if(!this.state.nome)
      alert("Digite um nome para o arquivo!");
    else if(!this.state.descricao)
      alert("Digite uma descrição para o arquivo!");
    // else if(!this.state.dataVisivel_inicio)
    //   alert("Selecione uma data inicial para exibição do arquivo!");
    // else if(!this.state.dataVisivel_fim)
    //   alert("Selecione uma data final para exibição do arquivo!");
    else if(!this.state.arquivo)
      alert("Selecione um arquivo!");
    else //if(this.validarDatas()) 
    {
        uploadArquivo(
          this.state.nome,
          this.state.descricao,
          // this.state.dataVisivel_inicio.toLocaleDateString(),
          // this.state.dataVisivel_fim.toLocaleDateString(),
          this.state.selectedItem.tipoarquivo_cod,
          this.state.visivel,
          this.state.arquivo
        )
    }
  }

  render() {
    const { tipos } = this.state;
    return (
      <>
        <Header />
        <Container className=" mt--7" fluid>
          <Row>
          <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Disponibilizar arquivo</h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
              <Row>
                  <Col xs="8"> 
                    <Typography>Nome do arquivo:</Typography>
                  </Col>
                  <Col>
                    <Typography>Tipo do arquivo:</Typography>
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
                    <UncontrolledDropdown margin="normal"> 
                      <DropdownToggle caret>
                        {this.getName()}
                      </DropdownToggle>
                      <DropdownMenu > 
                      {
                        // POPULATE DROPDOWN
                        tipos && tipos!==undefined &&
                          Object.keys(tipos).map((item,index) => {
                            return (
                            <DropdownItem key = {index} onClick = {() => {this.onChange("selectedItem",tipos[item])}}> 
                              {tipos[item].tipoarquivo_nome} 
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
                  <Typography>Descrição do arquivo:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                 <TextField
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows="4"
                    rowsMax="6"		
                    value={this.state.descricao}
                    onChange={e => this.onChange("descricao", e.target.value)}
                    fullWidth={true}
                  />
                </Col>
                </Row>
                <Row>
                  <Col>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.visivel}
                        onClick={() => this.onChange('visivel',!this.state.visivel)}
                        color="primary"
                      />
                    }
                    label="Visível"
                  />
                  </Col>
                </Row>
                {/* <Row>
                <Col>
                  <Typography>Data inicial de visualização: </Typography>
                </Col>
                <Col>
                  <Typography>Data final de visualização:</Typography>
                </Col>
                </Row>
                <Row>
                  <Col xs={6}>
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
                          onChange={e => this.onChange("dataVisivel_inicio", e._d)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
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
                          onChange={e => this.onChange("dataVisivel_fim", e._d)}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                <Col>
                  <Typography>Selecione o arquivo a ser disponibilizado:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup className="mb-3">
                      <CustomInput
                        label={this.getFileLabel()}
                        id="fileInput"
                        type="file"
                        onChange={() => {this.handleFile()}}
                      />
                  </FormGroup>
                </Col>
                </Row>
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                  <Link to='/admin/arquivos'>
                    <Button className="my-4"
                        color="primary"
                        type="button"
                    >
                        Voltar
                    </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={() => this.checkForUpload()}
                    >
                      Disponibilizar arquivo
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </CardBody>
              </Card> 
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default AddArquivo;
