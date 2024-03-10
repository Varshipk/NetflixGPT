export const isValidData =(email,password,name)=>{
    const validEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validPassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validName=/^(?=.{5,}$)[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(name)
    if(!validEmail) return "Email is not valid";
    if(!validPassword) return "Password is not valid";
    if(!validName) return "Name is not valid";
 return null;
}