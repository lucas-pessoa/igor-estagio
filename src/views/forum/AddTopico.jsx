import React from "react";
import { Link } from "react-router-dom" 
import { connect } from "react-redux";
import { addTopico } from "services/forumService"
import { getUserDetailByID } from "services/superadmService";
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

class AddTopico extends React.Component {
  state = {
    area: null,
    titulo: "",
    descricao: "",
    user: null,
    userDetail: null
  };
  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };
  componentDidMount = () => {
    if(this.props.location && this.props.location.state.area) {
        this.onChange('area',this.props.location.state.area);
        this.onChange('user',this.props.location.state.user);
        this.onChange('userDetail',this.props.location.state.userDetail);
    }
  }

  render() {
    console.log('istate',this.state.userDetail);
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
                  <h3 className=" mb-0"></h3>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <Row>
                <Col xs="9">
                  <Typography>Título do tópico:</Typography>
                </Col>
                <Col>
                  <Typography>Nome da área:</Typography>
                </Col>
                </Row>
                <Row>
                <Col xs="9">
                  <TextField
                    margin="normal"
                    variant="outlined"
                    value={this.state.titulo}
                    onChange={e => this.onChange("titulo", e.target.value)}
                    fullWidth={true}
                  />
                </Col>
                <Col>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    disabled="true"
                    value={this.state.area ? this.state.area.areaforum_nome : ''}
                    fullWidth={true}
                  />
                </Col>
                </Row>
                <Row>
                <Col>
                  <Typography>Comentário:</Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                  <TextField
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows="6"		
                    value={this.state.descricao}
                    onChange={e => this.onChange("descricao", e.target.value)}
                    fullWidth={true}
                  />
                </Col>
                </Row>
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                  <Link to='/admin/forum'>
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
                        const data = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear()  + ' às ' + new Date().getHours() + ':' + new Date().getMinutes();
                        addTopico(
                            this.state.user,
                            this.state.userDetail.userName,
                            this.state.area.areaforum_cod,
                            this.state.titulo,
                            this.state.descricao,
                            data
                        );
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
export default connect(mapStateToProps)(AddTopico);
