import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();

export const addAreaForum = (nome,descricao) => {

  // AREA

  const AreaForumRef = databaseRef.child("areaforum").push();
  AreaForumRef.set({
    areaforum_cod: AreaForumRef.key,
    areaforum_nome: nome,
    areaforum_descricao: descricao
  })
  .then(() => {
    alert("Area do fórum inserido com sucesso!");
  })
  .catch(function(error) {
    alert(error);
  });
};

export const deleteAreaForum = (idAreaForum) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaForumRef = databaseRef.child("areaforum/"+idAreaForum);
    AreaForumRef.remove()
    .then(() => {
      alert("Area exluida com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getAllAreaForum = async () => {
    const AreaForumRef = databaseRef.child("areaforum");
    return new Promise(function(resolve,reject) {
        AreaForumRef.on("value", snapshot => {
            let areas = snapshot.val();
            setTimeout(() => {
                if(areas)
                    resolve(areas);
                else
                    reject(null);
            },1)
        });
    })
};

export const updateAreaForum = (id,nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaForumRef = databaseRef.child("areaforum/"+id);
    AreaForumRef.update({
      areaforum_nome: nome,
      areaforum_descricao: descricao
    })
    .then(() => {
      alert("Area do curso alterado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

//FORUM

export const addTopico = (user,userName,idArea,titulo,descricao,data) => {
    const topicoRef = databaseRef.child("topico/"+idArea).push();
    topicoRef.set({
      topico_cod: topicoRef.key,
      topico_user: user,
      topico_username: userName,
      topico_data: data,
      topico_titulo: titulo,
      topico_aberto: true,
      topico_descricao: descricao
    })
    .then(() => {
      alert("Topico adicionado com sucesso!");
    })
    .catch(function(error){
      alert("Erro ao adicionar tópico! Erro: " + error);
    })
};

export const addComentario = (user,userName,idTopico,comentario,data) => {
    const comentRef = databaseRef.child("comentario/"+idTopico).push();
    comentRef.set({
      coment_user: user,
      coment_username: userName,
      comentario: comentario,
      coment_data: data,
      coment_cod: comentRef.key
    })
    .then(() => {
      alert("Comentário adicionado com sucesso!");
    })
    .catch(function(error){
      alert("Erro ao adicionar comentário! Erro: " + error);
    })
}

export const getAllTopicos = async () => {
  const topicosRef = databaseRef.child("topico");
    return new Promise(function(resolve,reject) {
      topicosRef.on("value", snapshot => {
            let topicos = snapshot.val();
            setTimeout(() => {
                if(topicos)
                    resolve(topicos);
                else
                    reject(null);
            },1)
        });
    })
}

export const getComentarios = async (id) => {
  const ref = databaseRef.child('comentario/'+id);
  return new Promise(function(resolve,reject) {
    ref.once("value", snapshot => {
      let coments = snapshot.val();
      setTimeout(() => {
        if(coments)
          resolve(coments);
        else 
          reject(coments);
      },1)
    });
  })
}

export const deleteComentario = (idTopico,idComentario) => {
  const ref = databaseRef.child('comentario/' + idTopico + '/' + idComentario);
  ref.remove()
  .then(() => {
    alert('Comentário excluido com sucesso!');
  })
  .catch(function(error){
    alert('Erro ao excluir comentário! Erro: '+ error);
  })

}

export const fecharTopico = (idArea,idTopico,data,user) => {
  const refTopico = databaseRef.child('topico/' + idArea + '/' + idTopico);
  refTopico.update({
    topico_aberto: false
  })
  .then(() => {
    const refFechamento = databaseRef.child('topico/' + idArea + '/' + idTopico + '/fechamento/');
    refFechamento.set({
      fechamento_user: user,
      fechamento_data: data
    })
    .then(() => {
      alert('Topico fechado com sucesso!');
    })
    .catch(function(error){
      alert('Erro ao fechar tópico. Erro: '+ error);
    })
  })
  .catch(function(error){
    alert('Erro ao fechar tópico. Erro: '+ error);
  })
}

export const deleteTopico = (idArea,idTopico) => {
  const refTopico = databaseRef.child('topico/' + idArea + '/' + idTopico);
  const refComentario = databaseRef.child('comentario/' + idTopico);
  refTopico.remove()
  .then(() => {
      refComentario.remove()
      .then(() => {
        alert('Tópico excluido com sucesso!');
      })
      .catch(function(error){
        alert('Erro ao excluir comentários do tópico! Erro: '+ error);
      })
  })
  .catch(function(error){
    alert('Erro ao excluir tópico! Erro: '+ error);
  })
}

export const responderComentario = (user,userName,idTopico,idComentario,comentario,data) => {
  const comentRef = databaseRef.child("comentario/"+idTopico + "/" + idComentario + "/respostas/").push();
  comentRef.set({
    resposta_user: user,
    resposta_username: userName,
    resposta: comentario,
    resposta_data: data,
    resposta_cod: comentRef.key
  })
  .then(() => {
    alert("Resposta ao comentário adicionada com sucesso!");
  })
  .catch(function(error){
    alert("Erro ao adicionar resposta! Erro: " + error);
  })
}

export const deleteRespostaComentario = (idTopico,idComentario,idResposta) => {
  const ref = databaseRef.child('comentario/' + idTopico + '/' + idComentario + "/respostas/" + idResposta);
  ref.remove()
  .then(() => {
    alert('Resposta excluida com sucesso!');
  })
  .catch(function(error){
    alert('Erro ao excluir resposta! Erro: '+ error);
  })
}