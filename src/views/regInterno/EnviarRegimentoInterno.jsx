import React from "react";
import { connect } from "react-redux";
import { enviarRegimento } from "services/regInternoService";
import { getAllCapitulos } from "services/superadmService";
import { isValidEmail, isValidCPF } from "utility/util.js";
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
} from '@material-ui/core';
import InputMask from "react-input-mask";
import Header from "components/Headers/Header.jsx";
import StepperComponent from "components/StepperComponent.jsx";

class EnviarRegimentoInterno extends React.Component {
    state = {
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
        capitulo: "",
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
        this.onChange('stepsContent', this.getStepContent());
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

    getFileLabel() {
        if(this.state.arquivo)
          return this.state.arquivo.name;
        else
          return 'Selecionar';
    }

    getStepContent() {
        const {capitulos} = this.state;
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
        ); content.push(
            <Form>
                <Row>
                    <Col>
                        <Typography>Anexe o Regimento Interno do Capítulo: </Typography>
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

    checkInfos(step, state) {
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
                alert("Digite um e-mail válido para o Presidente do Conselho Consultivo");
            else if (!state.cpfPCC)
                alert("Digite o CPF do Presidente do Conselho Consultivo");
            else if (!isValidCPF(state.cpfPCC))
                alert("Digite um CPF válido para o Presidente do Conselho Consultivo");
            else if (!state.telefonePCC)
                alert("Digite o telefone do Presidente do Conselho Consultivo");
            else return true;

        }
        else {
            if (!state.arquivo)
                alert("Selecione o arquivo com o Regimento Interno!");
            else if (!state.idMC)
                alert("Digite o ID DeMolay do Mestre Conselheiro");
            else if (!state.id1C)
                alert("Digite o ID DeMolay do 1º Conselheiro");
            else if (!state.id2C)
                alert("Digite o ID DeMolay do 2º Conselheiro");
            else {
                const data = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                enviarRegimento(//
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
                    data
                );
            }
            return true;
        }
        return false;
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
                                    <h3 className=" mb-0">Enviar regimento interno</h3>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <StepperComponent
                                        steps={['Informações iniciais', 'Informações finais']}
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

export default connect(mapStateToProps)(EnviarRegimentoInterno);