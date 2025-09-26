
const passwordValidation = (password)=>{
    if(password.length < 6) return
    let u=false,l=false,d=false,s=false

    for(let i=0;i<password.length;i++){
        const ch = password[i]

        if(ch >= "0" && ch <="9"){
            d=true;
        }
        else if(ch >= "a" && ch <="z"){
            l=true
        }
          else if(ch >= "A" && ch <="z"){
            u=true
        }
        else{
            s=true
        }
    }
    return u && d && l && s;
}

module.exports = passwordValidation