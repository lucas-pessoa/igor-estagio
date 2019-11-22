import React from "react";
import Header from "components/Headers/Header.jsx";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import {
  Typography,
  Tabs,
  Tab,
  Grid,
  Divider
} from '@material-ui/core';

import TabPanel from "components/TabPanel.jsx";
// Forum
import imgForumPrincipal from "assets/img/manual/forumPrincipal.png";
import imgForumAddTopico from "assets/img/manual/forumAdd.png";
import imgForumAddTopico2 from "assets/img/manual/forumAdd2.png";
import imgForumTopico from "assets/img/manual/forumTopico.png";
import imgForumResponderTopico from "assets/img/manual/forumResponderTopico.png";
//Arquivo
import imgArquivoAdd from "assets/img/manual/arquivoAdd.png";
import imgArquivoAdm from "assets/img/manual/arquivoAdm.png";
import imgArquivoUser from "assets/img/manual/arquivoUser.png";


class HelpDesk extends React.Component {
  state = {
    selectedTab: 0,
  };

  onChange(stateName, value) {
    this.setState({
      [stateName]: value
    });
  }

  getInicioSecao(array) {
    console.log('ar', array);
    array.map(item => {
      console.log('it', item);
      return <Typography>{item}</Typography>
    })
  }

  showImage(component) {
    return <img src={component} width={800} height={450} />
  }

