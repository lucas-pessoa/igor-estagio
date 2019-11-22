import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

/* AREA CURSO */
export const addAreaCurso = (nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("areacurso").push();
    AreaCursoRef.set({
      areacurso_cod: AreaCursoRef.key,
      areacurso_nome: nome,
      areacurso_descricao: descricao
    })
    .then(() => {
      alert("Area do curso inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const deleteAreaCurso = (idAreaCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("areacurso/"+idAreaCurso);
    AreaCursoRef.remove()
    .then(() => {
      alert("Area exluida com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getAllAreaCursos = async () => {
    const AreaCursoRef = databaseRef.child("areacurso");
    return new Promise(function(resolve,reject) {
        AreaCursoRef.on("value", snapshot => {
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

export const updateAreaCurso = (id,nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("areacurso/"+id);
    AreaCursoRef.update({
      areacurso_nome: nome,
      areacurso_descricao: descricao
    })
    .then(() => {
      alert("Area do curso alterado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

/* CURSO */

export const addCurso = (nome,descricao,areaCod,dataInicio,dataFim,imgCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const CursoRef = databaseRef.child("curso").push();
    CursoRef.set({
      curso_cod: CursoRef.key,
      curso_nome: nome,
      curso_descricao: descricao,
      curso_dataInicio: dataInicio,
      curso_dataFim: dataFim,
      areacurso_cod: areaCod
    })
    .then(() => {
      if(imgCurso) {
        const imgCursoRef = storageRef.child('imgCurso/'+CursoRef.key);
        imgCursoRef.put(imgCurso)
        .then(() => {
          alert("Curso inserido com sucesso!");
        })
        .catch(function(error) {
          alert(error);
        });
      }
      else
        alert("Curso inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
  };

  export const deleteCurso = (id) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const CursoRef = databaseRef.child("curso/"+id);
    CursoRef.remove()
    .then(() => {
      const imgRef = storageRef.child("imgCurso/"+id);
      imgRef.getDownloadURL() //se existir imagem exclui
      .then((url) => {
        if(url) {
          imgRef.delete().then(() => {
            alert("Curso exluido com sucesso!");
          })
          .catch(function(error) {
            alert("Erro ao exlcuir imagem do curso: " + error)
          })
        }
      })
    })
    .catch(function(error) {
      alert("Erro ao exlcuir curso: " + error);
    });
          
};

export const getAllCursos = async () => {
    const CursoRef = databaseRef.child("curso");
    return new Promise(function(resolve,reject) {
        CursoRef.on("value", snapshot => {
        let cursos = snapshot.val();
        setTimeout(() => {
            if(cursos)
                resolve(cursos);
            else
                reject(null);
        },1)
        
        });
    })
};

export const updateCurso = (id,nome,descricao,areaCod,dataInicio,dataFim,imgCurso,prevImgCurso) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const AreaCursoRef = databaseRef.child("curso/"+id);
    AreaCursoRef.update({
      curso_nome: nome,
      curso_descricao: descricao,
      curso_dataInicio: dataInicio,
      curso_dataFim: dataFim,
      areacurso_cod: areaCod
    })
    .then(() => {
      const imgRef = storageRef.child("imgCurso/"+id);
      if(imgCurso) { //tem uma nova imagem
        if(prevImgCurso) { //se existe uma imagem ela deve ser apagada
          imgRef.delete().then(() => {
            imgRef.put(imgCurso)
            .then(() => {
              alert("Curso alterado com sucesso!");
            })
            .catch(function(error) {
              alert(error);
            });
          })
          .catch(function(error) {
            alert("Erro ao alterar imagem do curso" + error);
          })
        }
        else {
          imgRef.put(imgCurso)
          .then(() => {
            alert("Curso alterado com sucesso!");
          })
          .catch(function(error) {
            alert(error);
          });
        }
      }
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getImgCurso = async (id) => {
  return new Promise(function(resolve,reject) {
    storageRef.child('imgCurso/'+id).getDownloadURL()
    .then((url) => {
      if(url)
        resolve(url);
    })
    .catch((error) => {
      reject(error);
    })
  })
}

/* VIDEO AULA */

export const addVideoAula = () => {

}