import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

export const indicarChevalier = (user, nomePCC, emailPCC, cpfPCC, telefonePCC, nomeIndicado, idIndicado, cap, arquivo, data) => {
    console.log('indiccc',cap);
    const indicacaoRef = databaseRef.child('indicacao').push();
    indicacaoRef.set({
        indic_cod: indicacaoRef.key,
        indic_user: user,
        indic_nomeIndicado: nomeIndicado,
        indic_idIndicado: idIndicado,
        indic_dataEnvio: data,
        indic_nomePCC: nomePCC,
        indic_emailPCC: emailPCC,
        indic_cpfPCC: cpfPCC,
        indic_telefonePCC: telefonePCC,
        indic_status: 'Enviado',
        'capitulo' :{
            cap_nome: cap.cap_nome,
            cap_cod: cap.cap_cod,
            cap_cidade: cap.cap_cidade,
            cap_numero: cap.cap_numero
        }
    })
    .then(() => {
        const fichaRef = storageRef.child('fichasChevalier/' + indicacaoRef.key);
        fichaRef.put(arquivo)
            .then(() => {
                alert("Indicação enviada com sucesso! Seu pedido será analisado e respondido em breve");
            })
            .catch(function (error) {
                alert("Erro ao enviar ficha de indicação: Erro: " + error);
            })
    })
    .catch(function (error) {
        alert("Erro ao indicar membro Chevalier! Erro: " + error);
    })
}

export const getIndicacoesByUser = async (id) => {
    const ref = databaseRef.child('indicacao/').orderByChild('indic_user').equalTo(id);
    return new Promise(function (resolve, reject) {
        ref.once('value', snapshot => {
            let indic = snapshot.val();
            setTimeout(() => {
                if (indic)
                    resolve(indic);
                else
                    reject(null);
            }, 1)
        });
    });
}

export const getAllIndicacoes = async () => {
    const ref = databaseRef.child('indicacao');
    return new Promise(function (resolve, reject) {
        ref.once('value', snapshot => {
            let indic = snapshot.val();
            setTimeout(() => {
                if (indic)
                    resolve(indic);
                else
                    reject(null);
            }, 1)
        });
    });
}

export const downloadFichaModelo = async () => {
    return new Promise(function (resolve, reject) {
        storageRef.child('modeloFichaIndicacao.pdf').getDownloadURL()
        .then((url) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
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
    });
}

export const downloadFicha = async (id) => {
    return new Promise(function (resolve, reject) {
        storageRef.child('fichasChevalier/' + id).getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
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
    });
}

export const deleteIndicacao = (id) => {
    const indicRef = databaseRef.child('indicacao/' + id);
    const fichaRef = storageRef.child('fichasChevalier/' + id);
    indicRef.remove()
        .then(() => {
            fichaRef.delete()
                .then(() => {
                    alert("Indicação deletada com sucesso!");
                })
                .catch(function (error) {
                    alert("Erro ao apagar ficha de indicação. Erro: " + error);
                });
        })
        .catch(function (error) {
            alert("Erro ao apagar indicação. Erro: " + error);
        });
}

export const encaminharIndicacao = (idIndicacao, data) => {
    const indicRef = databaseRef.child('indicacao/' + idIndicacao);
    indicRef.update({
        indic_status: 'Encaminhado'
    })
        .then(() => {
            const votacaoRef = databaseRef.child('votacao/' + idIndicacao);
            votacaoRef.set({
                votacao_dataEncaminhado: data,
                votacao_iniciada: false,
                votacao_encerrada: false
            })
                .then(() => {
                    alert("Indicação encaminhada para votação!!");
                })
                .catch(function (error) {
                    alert('Erro ao encaminhar indicação para votação. Erro: ' + error);
                })
        })
        .catch(function (error) {
            alert('Erro ao encaminhar indicação para votação. Erro: ' + error);
        })
}

export const getVotacao = async (id) => {
    const ref = databaseRef.child('votacao/' + id);
    return new Promise(function (resolve, reject) {
        ref.once('value', snapshot => {
            let vot = snapshot.val();
            setTimeout(() => {
                if (vot)
                    resolve(vot);
                else
                    reject(null);
            }, 1)
        });
    });
}

export const abrirVotacao = (id, data) => {
    const refVotacao = databaseRef.child('votacao/' + id);
    const refIndicacao = databaseRef.child('indicacao/' + id);
    refVotacao.update({
        votacao_iniciada: true,
        votacao_dataAbertura: data
    })
    .then(() => {
        refIndicacao.update({
            indic_status: 'Votacao'
        })
            .then(() => {
                alert('Votação aberta com sucesso!!');
            })
            .catch(function (error) {
                alert("Erro ao abrir votação. Erro: " + error);
            })
    })
    .catch(function (error) {
        alert("Erro ao abrir votação. Erro: " + error);
    })

}

export const getAllVotos = async (id) => {
    const ref = databaseRef.child('votacao/'+id+'/votos');
    return new Promise(function (resolve, reject) {
        ref.once('value', snapshot => {
            let vot = snapshot.val();
            setTimeout(() => {
                if (vot)
                    resolve(vot);
                else
                    reject(null);
            }, 1)
        });
    });
}

export const encerrarVotacao = (id,data) => { //quando encerra ele verifica todos os votos e diz se foi aprovado ou reprovado
    const indicRef = databaseRef.child('indicacao/'+id);
    const votacaoRef = databaseRef.child('votacao/' + id);
    const response = getAllVotos(id);
    let aprovados = 0, reprovados = 0,status;

    response.then((votos) => {
        Object.keys(votos).forEach(item => {
            if(votos[item].voto_aprovado === 'true')
                aprovados++;
            else 
                reprovados++;
        });
        if(aprovados > reprovados)
            status = "Aprovado";
        else status = "Reprovado";

        votacaoRef.update({
            votacao_encerrada: true,
            votacao_dataEncerramento: data,
            votacao_aprovados: aprovados,
            votacao_reprovados: reprovados
        })
        .then(() => {
            indicRef.update({
                indic_status: status
            })
            .then(() => {
                alert('Votação encerrada com sucesso!!');
            })
            .catch(function (error) {
                alert("Erro ao encerrar votação. Erro: " + error);
            })
        })
        .catch(function (error) {
            alert("Erro ao encerrar votação. Erro: " + error);
        })
    })
    .catch(function (error) {
        alert("Erro ao encerrar votação. Erro: " + error);
    })
}

export const votar = (id, user, aprovado, comentario, data) => {
    const ref = databaseRef.child('votacao/' + id + '/votos').push();
    ref.set({
        voto_data: data,
        voto_aprovado: aprovado,
        voto_user: user,
        voto_comentario: comentario
    })
        .then(() => {
            alert("Voto realizado com sucesso!");
        })
        .catch(function (error) {
            alert("Erro ao votar. Erro: " + error);
        })
}