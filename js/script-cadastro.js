
//campos de informaçao

const cep = document.querySelector("#cepIn");
const rua = document.getElementById("ruaIn");
const numero = document.getElementById("numeroIn");
const complemento = document.getElementById("complementoIn");
const bairro = document.getElementById("bairroIn");
const cidade = document.getElementById("cidadeIn");
const estado = document.getElementById("estadoIn");
const idade = document.getElementById("idadeIn");
const nome = document.getElementById("nomeIn");
const email = document.getElementById("emailIn");
const senha = document.getElementById("senhaIn");
const senhaC = document.getElementById("senhaCIn")

// dietas

const oni = document.getElementById("onivoro");
const vegan = document.getElementById("vegan");
const vegetariano = document.getElementById("vegetariano");
const CarneBranca = document.getElementById("CarneBranca");
const massa = document.getElementById("massa");
const magrao = document.getElementById("magrao");

//opcoes de plano

const opB = document.getElementById("basico");
const opP = document.getElementById("primium");



// marca as opcoes de dieta

oni.addEventListener("click", ()=>{
    //string vazio para resetar o css e devolver o efeito hover
    vegan.style = "";
    vegetariano.style = "";
    CarneBranca.style = "";
    if(opP.checked == true){
        massa.style.border = "";
        magrao.style.border = "";
    }
    oni.style.border = "3px dashed #3C1642";
    $('onivoro').removeClass('hover');
  
});

vegan.addEventListener("click", ()=>{
    //string vazio para resetar o css e devolver o efeito hover
    oni.style = "";
    vegetariano.style = "";
    CarneBranca.style = "";
    if(opP.checked == true){
        massa.style.border = "";
        magrao.style.border = "";
    }
    vegan.style.border = "3px dashed #3C1642";
    $('vegan').removeClass('hover');
  
});

vegetariano.addEventListener("click", ()=>{
    //string vazio para resetar o css e devolver o efeito hover
    vegan.style = "";
    oni.style = "";
    CarneBranca.style = "";
    if(opP.checked == true){
        massa.style.border = "";
        magrao.style.border = "";
    }
    vegetariano.style.border = "3px dashed #3C1642";
    $('vegetariano').removeClass('hover');
  
});

CarneBranca.addEventListener("click", ()=>{
    //string vazio para resetar o css e devolver o efeito hover
    vegan.style = "";
    vegetariano.style = "";
    oni.style = "";
    if(opP.checked == true){
        massa.style.border = "";
        magrao.style.border = "";
    }
    CarneBranca.style.border = "3px dashed #3C1642";
    $('CarneBranca').removeClass('hover');
});

//opcoes de dieta primium

massa.addEventListener("click", () => {
    if(opP.checked == true){
        oni.style = "";
        vegan.style = "";
        vegetariano.style = "";
        CarneBranca.style = "";
        magrao.style.border = "";
        massa.style.border = "3px dashed #3C1642"
    }
});

magrao.addEventListener("click", () => {
    if(opP.checked == true){
        oni.style = "";
        vegan.style = "";
        vegetariano.style = "";
        CarneBranca.style = "";
        massa.style.border = "";
        magrao.style.border = "3px dashed #3C1642"
    }
});

//inpede do plano basico acesar as dietas primium
document.getElementById("planoB").addEventListener("click", () => {
    opB.checked = true;
    //mudando a bodar para tirra o hover pq essas divs estao bugadas, nao é gambiarra é feature
    massa.style.border = "3px solid #086375";
    magrao.style.border = "3px solid #086375";
});

document.getElementById("planoP").addEventListener("click", () => {
    opP.checked = true;
    //mudando a bodar para tirra o hover pq essas divs estao bugadas, nao é gambiarra é feature
    massa.style.border = "";
    magrao.style.border = "";
});

// hover falando que é pra membros primium ou básico
//e quando nenhuma opcao esta selecionada

