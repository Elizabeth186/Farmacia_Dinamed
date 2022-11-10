export const validadoemail = (text) => {
    let car = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (car.test(text) === false){
        return false;
    }else{
        return true;
    }
}

export const validandocontraseña = (text) => {
    let con = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (con.test(text) === false){
        return false;
    }else{
        return true;
    }
}

export const validandoemailpropietario = (text) =>{

   let emailp = /^El@gmail.com$/
   
    if(emailp.test(text) === false){
        return false;
      }else {
            return true;
        }
    }
