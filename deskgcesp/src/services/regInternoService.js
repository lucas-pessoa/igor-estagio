import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();
const storageRef = firebase.storage().ref();


export const enviarRegimento = (user,cap,nomeMC,emailMC,cpfMC,telefoneMC,nomePCC,emailPCC,cpfPCC,telefonePCC,arquivo,idMC,id1C,id2C,data) => {
    const regRef = databaseRef.child("regInterno").push();
    regRef.set({
        reg_cod: regRef.key,
        reg_user: user,
        reg_nomeMC: nomeMC,
        reg_emailMC: emailMC,
        reg_cpfMC: cpfMC,
        reg_telefoneMC: telefoneMC,
        reg_nomePCC: nomePCC,
        reg_emailPCC: emailPCC,
        reg_cpfPCC: cpfPCC,
        reg_telefonePCC: telefonePCC,
        reg_idMC: idMC,
        reg_id1C: id1C,
        reg_id2C: id2C,
        reg_dataEnvio: data,
        reg_status: 'Enviado',
        'capitulo' :{
            cap_nome: cap.cap_nome,
            cap_cod: cap.cap_cod,
            cap_cidade: cap.cap_cidade,
            cap_numero: cap.cap_numero
        }
    })
    .then(() => {
        const ArquivoRef = storageRef.child('regimentos/'+ regRef.key);
        ArquivoRef.put(arquivo)
        .then(() => {
            alert("Regimento Interno enviado com sucesso! Aguarde a resposta");
        })
        .catch(function(error) {
            alert("Erro ao enviar o arquivo do Regimento! Erro: " + error);
        });
    })
    .catch(function(error) {
        alert("Erro ao enviar informações do Regimento Interno! Erro: " + error);
    })
}

export const getAllRegs = async () => {
    const regRef = databaseRef.child("regInterno");
    return new Promise(function(resolve,reject) {
        regRef.on("value",snapshot => {
            let regs = snapshot.val();
            setTimeout(() => {
                if(regs)
                    resolve(regs);
                else
                    reject(null);
            },1);
        })
    })
}

export const responderReg = (id,comentario,aprovado,data) => {
    const regRef = databaseRef.child('regInterno/'+id+'/resposta');
    regRef.set({
        resp_data: data,
        resp_comentario: comentario,
        resp_aprovado: aprovado
    })
    .then(() => {
        const regRef2 = databaseRef.child('regInterno/'+id);
        //const status = aprovado == true ? 'Aprovado' : 'Reprovado';
        //console.log('status',status);
        regRef2.update({
            reg_status: aprovado
        })
        .then(() => {
            alert("Resposta enviada!");
        })
        .catch(function(error) {
            alert("Erro ao responder Regimento Interno. Erro: " + error);
        })
    })
    .catch(function(error) {
        alert("Erro ao responder Regimento Interno. Erro: " + error);
    })
}

export const getRegByUser = (user) => {
    const regRef = databaseRef.child("regInterno").orderByChild("reg_user").equalTo(user);
    return new Promise(function(resolve,reject) {
        regRef.on("value",snapshot => {
            let reg = snapshot.val();
            setTimeout(() => {
                if(reg)
                    resolve(reg);
                else
                    reject(null);
            },1);
        })
    })
}

export const deleteReg = async (id) => {
    const regRef = databaseRef.child('regInterno/'+ id);
    const arqRef = storageRef.child('regimentos/' + id);
    regRef.remove()
    .then(() => {
        arqRef.delete()
        .then(() => {
            alert("Regimento deletado com sucesso!");
        })
        .catch(function(error) {
            alert("Erro ao apagar arquivo do Regimento Interno. Erro: " + error);
        });
    })
    .catch(function(error) {
        alert("Erro ao apagar Regimento Interno. Erro: " + error);
    });

} 

export const downloadRegInterno = async (id) => {
    return new Promise(function(resolve,reject) {
        storageRef.child('regimentos/'+id).getDownloadURL()
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