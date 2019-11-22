import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import ReactDatetime from "react-datetime";
import {addCurso,updateCurso,getAllAreaCursos,getImgCurso} from "services/cursosService";
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
  Grid,
  TextField
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";

class AddCurso extends React.Component {
  state = {
    id: "",
    nome: "",
    descricao: "",
    idArea: "",
    dataInicio: null,
    dataFim: null,
    areas: [],
    selectedItem: null,
    file: null,
    prevFile: null
  };

  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };

  componentDidMount = () => {
    const response = getAllAreaCursos();
    response.then((arr) => {
      this.onChange("areas",arr);
      if(this.props.location.state && this.props.location.state.id) { //seleciona a area
        Object.keys(arr).map((item) => {
          if(this.state.idArea === arr[item].areacurso_cod)
            this.onChange("selectedItem",arr[item]);
        });
      }
    });

    if(this.props.location.state && this.props.location.state.id) {
      const responseImg = getImgCurso(this.props.location.state.id);
      responseImg.then((img) => {
        if(img)
          this.onChange("prevFile",img);
      });

      this.setState({
        id: this.props.location.state.id,
        nome: this.props.location.state.nome,
        descricao: this.props.location.state.descricao,
        dataInicio: this.props.location.state.dataInicio,
        dataFim: this.props.location.state.dataFim,
        idArea: this.props.location.state.idArea
      });  
    }
    
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  getName = () => {
    if(this.state.selectedItem)
      return this.state.selectedItem.areacurso_nome;
    else
      return 'Área do curso';
  }

  handleFile = () => {
      const file = document.getElementById('fileInput').files[0];
      
      if(file){
        this.onChange("file",file);
      }
      
  }

  getImg = () => {
    if(this.state.file) 
      return <img src={URL.createObjectURL(this.state.file)} height={360} width={480}/>
    else if(this.state.prevFile)
        return <img src={this.state.prevFile} height={360} width={480}/>
    else 
      return 
  }

  getFileLabel() {
    if(this.state.file)
      return this.state.file.name;
    else  
      return 'Selecionar';
  }
  render() {
    const header = this.props.location.state && this.props.location.state.id ? 'Alterar curso' : 'Adicionar curso';
    const { areas } = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
          <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">{header}</h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <Row>
                  <Col>
                    <Typography>Nome:</Typography>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                <Row>
                <Col xs="9">
                  <TextField
                      margin="normal"
                      variant="outlined"
                      value={this.state.nome}
                      onChange={e => this.onChange("nome", e.target.value)}
                      fullWidth={true}
                  />
                  </Col>
                  <Col>
                    <UncontrolledDropdown>
                    <DropdownToggle caret defaultValue="Área do curso">
                          {this.getName()}
                    </DropdownToggle>
                        <DropdownMenu>
                        {
                          // POPULATE DROPDOWN
                          areas && areas!==undefined &&
                            Object.keys(areas).map((item,index) => {
                              return (
                              <DropdownItem key={index} onClick = {() => {this.onChange("selectedItem",areas[item])}}> 
                              {areas[item].areacurso_nome}
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
                    <Typography>Descrição:</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        multiline
                        rowsMax="4"
                        value={this.state.descricao}
                        onChange={e => this.onChange("descricao", e.target.value)}
                        fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Typography>Data inicio do curso:</Typography>
                  </Col>
                  <Col>
                    <Typography>Data fim do curso:</Typography>
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
                          inputProps={{
                            placeholder: "Data inicio do curso                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     x"
                          }}
                          timeFormat={false}
                          dateFormat="DD/MM/YYYY"
                          value={this.state.dataInicio}
                          onChange={e => this.onChange("dataInicio", e._d.toLocaleDateString())}
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
                          inputProps={{
                            placeholder: "Data final do curso"
                          }}
                          timeFormat={false}
                          dateFormat="DD/MM/YYYY"
                          value={this.state.dataFim}
                          onChange={e => this.onChange("dataFim", e._d.toLocaleDateString())}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Typography> Selecione a imagem de capa:</Typography>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <FormGroup className="mb-3">
                    <CustomInput
                      id="fileInput"
                      type="file"
                      label={this.getFileLabel()}
                      onChange={() => {this.handleFile()}}
                    />
                </FormGroup>
                </Col>
                </Row>
                  {this.getImg()}
                  <Grid container justify="center" spacing={3}>
                    <Grid item>
                    <Link to='/admin/cursos'>
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
                        onClick={() => {
                          if(this.state.id) {
                            updateCurso(
                              this.state.id,
                              this.state.nome,
                              this.state.descricao,
                              this.state.selectedItem.areacurso_cod,
                              this.state.dataInicio,
                              this.state.dataFim,
                              this.state.file,
                              this.state.prevFile
                            )
                          }
                          else {
                            addCurso(
                              this.state.nome,
                              this.state.descricao,
                              this.state.selectedItem.areacurso_cod,
                              this.state.dataInicio,
                              this.state.dataFim,
                              this.state.file,
                            )
                          }
                        }}
                      >
                        Salvar
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

const mapStateToProps = (state) => ({
  ...state
});
export default connect(mapStateToProps)(AddCurso);

