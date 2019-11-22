import React from "react";
import { connect } from "react-redux";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";
import {
  Card,
} from "@material-ui/core";
import Header from "components/Headers/Header.jsx";
import VisualizadorTicket from "../../components/VisualizadorTicket";
import {getUserDetailByID} from "services/superadmService";

class VisualizarTicket extends React.Component{
    state={
        user: null,
        ticket: null,
        userPermissions:[],
        userDetail: null
    }
    constructor(props){
        super(props);
        this.onChange.bind(this);
    }

    componentDidMount() {
        if(this.props.authState && this.props.authState.loggedIn) {
            this.onChange("user",this.props.authState.user.user.uid);
            const response = getUserDetailByID(this.props.authState.user.user.uid);
            response.then(detail => {
                if(detail) {
                    Object.keys(detail).forEach(item => {
                        this.onChange('userDetail',detail[item]);
                    })
                }
            })
            if(this.props.authState.permissions) {
                this.onChange("userPermissions",this.props.authState.permissions);
            }
        }
        if(this.props.location.state && this.props.location.state.ticket) {
            this.onChange('ticket',this.props.location.state.ticket);
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
            <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                <Card className="shadow">
                    <CardHeader className=" bg-transparent">
                      <h3 className=" mb-0"> Detalhes do ticket </h3>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                    <VisualizadorTicket 
                        userPermissions={this.state.userPermissions}
                        userDetail={this.state.userDetail}
                        ticket={this.state.ticket}
                        path={this.props.location.state.path}
                    >
                    </VisualizadorTicket>
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
export default connect(mapStateToProps)(VisualizarTicket);