massa.addEventListener("mouseover", () => {
    if((opB.checked == true)||(opB.checked == false && opP.checked == false)){
        massa.style.border = "3px solid #086375";
        massa.style.backgroundColor = "darkgray";
        document.getElementById("mMen").innerHTML = "Apenas Premium";
    }
});

massa.addEventListener("mouseout", () => {
    if((opB.checked == true)||(opB.checked == false && opP.checked == false)){
        massa.style.border = "3px solid #086375";
        massa.style.backgroundColor = "#B2FF9E";
        document.getElementById("mMen").innerHTML = "Ganho de Massa";
    }
});

magrao.addEventListener("mouseover", () => {
    if((opB.checked == true)||(opB.checked == false && opP.checked == false)){
        magrao.style.border = "3px solid #086375";
        magrao.style.backgroundColor = "darkgray";
        document.getElementById("dMen").innerHTML = "Apenas Premium";
    }
});

magrao.addEventListener("mouseout", () => {
    if((opB.checked == true)||(opB.checked == false && opP.checked == false)){
        magrao.style.border = "3px solid #086375";
        magrao.style.backgroundColor = "#B2FF9E";
        document.getElementById("dMen").innerHTML = "Deficit Calórico";
    }
});

//API

//Verifica as teclas digistadas e são numeros
cep.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);
    //compara com numeros
    if (!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

    //chama a API quando tem oito números no campo cep
    // usando keyup pra só verificar apoós o oitavo dígito 

cep.addEventListener("keyup", (e) =>{
   let cepComp = cep.value;
   if(cepComp.length == 8){pegaEndereco(cepComp)};
});

//chama API

const pegaEndereco = async (cep) =>{
    const apiURL =`https://viacep.com.br/ws/${cep}/json/`;

    const cepApi = new XMLHttpRequest;
    cepApi.open("get",apiURL);
    cepApi.send();

    cepApi.onload = function(){
        try {
            if(cepApi.status == 200){
                cepobj = JSON.parse(cepApi.response);
                console.log(cepobj);
                rua.value = cepobj.logradouro;
                bairro.value = cepobj.bairro;
                cidade.value = cepobj.localidade;
                estado.value = cepobj.uf;
                lCarrega();
            }else{
                swal("Erro!", "...Problema de conexão com servidor! Tente mais tarde.");
                throw new Error("Houve um problema com o servidor");
            }
            
        } catch (error) {
            console.log("[Houve um problema]");
            console.log(error.message);

        }
    }
}

//liga botao cadastro

function lCarrega(){
    document.getElementById("cad").style.display = "block";
}

function enviar (){
    verify();
}

let verify =()=>{
    if(nome.value == ""){
        swal("Erro!", "...Nome Inválido!");
        throw new Error("Nome inválido");
    }else if(senha.value == ""){
        swal("Erro!", "...Senha Inválida!");
        throw new Error("Senha inválida");
    }else if(senhaC.value == ""){
        swal("Erro!", "...Confirme a senha!");
        throw new Error("Confime a senha");
    }else if(senhaC.value != senha.value){
        swal("Erro!", "...Confirme a senha corretamente!");
        throw new Error("Confime a senha corretamente");
    }else if (email.value == "" || email.value.indexOf('@')==-1 || email.value.indexOf('.')==-1) {
        swal("Erro!", "...Email Inválido!");
        throw new Error("Email inválido");
    }else if(idade == ""){
        swal("Erro!", "...Idade Inválido!");
        throw new Error("idade inválida");
    }else if(numero == ""){
        swal("Erro!", "...Número Inválido!");
        throw new Error("Número inválido");
    }else if(opP.checked == false && opB.checked == false){
        swal("Erro!", "...Selecione um Plano!");
        throw new Error("Nenhum Plano Selecionado!");
    }else if(idade.value.length < 8){
        swal("Erro!", "...Nascimento Inválido!");
        throw new Error("Nascimento Invalido!");
    }else{
        swal('Feito!','Perfil Cadastrado','success');
    }
    
}