  render() {
    const { selectedTab } = this.state;
    console.log('selectedTab', selectedTab);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <Grid container spacing={3}>
                  <Grid item xs="3">
                    <Tabs
                      orientation="vertical"
                      value={selectedTab}
                      onChange={(e, value) => this.onChange('selectedTab', value)}
                      centered
                    >
                      {/* O DIVIDER CONTA COMO UM ITEM DA LISTA */}
                      <Tab label="Manual do Usuário" id="0" />
                      <Divider />
                      <Tab label="Recursos comuns das interfaces" id="1" />
                      <Divider />
                      <Tab label="Cadastros básicos" id="2" />
                      <Divider />
                      <Tab label="Arquivos" id="3" />
                      <Tab label="Chevalier" id="4" />
                      <Tab label="Cursos" id="5" />
                      <Tab label="Documento eleitoral" id="6" />
                      <Tab label="Fórum de dúvidas" id="7" />
                      <Tab label="Regimento interno" id="8" />
                      <Tab label="Relatórios" id="9" />
                      <Tab label="Tickets" id="10" />
                    </Tabs>
                  </Grid>
                  <Grid item xs="9">
                    <div>
                      <TabPanel value={selectedTab} index={0} id="manual">
                        <Typography variant="h4" align="center">
                          DeskGCESP
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Este manual faz parte do DeskGCESP, sistema administrativo do GCESP - Grande Conselho Estadual da Ordem DeMolay de São Paulo.
                          Ele esta dividido em seções, onde cada seção explica e detalha uma parte ou função do sistema. As seções são:
                      </Typography>
                        <Typography>- Recursos Comuns das interfaces</Typography>
                        <Typography>- Cadastros Básicos</Typography>
                        <Typography>- Arquivos</Typography>
                        <Typography>- Chevalier</Typography>
                        <Typography>- Cursos</Typography>
                        <Typography>- Documento eleitoral</Typography>
                        <Typography>- Fórum de dúvidas</Typography>
                        <Typography>- Regimento interno</Typography>
                        <Typography>- Relatórios</Typography>
                        <Typography>- Tickets</Typography>
                      </TabPanel>
                      <TabPanel value={selectedTab} index={2} id="recursosComuns">
                        <Typography variant="h4" align="center">
                          Recursos Comuns das interfaces
                        </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                        </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={4} id="crudBasico">
                        <Typography variant="h4" align="center">
                          Cadastros Básicos
                        </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                       </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={6} id="arquivo">
                        <Typography variant="h4" align="center">
                          Arquivos
                      </Typography>
                        <br /><br />
                        <Typography paragraph>
                          Na parte de administrador a tela de arquivo tem uma tabela com as colunas contendo: o nome do arquivo, seu tipo, se está visível e um botão para
                          fazer o download do arquivo. Em cima da tabela tem um botão para visualizar os tipos de arquivos e, se o usuário tiver permissão, 
                          um para disponibilizar novos arquivos. Também é possível tornar mudar a visibilidade do arquivo e excluí-lo.
                        </Typography>
                        <br/><br/>
                        {this.showImage(imgArquivoAdm)}
                        <br/><br/>
                        <Typography paragraph>
                          Para disponibilizar um novo arquivo basta clicar no botão, preencher os campos de nome e descrição, selecionar o tipo de arquivo, 
                          se ele estará visível, escolher o arquivo e clicar em disponibilzar.
                          Para alterar a visibilidade e excluir o arquivo deve-se clicar no botão de opções, selecionar a respectiva ação e clicar em confirmar.
                        </Typography>
                        <br/><br/>
                        {this.showImage(imgArquivoAdd)}
                        <br/><br/>
                        <Typography paragraph>
                          Na parte do usuário a tela possui uma lista de painéis de expansão com os arquivos. Para fazer o download deve-se
                          expandir o painel e clicar no botão Download. A parte expandida também contém o tipo e a descrição do arquivo.
                        </Typography>
                        <br/><br/>
                        {this.showImage(imgArquivoUser)}
                        <br/><br/>
                      </TabPanel>
                      <TabPanel value={selectedTab} index={7} id="chevalier">
                        <Typography variant="h4" align="center">
                          Indicação Chevalier
                      </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                      </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={8} id="curso">
                        <Typography variant="h4" align="center">
                          Cursos
                        </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                        </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={9} id="documento">
                        <Typography variant="h4" align="center">
                          Documento Eleitoral
                        </Typography>
                        <br /><br />
                        
                      </TabPanel>
                      <TabPanel value={selectedTab} index={10} id="forum">
                        <Typography variant="h4" align="center">
                          Fórum de Dúvidas
                      </Typography>
                        {/* <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                      </Typography>
                        {['Tela principal', 'Adicionar novo tópico'].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br /> */}
                        <Typography paragraph>
                          A tela inicial do fórum possui dois botões, um para visualizar as áreas do fórum e outro para adicionar um tópico, abaixo
                          está uma lista de painéis de expansão com as áreas do fórum, a parte expandida contém a descrição da área e
                          uma lista de links com tópicos dessa área, para visualizá-los é só clicar.
                        </Typography>
                        {this.showImage(imgForumPrincipal)}
                        <Typography paragraph>
                          Para adicionar um novo tópico deve-se clicar no botão de adicionar no canto superior, escolher a área do tópico e confirmar.
                          Em seguida, será encaminhado para uma nova tela onde deve-se preencher o título do tópico e seu comentário e clicar em salvar.
                        </Typography>
                        {this.showImage(imgForumAddTopico)}
                        <br /><br />
                        {this.showImage(imgForumAddTopico2)}
                        <br /><br />
                        <Typography paragraph>
                          A tela do tópico possui um cabeçalho com seu título, o usuário que criou, a data de criação, a área e se está aberto ou fechado.
                          Abaixo está uma lista de cartões com os comentários, data e nome de quem enviou. É possível escrever um comentário e responder qualquer
                          comentário de qualquer tópico que esteja aberto. Se o assunto for resolvido o tópico pode ser fechado. Além disso, qualquer tópico e
                          comentário pode ser excluído pelo usuário que o escreveu
                        </Typography>
                        <br /><br />
                        {this.showImage(imgForumTopico)}
                        <br /><br />
                        <Typography paragraph>
                          Os botões de fechar e responder o tópico estão na parte inferior da tela, enquanto o de excluir está na parte superior direita.
                          Para responder o tópico deve-se clicar no botão de responder, preencher o comentário que deseja enviar e confirmar.
                          Responder um comentário é muito parecido com responder um tópico, a diferença é que deve-se clicar no botão de responder do comentário.
                          Para fechar o tópico e excluir tanto o tópico quanto o comentário deve-ser clicar no seu respectivo botão de excluir e clicar em confirmar.
                        </Typography>
                        <br /><br />
                        {this.showImage(imgForumResponderTopico)}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={11} id="regimento">
                        <Typography variant="h4" align="center">
                          Regimento Interno
                      </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                      </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={12} id="relatorio">
                        <Typography variant="h4" align="center">
                          Relatórios
                      </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                      </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>
                      <TabPanel value={selectedTab} index={13} id="ticket">
                        <Typography variant="h4" align="center">
                          Tickets
                      </Typography>
                        <br /><br />
                        <Typography>
                          Esta seção contém os seguintes tópicos:
                      </Typography>
                        {[''].map(item => {
                          return (
                            <Typography>- {item}</Typography>
                          )
                        })}
                        <br /><br />
                      </TabPanel>

                    </div>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default HelpDesk;
