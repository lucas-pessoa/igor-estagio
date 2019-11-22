import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getAllAreaTickets,abrirTicket} from "services/ticketsService";
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
}from '@material-ui/core';
// core components
import Header from "components/Headers/Header.jsx";

class AbrirTicket extends React.Component {
    state = {
        areas: [],
        selectedItem: null,
        arquivo: null,
        assunto: "",
        descricao: "",
        user: null
    }

    onChange = (myState,obj) => {
        this.setState({
            [myState]: obj
        })
    }

    componentDidMount() {
        const response = getAllAreaTickets();
        response.then((arr) => {this.onChange("areas",arr)});
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
    }
    
    getName() {
        if(this.state.selectedItem) 
          return this.state.selectedItem.areaticket_nome;
        else
          return 'Área do ticket!!';
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

    checkInfos() {
        if(!this.state.selectedItem)
            alert("Selecione uma area do ticket!");
        else if(!this.state.assunto)
            alert("Digite o assunto do ticket!");
        else if(!this.state.descricao)
            alert("Digite uma descrição para o problema!");
        else {
            const data = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
            abrirTicket(this.state.assunto,
                this.state.descricao,
                this.state.selectedItem.areaticket_cod,
                this.state.user,
                data,
                this.state.arquivo)
        }
      }

    render() {
        const {areas} = this.state;
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
                        <h3 className=" mb-0">Abrir ticket</h3>
                    </CardHeader>
                    <Form role="form">
                    <CardBody className="px-lg-5 py-lg-5">
                        <Row>
                        <Col xs="3" sm="4">
                            <Typography>Selecione a area do ticket: </Typography>
                        </Col>
                        <Col xs="auto">
                            <UncontrolledDropdown> 
                                <DropdownToggle caret defaultValue="Tipo de arquivo">
                                    {this.getName()}
                                </DropdownToggle>
                                <DropdownMenu > 
                                {
                                    // POPULATE DROPDOWN
                                    areas && areas!==undefined &&
                                    Object.keys(areas).map((item,index) => {
                                        return (
                                        <DropdownItem key = {index} onClick = {() => {this.onChange("selectedItem",areas[item])}}> 
                                        {areas[item].areaticket_nome} 
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
                            <Typography>Assunto: </Typography>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                            <TextField
                                margin="normal"
                                variant="outlined"
                                value={this.state.assunto}
                                onChange={e => this.onChange("assunto", e.target.value)}
                                fullWidth={true}
                            />
                            </Col>
                        </Row>
                    <Row>
                    <Col>
                            <Typography>Descreva o seu problema:</Typography>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows="6"
                            rowsMax="8"
                            value={this.state.descricao}
                            onChange={e => this.onChange("descricao", e.target.value)}
                            fullWidth={true}
                        />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                            <Typography>Se necessário, adicione um arquivo: </Typography>
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
                            onChange={() => {this.handleFile()}}
                            />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Grid container justify="center" spacing={3}>
                        <Grid item>
                            <Link to="/admin/ticketsUSER">
                                <Button 
                                className="my-4"
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
                                onClick={() => this.checkInfos()}
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </CardBody>
                </Form>
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

export default connect(mapStateToProps)(AbrirTicket);