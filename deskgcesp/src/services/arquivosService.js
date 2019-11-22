import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

/* TIPOS DE ARQUIVOS */

export const addTipoArquivo = (nome,descricao) => {
    const tipoArquivoRef = databaseRef.child("tipoarquivo").push();
    tipoArquivoRef.set({
      tipoarquivo_cod: tipoArquivoRef.key,
      tipoarquivo_nome: nome,
      tipoarquivo_descricao: descricao
    })
    .then(() => {
      alert("Tipo de arquivo inserido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const deleteTipoArquivo = (idTipoArquivo) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const TipoArquivoRef = databaseRef.child("tipoarquivo/"+idTipoArquivo);
    TipoArquivoRef.remove()
    .then(() => {
      alert("Tipo de arquivo exluido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getAllTipoArquivo = async () => {
    const TipoArquivoRef = databaseRef.child("tipoarquivo");
    return new Promise(function(resolve,reject) {
        TipoArquivoRef.on("value", snapshot => {
            let tipos = snapshot.val();
            setTimeout(() => {
                if(tipos)
                    resolve(tipos);
                else
                    reject(null);
            },1)
        });
    })
};

export const updateTipoArquivo = (id,nome,descricao) => {
    // ver de enviar usuario, ai ao inves de anonimaneto vai ser real
    const TipoArquivoRef = databaseRef.child("tipoarquivo/"+id);
    TipoArquivoRef.update({
      tipoarquivo_nome: nome,
      tipoarquivo_descricao: descricao
    })
    .then(() => {
      alert("Tipo de arquivo alterado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
};

export const getTipoId = (id) => {
  const TipoArquivoRef = databaseRef.child("tipoarquivo/"+id);
    return new Promise(function(resolve,reject) {
        TipoArquivoRef.on("value", snapshot => {
            let tipo = snapshot.val();
            setTimeout(() => {
                if(tipo)
                    resolve(tipo);
                else
                    reject(null);
            },1)
        });
    })
}

/* ARQUIVOS */

export const uploadArquivo = (nome,descricao,idTipoArq,visivel,arq) => {
  const dbArquivoRef = databaseRef.child("arquivo").push();
  dbArquivoRef.set({
      arquivo_cod: dbArquivoRef.key,
      arquivo_nome: nome,
      arquivo_descricao: descricao,
      // arquivo_dataVisivelInicio: dataInicio,
      // arquivo_dataVisivelFim: dataFim,
      arquivo_visivel: visivel,
      tipoarquivo_cod: idTipoArq
  })
  .then(() => {
    const ArquivoRef = storageRef.child('disponiveis/'+dbArquivoRef.key);
    ArquivoRef.put(arq)
    .then(() => {
      alert("Arquivo enviado com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
  })
  .catch(function(error) {
    alert(error);
  });
}

export const getAllArquivos = async () => {
  const ArquivoRef = databaseRef.child("arquivo");
    return new Promise(function(resolve,reject) {
        ArquivoRef.on("value", snapshot => {
            let files = snapshot.val();
            setTimeout(() => {
                if(files)
                    resolve(files);
                else
                    reject(null);
            },1)
        });
    })
}

export const downloadArquivo = async (idArq,idUser,data) => {
  return new Promise(function(resolve,reject) {
    const dbRef = databaseRef.child('downloads/' + idArq).push();
    dbRef.set({
      download_cod: dbRef.key,
      download_user: idUser,
      download_data: data
    })
    .then(() => {
      storageRef.child('disponiveis/'+idArq).getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var file = xhr.response;
          resolve(file);
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        alert("Erro ao baixar arquivo!! Erro: " + error);
        reject(error);
      })
    })
    .catch(function(error) {
      alert("Erro ao baixar arquivo!! Erro: " + error);
      reject(null)
    })    
  })
}

export const deleteArquivo = (idArq) => {
  const ArquivoRef = databaseRef.child("arquivo/"+idArq);
  const ArquivoStorageRef = storageRef.child("disponiveis/"+idArq);
  
  ArquivoRef.remove()
  .then(() => {
    ArquivoStorageRef.delete()
    .then(() => {
      alert("Arquivo exluido com sucesso!");
    })
    .catch(function(error) {
      alert(error);
    });
  })
  .catch(function(error) {
    alert(error);
  });
}

export const getArquivosVisibilidade = (value) => {
  const arqRef = databaseRef.child('arquivo/').orderByChild('arquivo_visivel').equalTo(value);
  return new Promise(function(resolve,reject) {
    arqRef.once("value", snapshot => {
        let files = snapshot.val();
        setTimeout(() => {
            if(files)
                resolve(files);
            else
                reject(null);
        },1)
    });
})
}

export const mudarVisibilidade = (id,value) => {
  const ref = databaseRef.child('arquivo/'+id);
  ref.update({
    arquivo_visivel: value
  })
  .then(() => {
    return 
  })
  .catch(function(error){
    alert("Erro ao mudar visilidade do arquivo! Erro: " + error);
  }); 
}