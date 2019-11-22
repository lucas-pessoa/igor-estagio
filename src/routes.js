import Index from "views/Index.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";

import Tickets from "views/tickets/Tickets.jsx";
import Cursos from "views/cursos/Cursos.jsx";
import Arquivos from "views/arquivos/Arquivos.jsx";

 /* Gerenciamento Básico */
import AreaTicket from "views/tickets/AreaTicket.jsx";
import AddAreaTicket from "views/tickets/AddAreaTickets.jsx";
import AreaCurso from "views/cursos/AreaCurso.jsx";
import AddAreaCurso from "views/cursos/AddAreaCurso.jsx";
import AddCurso from "views/cursos/AddCurso.jsx";
import AreaForum from "views/forum/AreaForum.jsx";
import AddAreaForum from "views/forum/AddAreaForum.jsx";
import TipoArquivo from "views/arquivos/TipoArquivos.jsx";
import AddTipoArquivo from "views/arquivos/AddTipoArquivo.jsx";
import AddArquivo from "views/arquivos/AddArquivo.jsx";

/* Fundamentais */

import CursosUSER from "views/cursos/cursosUSER.jsx";
import AddVideoAula from "views/cursos/addVideoAula.jsx";
import InscricaoCurso from "views/cursos/InscricaoCurso.jsx";

import AbrirTicket from "views/tickets/AbrirTicket.jsx";
import TicketsUSER from "views/tickets/TicketsUser.jsx";
import VisualizarTicket from "views/tickets/VisualizarTicket.jsx";

import Documentos from "views/docEleitoral/Documentos.jsx";
import EnviarDocumentoEleitoral from "views/docEleitoral/EnviarDocumentoEleitoral.jsx";
import ResponderDocumentoEleitoral from "views/docEleitoral/ResponderDocumentoEleitoral.jsx";
import DocumentosUSER from "views/docEleitoral/DocumentosUSER.jsx";

import Regimentos from "views/regInterno/Regimentos.jsx";
import EnviarRegimentoInterno from "views/regInterno/EnviarRegimentoInterno.jsx";
import ResponderRegimentoInterno from "views/regInterno/ResponderRegimentoInterno.jsx";
import RegimentosUSER from "views/regInterno/RegimentosUSER.jsx";

import DownlodArquivos from "views/arquivos/DownloadArquivos.jsx";

import IndicacoesChevalier from "views/chevalier/Indicacoes.jsx";
import IndicarChevalier from "views/chevalier/IndicarChevalier.jsx";
import VotarChevalier from "views/chevalier/VotarChevalier.jsx";
import ChevalierUSER from "views/chevalier/ChevalierUSER.jsx";
import VisualizarIndicacao from "views/chevalier/VisualizarIndicacao.jsx";

import Forum from "views/forum/Forum.jsx";
import VisualizarTopico from "views/forum/VisualizarTopico.jsx";
import VisualizarAreaForum from "views/forum/VisualizarArea.jsx";
import AddTopico from "views/forum/AddTopico.jsx";

import USERS from "views/superadm/Users.jsx";
import CAPITULOS from "views/superadm/Capitulos.jsx";

import RELATORIOS from "views/report/Relatorios.jsx";

import Help from "views/help/HelpDesk.jsx";

var routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
    sidebar: false
    //fazer atributo permission ? (só para os que tem sidebar: true, se for false significa que ja nao aparece de qualquer jeito, é só caminho)
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Register,
    layout: "/auth",
    sidebar: false
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN','ACCESS_USER']
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-support-16 text-red",
    component: Tickets,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/cursos",
    name: "Cursos",
    icon: "ni ni-hat-3 text-yellow",
    component: Cursos,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/arquivos",
    name: "Arquivos",
    icon: "ni ni-cloud-download-95 text-blue",
    component: Arquivos,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/forum",
    name: "Fórum de dúvidas",
    icon: "ni ni-chat-round text-orange",
    component: Forum,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER','ACCESS_ADMIN']
  },
  {
    path: "/area-ticket",
    name: "Área dos Tickets",
    component: AreaTicket,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-area-ticket",
    name: "Área dos tickets",
    component: AddAreaTicket,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/area-cursos",
    name: "Área dos Cursos",
    component: AreaCurso,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-area-cursos",
    name: "Área dos Cursos",
    component: AddAreaCurso,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-cursos",
    name: "Adicionar cursos",
    component: AddCurso,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/area-forum",
    name: "Área do Fórum de Dúvidas",
    component: AreaForum,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-area-forum",
    name: "Área do Fórum de Dúvidas",
    component: AddAreaForum,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/tipo-arquivo",
    name: "Tipos de arquivos",
    component: TipoArquivo,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-tipo-arquivo",
    name: "Tipos de arquivos",
    component: AddTipoArquivo,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-arquivos",
    name: "Adicionar arquivos",
    component: AddArquivo,
    layout: "/admin",
    sidebar: false
  },
  {// o real nao vai ser /admin
    path: "/cursosUSER",
    name: "Lista de cursos",
    component: CursosUSER,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/add-videoaula",
    name: "Adicionar vídeo aula",
    component: AddVideoAula,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/inscricao-curso",
    name: "Realizar inscrição em curso",
    component: InscricaoCurso,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/abrir-ticket",
    name: "Abrir ticket",
    component: AbrirTicket,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/ticketsUSER",
    name: "Tickets",
    component: TicketsUSER,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/ver-ticket",
    name: "Ticket",
    component: VisualizarTicket,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/docsEleitorais",
    name: "Documentos eleitorais",
    component: Documentos,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/enviar-docEleitoral",
    name: "Enviar documento eleitoral",
    component: EnviarDocumentoEleitoral,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/responder-docEleitoral",
    name: "Responder documento eleitoral",
    component: ResponderDocumentoEleitoral,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/regsInterno",
    name: "Regimentos internos",
    component: Regimentos,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/enviar-regInterno",
    name: "Enviar regimento interno",
    component: EnviarRegimentoInterno,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/responder-regInterno",
    name: "Responder regimento interno",
    component: ResponderRegimentoInterno,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/documentoEleitoral",
    name: "Documento Eleitoral",
    component: DocumentosUSER,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/regimentoInterno",
    name: "Regimento Interno",
    component: RegimentosUSER,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/downloads",
    name: "Arquivos",
    component: DownlodArquivos,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/indicacoes",
    name: "Indicações Chavelier",
    component: IndicacoesChevalier,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/indicarChevalier",
    name: "Indicar Chevalier",
    component: IndicarChevalier,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/chevalier",
    name: "Chevalier",
    component: ChevalierUSER,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_USER']
  },
  {
    path: "/votarChevalier",
    name: "Votar para Chevalier",
    component: VotarChevalier,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/ver-indicacao",
    name: "Visualizar Indicação Chevalier",
    component: VisualizarIndicacao,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/add-topico",
    name: "Adicionar Tópico",
    component: AddTopico,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/visualizaTopico",
    name: "Detalhes do tópico",
    component: VisualizarTopico,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/visualizaAreaForum",
    name: "Detalhes da Área do Fórum",
    component: VisualizarAreaForum,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: USERS,
    layout: "/admin",
    sidebar: true,
    permission: ['EDIT_USERROLE']
  },
  {
    path: "/relatorios",
    name: "Relatórios",
    component: RELATORIOS,
    layout: "/admin",
    sidebar: true,
    permission: ['EDIT_USERROLE']
  },
  {
    path: "/capitulos",
    name: "Capítulos",
    component: CAPITULOS,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN']
  },
  {
    path: "/ajuda",
    name: "HelpDesk",
    component: Help,
    layout: "/admin",
    sidebar: true,
    permission: ['ACCESS_ADMIN','ACCESS_USER']
  }
  
];
export default routes;
