export default (state = {}, action) => {
  switch (action.type) {
    // in both cases, we want to tell our app,
    // if the user is logged in or not
    // if the user registers, he will automatically be logged in
    case "register":
      console.log("register is ", action.payload);
      return {
        // keep old state
        ...state,
        // add true/false if the user is or not logged in
        loggedIn: action.payload
      };
    case "login":
      console.log("login is true, user:", action.payload);
      return {
        // keep old state
        ...state,
        // add true/false if the user is or not logged in
        loggedIn: true,
        user: action.payload

      };
    case "getPermissions":
      return {
        ...state,
        permissions: action.payload
      }
    default:
      return state;
  }
};
