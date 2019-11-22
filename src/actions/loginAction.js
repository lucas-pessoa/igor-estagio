import firebase from "firebaseConfig";
import {getUserPermissions} from "services/superadmService.js"; 

const loginAction = (email, password) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that login was succesful

    .then(function(user) {
      dispatch({ type: "login", payload: user });
      const response = getUserPermissions(user.user.uid);
      response.then(permissions => {
        if(permissions)
          dispatch({ type: "getPermissions", payload: permissions });
      })

      //agora: ver como pegar as permissions do user
      
    })
    // if the login was not succesful we can catch the erros here

    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error

      alert("Erro ao logar: " + error);
    });
};
export default loginAction;
