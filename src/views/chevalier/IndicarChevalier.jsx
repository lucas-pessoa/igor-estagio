import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {indicarChevalier,downloadFichaModelo} from "services/chevalierService";
import { getAllCapitulos } from "services/superadmService";
import {isValidEmail,isValidCPF} from "utility/util.js";
import { saveAs } from 'file-saver';
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import {
  Typography,
  TextField,
  Grid,
  Link as LinkT
} from "@material-ui/core";
import InputMask from "react-input-mask";
import Header from "components/Headers/Header.jsx";

class IndicarChevalier extends React.Component{
    state={
        user: null,
        nomePCC: "",
        emailPCC: "",
        cpfPCC: "",
        telefonePCC: "",
        nomeIndicado: "",
        idIndicado: "",
        capitulos: [],
        selectedCap: null,
        arquivo: null
    }
    constructor(props){
        super(props);
        this.onChange.bind(this);
        this.checkInfos.bind(this);
        this.handleFile.bind(this);
    }

    componentDidMount() {
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
        const responseCap = getAllCapitulos();
        responseCap.then(caps => {
        if(caps)
            this.onChange('capitulos',caps);
        });
    }


    onChange(myState,val){
        this.setState({
          [myState]: val
        });
    }

    getFileLabel() {
        if(this.state.arquivo)
          return this.state.arquivo.name;
        else
          return 'Selecionar';
    }

    checkInfos = () => {
        const {selectedCap,nomeIndicado,idIndicado,nomePCC,emailPCC,cpfPCC,telefonePCC,arquivo,user} = this.state;
        if(selectedCap===null)
            alert("Selecione o capítulo do indicado");
        else if(!nomeIndicado)
            alert("Digite o nome do indicado");
        else if(!idIndicado)
            alert("Digite o ID DeMolay do indicado");
        else if(!nomePCC)
            alert("Digite o nome do Presidente do Conselho Consultivo");
        else if(!emailPCC)
            alert("Digite o email do Presidente do Conselho Consultivo");
        else if(!isValidEmail(emailPCC))
            alert("Digite um e-mail válido do Presidente do Conselho Consultivo")
        else if(!cpfPCC)
            alert("Digite o CPF do Presidente do Conselho Consultivo");
        else if(!isValidCPF(cpfPCC))
            alert("Digite um CPF vádlio do Presidente do Conselho Consultivo")
        else if(!telefonePCC)
            alert("Digite o telefone do Presidente do Conselho Consultivo");
        else if(!arquivo)
            alert("Anexe a ficha de indicação");
        else {
            const data = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
            indicarChevalier(
                user,
                nomePCC,
                emailPCC,
                cpfPCC,
                telefonePCC,
                nomeIndicado,
                idIndicado,
                selectedCap,
                arquivo,
                data
            )
       }
    }

    handleFile() {
        const file = document.getElementById('fileInput').files[0];
        if(file)
            this.onChange('arquivo',file);
    }

    render(){
        const {capitulos} = this.state;
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
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                    <Row>
                        <Col>
                            <Typography>Capítulo do indicado: </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <UncontrolledDropdown> 
                                <DropdownToggle caret defaultValue="Tipo de arquivo">
                                    {this.state.selectedCap ? this.state.selectedCap.cap_nome + ' n° ' + this.state.selectedCap.cap_numero: 'Capítulo'}
                                </DropdownToggle>
                                <DropdownMenu > 
                                {
                                    capitulos && capitulos!==null &&
                                    Object.keys(capitulos).map((item,index) => {
                                        return (
                                        <DropdownItem key={index} onClick = {() => {this.onChange("selectedCap",capitulos[item])}}> 
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
                        <Col xs="9">
                            <Typography>Nome completo do indicado:</Typography>
                        </Col>
                        <Col>
                            <Typography>ID DeMolay do indicado:</Typography>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs="9">
                        <TextField
                            margin="normal"
                            variant="outlined"
                            value={this.state.nomeIndicado}
                            onChange={e => this.onChange("nomeIndicado", e.target.value)}
                            fullWidth={true}
                        />
                        </Col>
                        <Col>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            value={this.state.idIndicado}
                            onChange={e => this.onChange("idIndicado", e.target.value)}
                            fullWidth={true}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography>Nome completo do Presidente do Conselho Consultivo: </Typography>
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
                            value={this.state.telefonePCC}
                            onChange={e => this.onChange("telefonePCC", e.target.value)}
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
                            <Typography>Anexe a ficha de indicação: </Typography>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        <FormGroup className="mb-3">
                            <CustomInput
                                label={this.getFileLabel()}
                                id="fileInput"
                                type="file"
                                onChange={() => this.handleFile()}
                            />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                            <Typography>
                                Não tem ficha? 
                                <LinkT href="#" underline="always" onClick={e => {
                                    e.preventDefault();
                                    const response = downloadFichaModelo();
                                    response.then((file) => {
                                        saveAs(file,'modeloFichaChevalier');
                                    });
                                }}> 
                                    Clique aqui para baixar o modelo
                                </LinkT>
                            </Typography>
                    </Col>
                    </Row>
                    <Grid container justify="center" spacing={3}>
                      <Grid item>
                      <Link to='/admin/chevalier'>
                        <Button className="my-4"
                            color="primary"
                            type="button"
                        >
                            Voltar
                        </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Button className="my-4"
                                color="primary"
                                type="button"
                                onClick={() => this.checkInfos()}
                            >
                                Enviar indicação
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
export default connect(mapStateToProps)(IndicarChevalier);