import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import {} from "services/cursosService";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    CustomInput,
    FormGroup,
    Form,
    Row,
  } from "reactstrap";
  import {
    Typography,
    Divider,
    TextField,
    Grid
  } from "@material-ui/core";
  import Header from "components/Headers/Header.jsx";

class addVideoAula extends React.Component {
    state = {
        curso_id: "",
        curso_nome: "",
        curso_dataInicio: "",
        curso_dataFim: "",
        titulo: "",
        descricao: "",
        file: null
    };

    onChange = (myState,value) => {
        this.setState({
            [myState]: value
        });
    };

    componentDidMount = () => {
        if(this.props.location.state && this.props.location.state.id){
            this.setState({
                curso_id: this.props.location.state.id,
                curso_nome: this.props.location.state.nome,
                curso_dataInicio: this.props.location.state.dataInicio,
                curso_dataFim: this.props.location.state.dataFim
            })
        }
    }

    handleFile() {
      const file = document.getElementById('fileInput').files[0];
      if (file)
        this.onChange("arquivo", file);
    }

    getFileLabel() {
      if(this.state.file)
        return this.state.file.name;
      else
        return 'Selecionar';
    }
    
    render() {

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
                      <h3 className=" mb-0"> Adicionar vídeo aula </h3>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <Row>
                      <Col>
                        <Typography variant="h3">Curso: {this.state.curso_nome}</Typography>
                      </Col>
                    </Row>
                    <Row>
                    <Col>
                      <Typography variant="h6">Data inicial do curso: {this.state.curso_dataInicio} - Data final do curso: {this.state.curso_dataFim}</Typography>
                    </Col>
                    </Row>
                    <br/>
                    <Divider/>
                    <br/>
                    <Row>
                    <Col>
                      <Typography>Título da video aula: </Typography>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <TextField
                        margin="normal"
                        variant="outlined"
                        value={this.state.titulo}
                        onChange={e => this.onChange("titulo", e.target.value)}
                        fullWidth={true}
                      />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <Typography>Descrição da video aula:</Typography>
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
                      <Typography>Selecione o arquivo correspondente a essa video aula:</Typography>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <FormGroup className="mb-3">
                        <CustomInput
                          label={this.getFileLabel()}
                          id="fileInput"
                          type="file"
                          label={this.getFileLabel()}
                          onChange={() => {this.handleFile()}}
                        />
                      </FormGroup>      
                    </Col>
                    </Row>
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
                          onClick={() => {}}
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
export default connect(mapStateToProps)(addVideoAula);
