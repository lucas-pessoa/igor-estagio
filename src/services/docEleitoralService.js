import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

export const enviarDocumento = (user,cap,nomeMC,emailMC,cpfMC,telefoneMC,nomePCC,emailPCC,cpfPCC,telefonePCC,arquivo,idMC,id1C,id2C,arr,data) => {
    const docRef = databaseRef.child("docEleitoral").push();
    docRef.set({
        doc_cod: docRef.key,
        doc_user: user,
        doc_nomeMC: nomeMC,
        doc_emailMC: emailMC,
        doc_cpfMC: cpfMC,
        doc_telefoneMC: telefoneMC,
        doc_nomePCC: nomePCC,
        doc_emailPCC: emailPCC,
        doc_cpfPCC: cpfPCC,
        doc_telefonePCC: telefonePCC,
        doc_idMC: idMC,
        doc_id1C: id1C,
        doc_id2C: id2C,
        doc_dataEnvio: data,
        doc_status: 'Enviado',
        'capitulo' :{
            cap_nome: cap.cap_nome,
            cap_cod: cap.cap_cod,
            cap_cidade: cap.cap_cidade,
            cap_numero: cap.cap_numero
        }
    })
    .then(() => {
        //ver a opcao/arr, se for um faz de um jeito senao outro
        //2o semestre
        const datasRef = databaseRef.child("docEleitoral/" + docRef.key + "/atividades");
        datasRef.set({
            dataInstalacao: arr[0],
            dataIniciacao: arr[1],
            dataElevacao: arr[2],
            dataDiaPais: arr[3],
            dataDiaPatriota: arr[4],
            dataDiaEducacional: arr[5],
            dataDiaGoverno: arr[6],
            dataDiaConforto: arr[7],
            dataDiaMemoriaFSL: arr[8],
        })
        .then(() => {
            const ArquivoRef = storageRef.child('atasDocEleitoral/'+ docRef.key);
            ArquivoRef.put(arquivo)
            .then(() => {
                alert("Documento eleitoral enviado com sucesso! Aguarde a resposta");
            })
            .catch(function(error) {
                alert("Erro ao enviar a Ata de eleição! Erro: " + error);
            });
        })
        .catch(function(error) {
            alert("Erro ao enviar as datas do documento eleitoral! Erro: " + error);
        })
    })
    .catch(function(error) {
        alert("Erro ao enviar informações do documento eleitoral! Erro: " + error);
    })
}
export const getAllDocs = async () => {
    const docRef = databaseRef.child("docEleitoral");
    return new Promise(function(resolve,reject) {
        docRef.on("value",snapshot => {
            let docs = snapshot.val();
            setTimeout(() => {
                if(docs)
                    resolve(docs);
                else
                    reject(null);
            },1);
        })
    })
}

export const responderDoc = (id,comentario,aprovado,data) => {
    const docRef = databaseRef.child('docEleitoral/' + id + '/resposta');
    docRef.set({
        resp_data: data,
        resp_comentario: comentario,
        resp_aprovado: aprovado
    })
    .then(() => {
        const docRef2 = databaseRef.child('docEleitoral/' + id);
        docRef2.update({
            doc_status: aprovado
        })
        .then(() => {
            alert("Resposta enviada!");
        })
        .catch(function(error) {
            alert("Erro ao responder documento! Erro: " + error );
        });
    })
    .catch(function(error) {
        alert("Erro ao responder documento! Erro: " + error );
    });
}

export const getDocByUser = async (user) => {
    const docRef = databaseRef.child("docEleitoral").orderByChild("doc_user").equalTo(user);
    return new Promise(function(resolve,reject) {
        docRef.on("value",snapshot => {
            let doc = snapshot.val();
            setTimeout(() => {
                if(doc)
                    resolve(doc);
                else
                    reject(null);
            },1);
        })
    })
}

export const deleteDoc = (id) => {
    const docRef = databaseRef.child('docEleitoral/'+ id);
    const ataRef = storageRef.child('atasDocEleitoral/' + id);
    docRef.remove()
    .then(() => {
        ataRef.delete()
        .then(() => {
            alert("Documento deletado com sucesso!");
        })
        .catch(function(error) {
            alert("Erro ao apagar Ata do Documento Eleitoral. Erro: " + error);
        });
    })
    .catch(function(error) {
        alert("Erro ao apagar Documento Eleitoral. Erro: " + error);
    });
}

export const downloadAtaDoc = async (id) => {
    return new Promise(function(resolve,reject) {
        storageRef.child('atasDocEleitoral/'+id).getDownloadURL()
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
}