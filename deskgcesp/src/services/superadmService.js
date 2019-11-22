import firebase from "firebaseConfig";
const databaseRef = firebase.database().ref();

export const getAllUsers = async () => {
    const ref = databaseRef.child("user-details");
    return new Promise(function(resolve,reject) {
        ref.on("value", snapshot => {
            let users = snapshot.val();
            setTimeout(() => {
                if(users)
                    resolve(users);
                else
                    reject(null);
            },1)
        });
    })
}

export const getAllRoles = async () => {
    const ref = databaseRef.child("roles");
    return new Promise(function(resolve,reject) {
        ref.once("value", snapshot => {
            let roles = snapshot.val();
            setTimeout(() => {
                if(roles)
                    resolve(roles);
                else
                    reject(null);
            },1)
        });
    })
}

export const changeRole = (userId,role) => {
    const userRef = databaseRef.child("user-details").orderByChild('userId').equalTo(userId);
    userRef.once("value", snapshot => {
        snapshot.forEach(function(snapUser) {
            const updateRef = databaseRef.child("user-details/"+ snapUser.key);
            updateRef.update({
                userRole: role
            })
            .then(() => {
                alert("Papel do usuário salvo com sucesso!");
            })
            .catch(function(error) {
                alert("Erro ao alterar papel do usuário!Erro: " + error);
            })
        })

    })
}

export const getUserPermissions = async (userId) => {
    const userRef = databaseRef.child("user-details").orderByChild('userId').equalTo(userId);
    return new Promise(function(resolve,reject) {
        userRef.once("value", snapshot => {
            snapshot.forEach(function(snapUser) {
                const ref = databaseRef.child("roles_permissions").child(snapUser.val().userRole);
                ref.once("value", snapshot => {
                    let permissions = snapshot.val();
                    setTimeout(() => {
                        if(permissions)
                            resolve(permissions);
                        else
                            reject(null);
                    },1);
                });
            });
        });
    })
}

export const getUserDetailByID = async (userId) => {
    const userRef = databaseRef.child("user-details").orderByChild('userId').equalTo(userId);
    return new Promise(function(resolve,reject) {
        userRef.once("value", snapshot => {
            let user = snapshot.val();
            setTimeout(() => {
                if(user)
                    resolve(user);
                else
                    reject(null);
            },1);
        });
    })
}


// *** CAPÍTULOS ***

export const getAllCapitulos = async () => {
    const ref = databaseRef.child("capitulo").orderByChild("cap_nome");
    return new Promise(function(resolve,reject) {
        ref.once("value", snapshot => {
            let caps = snapshot.val();
            setTimeout(() => {
                if(caps)
                    resolve(caps);
                else
                    reject(null);
            },1)
        });
    })
}

export const addCapitulo = (nome,numero,cidade) => {
    const ref = databaseRef.child("capitulo").push();
    ref.set({
        cap_cod: ref.key,
        cap_nome: nome,
        cap_numero: numero,
        cap_cidade: cidade
    })
    .then(() => {
        alert('Capítulo adicionado com sucesso!');
    })
    .catch(function(error){
        
        alert('Erro ao adicionar capítulo. Erro: '+ error);
    })
}

export const updateCapitulo = (id,nome,numero,cidade) => {
    const ref = databaseRef.child("capitulo/"+id);
    ref.update({
        cap_nome: nome,
        cap_numero: numero,
        cap_cidade: cidade
    })
    .then(() => {
        alert('Capítulo alterado com sucesso!');
    })
    .catch(function(error){
        alert('Erro ao alterar capítulo. Erro: '+ error);
    })
}

export const deleteCapitulo = (id) => {
    const ref = databaseRef.child("capitulo/" + id);
    ref.remove()
    .then(() => {
        alert('Capítulo excluido com sucesso!');
    })
    .catch(function(error){
        alert('Erro ao excluir capítulo. Erro: '+ error);
    })
}