import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getAllDocs} from "services/docEleitoralService";
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavItem,
  NavLink,
  Pagination,
  Modal,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  UncontrolledCollapse
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import { PermissibleRender } from '@brainhubeu/react-permissible';
import { Typography } from "@material-ui/core";

class Documentos extends React.Component {
    state = {
      docs: [],
      userPermissions: []
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getLastColumn = this.getLastColumn.bind(this);
    }
        // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    onChange = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      const response = getAllDocs();
      response.then((arr) => {
        this.onChange("docs",arr);
      });
      if(this.props.authState && this.props.authState.permissions) {
        this.onChange('userPermissions',this.props.authState.permissions);
      }
    };    

    getLastColumn(doc) {
      const {userPermissions} = this.state;
      if(doc.doc_status === 'Enviado') {
        return (
          <PermissibleRender
            userPermissions={userPermissions ? userPermissions : []}
            requiredPermissions={['RESPOND_DOCELEITORAL']}
            renderOtherwise={<td></td>}
          >
            <td>
              <Link  to={{
                  pathname: '/admin/responder-docEleitoral', state:{
                    doc: doc
              }}}>
                  <Button
                  disable='true'
                  href="#pablo">
                  Responder
                  </Button>
              </Link>
            </td>
          </PermissibleRender>
        );
      }
      else {
        return <td></td>
      };
    }
    
  render() {
    const {docs} = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Capítulo</th>
                      <th scope="col">Data envio</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                
                docs && docs!==undefined &&
                Object.keys(docs).map((item,index) => {
                   return (
                      <tr key={index} id="rowCurso">
                       <td> 
                          <Typography>{docs[item].capitulo.cap_nome} n° {docs[item].capitulo.cap_numero}</Typography>
                       </td>
                       <td>
                         <Typography>{docs[item].doc_dataEnvio}</Typography>
                       </td>
                       <td>
                         <Typography>{docs[item].doc_status}</Typography>
                       </td>
                       {this.getLastColumn(docs[item])}
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

const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps)(Documentos);
