import React from 'react';
import { connect } from "react-redux";
import { } from "services/cursosService";
// reactstrap components
import {
  Button,
  CardHeader,
  CardBody,
  Col,
  Container,
  CustomInput,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
} from "reactstrap";
// core components
import {
    GridList,
    GridListTile,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";

class InscricaoCurso extends React.Component {
    state = {
        dataFim: null,
        dataInicio: null,
        descricao: "",
        id: "",
        idArea: "",
        img: null,
        nome: ""
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(this.props.location.state && this.props.location.state.id) {
            this.setState({
                dataFim: this.props.location.state.dataFim,
                dataInicio: this.props.location.state.dataInicio,
                descricao: this.props.location.state.descricao,
                id: this.props.location.state.id,
                idArea: this.props.location.state.idArea,
                img: this.props.location.state.img,
                nome: this.props.location.state.nome
            })
        }
    }
    
    render() {
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
                            <Row>
                                <Col xs="8">
                                    <Typography align="center"
                                    variant="h2"
                                    >{this.state.nome ? this.state.nome : ''}</Typography>
                                    <Typography align="center"
                                    variant="subtitle1">
                                        {this.state.descricao ? this.state.descricao : ''}
                                    </Typography>
                                </Col>
                                <Col xs="4">
                                    <Card>
                                        <CardMedia component="img" height={360} width={240}/>
                                        <CardActions>
                                            <Button className="text-center">
                                                Inscrever em curso
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>
                            </Row>
                        </CardHeader>
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
export default connect(mapStateToProps)(InscricaoCurso);