import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getAllIndicacoes} from "services/chevalierService";
import {
  Button,
  Col,
  Table,
  CardHeader,
  Card,
  Container,
  Row,
} from "reactstrap";
import {
    Grid,
  Typography,
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";

class Indicacoes extends React.Component{
    state={
        user: null,
        userPermissions: [],
        indicacoes: []
    }
    constructor(props){
        super(props);
        // this.onChange.bind(this);
        // this.getTipos.bind(this);
        // this.saveFile.bind(this);
        // this.getData.bind(this);
    }

    componentDidMount() {
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
            if(this.props.authState.permissions) {
                this.onChange("userPermissions",this.props.authState.permissions);
            }
        }
        const response = getAllIndicacoes();
        response.then((indics) => {
            this.onChange('indicacoes',indics);
        })
    }
    onChange(myState,val){
        this.setState({
          [myState]: val
        });
    }

    render(){
        const {indicacoes} = this.state;
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
                                <Typography>Indicações Chevalier</Typography>
                            </Grid>
                        </Grid>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Capítulo</th>
                            <th scope="col">Data Envio</th>
                            <th scope="col">Status</th>
                            <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                        {
                            indicacoes && indicacoes!==undefined && 
                            Object.keys(indicacoes).map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td> {indicacoes[item].indic_nomeIndicado} </td>
                                        <td> {indicacoes[item].capitulo.cap_nome} n° {indicacoes[item].capitulo.cap_numero} </td>
                                        <td> {indicacoes[item].indic_dataEnvio} </td>
                                        <td> {indicacoes[item].indic_status} </td>
                                        <td>
                                            <Link  
                                            to={{
                                                pathname:'/admin/ver-indicacao', state:{
                                                    indicacao: indicacoes[item]
                                                }}}
                                            >
                                                <Button color="primary" type="button"
                                                > 
                                                Visualizar 
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                    
                                );
                            })
                        }
                        </tbody>
                    </Table>
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
export default connect(mapStateToProps)(Indicacoes);