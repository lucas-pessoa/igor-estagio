import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import {getAllCursos,getImgCurso} from "services/cursosService";
// reactstrap components
import {
  Button, 
  CardHeader,
  Container,
  Row,
} from "reactstrap";

import { 
    GridList,
    GridListTile,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography
} from '@material-ui/core';
import Header from "components/Headers/Header.jsx";

class Cursos extends React.Component {
    state = {
      deleteModal: false,
      cursos: [],
      imgs: [],
      selectedItem: null
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.changeState = this.changeState.bind(this);
        this.getLink = this.getLink.bind(this);
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    changeState = (myState,obj) => {
      this.setState({
        [myState]: obj
      });
    }

    componentDidMount() {
      const responseCurso = getAllCursos();
      responseCurso.then((cursos) => {
        this.changeState("cursos",cursos);
        Object.keys(cursos).map((item) => {
            const responseImg = getImgCurso(cursos[item].curso_cod);
            responseImg.then((url) => {
                if(url)
                    cursos[item].img = url;
                else
                    cursos[item].img = ""; //se nao tiver adiciona um faker (?)
                this.changeState("cursos",cursos);
            })
        });
      });
    };

    componentWillUnmount() {
      //tirar as funções asincrona, ta dando um warning/erro
    }

    getSrc = (curso) => {
        return curso.img ? curso.img : ""
    }

    getLink = (curso) => {
      return {
          pathname: '/admin/inscricao-curso', state:{
            id: curso.curso_cod,
            nome:curso.curso_nome,
            descricao: curso.curso_descricao,
            idArea: curso.areacurso_cod,
            img: curso.img,
            dataInicio: curso.curso_dataInicio,
            dataFim: curso.curso_dataFim
          }
      };
    }

  render() {
    const { cursos, imgs } = this.state;
    console.log("cursos",cursos);
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                    <GridList cols={3}>
                    {
                        cursos && cursos!==undefined &&
                        Object.keys(cursos).map((item,index) => {
                            return (
                                <GridListTile key={index}>
                                    <Card style={{ width: "18rem"}}>
                                        <CardMedia
                                        height={360} width={240}
                                        top
                                        title={cursos[item].curso_nome}
                                        src={this.getSrc(cursos[item])}
                                        />
                                        <CardContent>
                                            <Typography variant="h6"> {cursos[item].curso_nome} </Typography>
                                            <Typography variant="body6"> {cursos[item].curso_descricao} </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={this.getLink(cursos[item])}>
                                                <Button size="small" color="primary">
                                                    Ver curso
                                                </Button>
                                          </Link> 
                                        </CardActions>
                                    </Card>
                                </GridListTile> 
                            );
                        })
                    }
                    </GridList>
                </CardHeader>
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
export default connect(mapStateToProps)(Cursos);
