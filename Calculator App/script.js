var btn = document.querySelectorAll(".key li"),
    input = document.querySelector(".input-valor"),
    operador= document.querySelectorAll(".operador");

for(var i=0; i < btn.length; i ++){
    document.onkeypress = function(event){
        var key = event.charCode;
        for(var a=0; a <=10; a++ ){
            if(key ===(48+a)){
                input.innerHTML +=a;
            }
        }
        switch(key){
            case 42:
                input.innerHTML +="*";
                break;               
            case 43:
                input.innerHTML +="+";
                break;
            case 45:
                input.innerHTML +="-";
                break;
            case 46:
                input.innerHTML +=".";
                break;
            case 47:
                input.innerHTML +="/";
                break;
            case 13:
            case 61:
                var equacao = input.innerHTML;
                if(equacao){
                    try {
                        input.innerHTML = eval(equacao);
                    } catch (error) {
                        alert('Erro na expressão');  
                    }
                }
                break;
                case 67:
                case 99:
                    input.innerHTML= "";
                    break;
                default:
                    //console.log('Procurando erro');
                break;
        }
    };
    btn[i].addEventListener('click', function(){
        var btnVal = this.innerHTML,
        inputVal = input.innerHTML;
        
        switch(btnVal){
            case "C":
                input.innerHTML = "";
                break;
                case "=":
            
                var equacao = inputVal;
                if (equacao){
                    try {
                        input.innerHTML = eval(equacao);
                    } catch (error) {
                        alert("Erro na expressão")
                    }
                }
            break;
        default:
            input.innerHTML +=btnVal;
            break;
        }
    });
}