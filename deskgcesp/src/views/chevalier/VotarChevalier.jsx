import React from "react";
import {Link} from "react-router-dom";
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
    GridList,
    ExpansionPanelActions,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "components/Headers/Header.jsx";

class VotarChevalier extends React.Component{
    state={
        user: null
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
        }
    }


    onChange(myState,val){
        this.setState({
          [myState]: val
        });
    }

    render(){
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
export default connect(mapStateToProps)(VotarChevalier);