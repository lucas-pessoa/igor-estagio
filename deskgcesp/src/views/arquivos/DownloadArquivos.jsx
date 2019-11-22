import React from "react";
import { connect } from "react-redux";
import {getArquivosVisibilidade,downloadArquivo} from "services/arquivosService";
import { saveAs } from 'file-saver';
import {
  Button,
  Col,
  CardHeader,
  Card,
  Container,
  CardBody,
  Row,
} from "reactstrap";
import {
    Divider,
    ExpansionPanelActions,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";
import { getAllTipoArquivo } from "../../services/arquivosService";
import MultilineText from "components/MultilineText.jsx";

class DownloadArquivos extends React.Component{
    state={
        user: null,
        arquivos: [],
        tipos: []
    }
    constructor(props){
        super(props);
        this.onChange.bind(this);
        this.getTipos.bind(this);
        this.saveFile.bind(this);
        // this.getData.bind(this);
    }

    componentDidMount() {
        console.log('propsss',this.props);
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
        }
        
        const responseArq = getArquivosVisibilidade(true);
        const responseTipos = getAllTipoArquivo(true);
        responseArq.then((files) => {
            this.onChange('arquivos',files);
        })
        .finally(() => {
            if(this.state.arquivos && this.state.tipos)
                this.getTipos();
        })
        .catch(function(error){
            return
        });

        responseTipos.then((tipos) => {
            this.onChange('tipos',tipos);
        })
        .finally(() => {
            if(this.state.arquivos && this.state.tipos)
                this.getTipos();
        })
        .catch(function(error){
            return
        });
    }

    getTipos() {
        const {tipos,arquivos} = this.state;
        Object.keys(arquivos).map((item) => {
            Object.keys(tipos).map((item2) => {
              if(arquivos[item].tipoarquivo_cod === tipos[item2].tipoarquivo_cod) {
                arquivos[item].tipoarquivo_nome = tipos[item2].tipoarquivo_nome;
              }
            });
        });
        this.onChange('arquivos',arquivos);
    }

    onChange(myState,val){
        this.setState({
          [myState]: val
        });
    }

    // handleFile() {
    //     const file = document.getElementById('fileInput').files[0];
    //     if(file)
    //       this.onChange("arquivo",file);
    // }
    saveFile = (arq) => {
        const data = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
        const response = downloadArquivo(arq.arquivo_cod,this.state.user,data);
        response.then((file) => {
            saveAs(file,arq.arquivo_nome)
        })
        .catch(function(error){
            return;
        })
    }

    render(){
        const {arquivos} = this.state;
        console.log('arqzinhos',arquivos);
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
                    {
                        arquivos && arquivos!==undefined &&
                        Object.keys(arquivos).map((item,index) => {
                            return (
                                <ExpansionPanel key={index}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                    <Row>
                                        <Col>
                                            <Typography variant="h6">{arquivos[item].arquivo_nome} </Typography>
                                        </Col>
                                    </Row>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                    <div>
                                        <Row>
                                            <Col>
                                                <Typography>Tipo do arquivo: {arquivos[item].tipoarquivo_nome ? arquivos[item].tipoarquivo_nome : ''} </Typography>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <MultilineText text={'Descrição: ' + arquivos[item].arquivo_descricao} />
                                            </Col>
                                        </Row>
                                    </div>
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions>
                                    <Button size="small" color="primary"
                                        onClick={() => this.saveFile(arquivos[item])}
                                    >
                                        Download
                                    </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            );
                        })
                    }
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
export default connect(mapStateToProps)(DownloadArquivos);