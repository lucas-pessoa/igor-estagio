import React from "react";
import { Link as RouterLink} from "react-router-dom";
import { connect } from "react-redux";
import { getAllAreaForum,getAllTopicos } from "services/forumService";
import { getUserDetailByID } from "services/superadmService"
import {
    Button,
    Col,
    Card,
    CardHeader,
    CardContent,
    CardBody,
    Container,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Modal,
    UncontrolledDropdown
} from "reactstrap";
import {
    Typography,
    Grid,
    Link,
    Divider,
    ExpansionPanel,
    //ExpansionPanelSummary,
    ExpansionPanelDetails
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Header from "components/Headers/Header.jsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MultilineText from "components/MultilineText.jsx";

const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      fontWeight: 'bold',
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);

class Forum extends React.Component {
    state = {
        user: null,
        userName: null,
        areas: [],
        topicos: [],
        newTopicModal: false,
        selectedItem: null
    };
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getDropdownLabel = this.getDropdownLabel.bind(this);
    }

    componentDidMount() {
        const responseArea = getAllAreaForum();
        responseArea.then(areas => {
            if (areas)
                this.onChange("areas", areas);  
        })
        .catch(function(error){

        })
        
        const responseTopico = getAllTopicos();
        responseTopico.then(topicos => {
            if(topicos)
                this.onChange('topicos',topicos);
        })
        .catch(function(error){

        })

        if (this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user", this.props.authState.user.user.uid);
            const responseUser = getUserDetailByID(this.props.authState.user.user.uid);
            responseUser.then((detail) => {
                Object.keys(detail).map((item) => {
                    let user = detail[item]
                    this.onChange('userDetail',user);
                })
            })
        }

    };

    onChange(myState, value) {
        this.setState({
            [myState]: value
        })
    };

    toggleModal = state => {
        this.setState({
          [state]: !this.state[state],
          selectedItem: null
        });
    };

    getDropdownLabel() {
        if(this.state.selectedItem)
            return this.state.selectedItem.areaforum_nome;
        return 'Área do tópico';
    }

    redirectAddTopico() {
        if(this.state.selectedItem === null) {
            alert('Selecione uma área do tópico para continuar!');
            return null;
        }
        else {
            this.toggleModal('newTopicModal');
            this.props.history.push('/admin/add-topico', { 
                area:this.state.selectedItem,
                user: this.state.user,
                userDetail: this.state.userDetail
            })
        }

    }
    render() {
        const {areas,topicos} = this.state;
        //console.log('tops',topicos,areas);
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
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography>Fórum de Dúvidas</Typography>
                                    </Grid>
                                    <Grid item>
                                        <RouterLink to="/admin/area-forum">
                                            <Button className="pull-right" color="primary" size="sm" type="button">
                                                Áreas do fórum de dúvidas
                                            </Button>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item>
                                        {/* <Link to="/admin/add-area-forum"> */}
                                        <Button className="pull-right" color="primary" size="sm" type="button"
                                            onClick={() => this.toggleModal('newTopicModal')}>
                                            Adicionar novo tópico
                                    </Button>
                                    <Modal
                                        className="modal-dialog-centered"
                                        isOpen={this.state.newTopicModal}
                                        toggle={() => this.toggleModal("newTopicModal")}
                                    >
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                Atenção!!
                                            </h5>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleModal("newTopicModal")}
                                            >
                                                <span aria-hidden={true}>×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <Grid container spacing={3}>
                                                <Grid item>
                                                    <Typography>Selecione a área do tópico: </Typography>
                                                </Grid>
                                                <Grid item>
                                                <UncontrolledDropdown> 
                                                    <DropdownToggle caret defaultValue="Tipo de arquivo">
                                                        {this.getDropdownLabel()}
                                                    </DropdownToggle>
                                                    <DropdownMenu > 
                                                    {
                                                        // POPULATE DROPDOWN
                                                        areas && areas!==undefined &&
                                                        Object.keys(areas).map((item,index) => {
                                                            return (
                                                            <DropdownItem key = {index} onClick = {() => {this.onChange("selectedItem",areas[item])}}> 
                                                            {areas[item].areaforum_nome} 
                                                            </DropdownItem>
                                                            );
                                                        })
                                                    } 
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="modal-footer">
                                            <Button
                                                color="secondary"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleModal("newTopicModal")}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button color="primary" type="button"
                                                onClick={() => this.redirectAddTopico()}
                                            >
                                                Confirmar
                                            </Button>
                                            
                                        </div>
                                    </Modal>
                                    </Grid>
                                </Grid>
                            </CardHeader>
                            <Divider/>
                            <CardBody className="px-lg-5 py-lg-5">
                            {
                                areas!==null && areas && topicos!==null && topicos &&
                                Object.keys(areas).map((item,index) => {
                                    //console.log(areas[item],'toopiks',topicos[item])
                                    return(
                                        <div>
                                             <ExpansionPanel key={index} defaultExpanded="true">
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    >
                                                    <Typography>{areas[item].areaforum_nome}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                <div>
                                                <Row>
                                                    <Col>
                                                        <MultilineText text={areas[item].areaforum_descricao} />
                                                    </Col>
                                                </Row>
                                                {
                                                    topicos[item] && topicos[item]!== null &&
                                                    Object.keys(topicos[item]).map((item2,index2) => {
                                                        return (
                                                            <Grid container>
                                                                <Grid item>
                                                                    <ArrowRightIcon fontSize="small"/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography>
                                                                        <Link href="#" onClick={e => {
                                                                            e.preventDefault();
                                                                            this.props.history.push('/admin/visualizaTopico', {
                                                                                topico: topicos[item][item2],
                                                                                area: areas[item],
                                                                                user: this.state.user,
                                                                                userDetail: this.state.userDetail
                                                                            })
                                                                        }}>
                                                                            {topicos[item][item2].topico_titulo}
                                                                        </Link>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })
                                                }
                                                </div>
                                                </ExpansionPanelDetails>
                                             </ExpansionPanel>
                                             <br/><br/>
                                        </div>
                                       
                                    );
                                })
                            }
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
            </>
        )
    }

}

const mapStateToProps = (state) => ({
    ...state
});
export default connect(mapStateToProps)(Forum);