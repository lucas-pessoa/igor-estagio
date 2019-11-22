import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import { addAreaForum,updateAreaForum } from "services/forumService"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
} from "reactstrap";
import {
  Typography,
  Grid,
  TextField
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";

class AddAreaForum extends React.Component {
  state = {
    id: "",
    nome: "",
    descricao: ""
  };
  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };
  componentDidMount = () => {
    if(this.props.location.state && this.props.location.state.id) {
      this.setState({
        id: this.props.location.state.id,
        nome: this.props.location.state.nome,
        descricao: this.props.location.state.descricao
      });
    }
  }
  render() {
    const header = this.props.location.state && this.props.location.state.id ? 'Alterar área do fórum de dúvidas' : 'Adicionar área do fórum de dúvidas'
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
                  <Typography>Nome da área:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    value={this.state.nome}
                    onChange={e => this.onChange("nome", e.target.value)}
                    fullWidth={true}
                  />
                </Col>
                </Row>
                <Row>
                <Col>
                  <Typography>Descrição da área:</Typography>
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
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                  <Link to='/admin/area-forum'>
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
                        updateAreaForum(
                          this.state.id,
                          this.state.nome,
                          this.state.descricao
                        )
                      }
                      else {
                        addAreaForum(
                          this.state.nome,
                          this.state.descricao
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
export default connect(mapStateToProps)(AddAreaForum);
