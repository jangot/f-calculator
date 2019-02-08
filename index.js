//список стоимости элементов
var list_value={
    "1t":0.4,
    "1s":0.6
};

//список правильного написания элементов
var list_name={
    "1t":"1T",
    "1s":"1S"
};
var i;
var in_i;
var info;

//функция очистки области "atention"
function clean_up_atention(){
    document.getElementById("atention").innerHTML="";
    document.getElementById("atention").style.color="black";
};

//функция сброса
function resett() {
    for (i=1;i<5;i++){
        //очистка полей ввода
        in_i="in_"+i;
        info = document.getElementById(in_i);
        info.value = "";
        info.style.color = "black";
        if (i>2) continue;
        //очистка полей баллов
        var out_i="out_"+i;
        document.getElementById(out_i).innerHTML="";

    };
    document.getElementById("outTotal").innerHTML="";
    clean_up_atention();
};

//функция добавления поля ввода
function input_show(n){
    var class_remover = document.getElementById(n).classList;
    class_remover.remove("input_hide");
}

//функция подсчета баллов
function get_value(){
    var error=0
    var scoreTotal=0;
    var scoreSub=0;
    var score=0;
    var cutterOfRow=0;
    var R=0;

    //проверка полей ввода
    for (var i=1;i<5;i++){
        in_i = "in_"+i;
        var cutterOfRow = cutterOfRow+1;
        info = document.getElementById(in_i); //получение данных поля ввода
        var item = info.value;
        info.style.color = "black";

        var itemLow = item.toLowerCase();
        score = list_value [itemLow];

        if (item == ""){ //проверка на пустую строку
            score=0;
        } else if (score == undefined){ //проверка на ошибку ввода
            error = error+1;
            info.style.color = "red";
            score=0;
        } else {
            var nameCorrect = list_name[itemLow]; //вывод правильного написания элемента
            document.getElementById(in_i).value=nameCorrect;
        };
        scoreTotal = scoreTotal+score;
        scoreSub = scoreSub+score;

        //отсчет ряда
        if (cutterOfRow == 2){
            R = R+1;
            var out_R = "out_"+R;
            document.getElementById(out_R).innerHTML=scoreSub; //вывод стоимости элемента (каскада)
            scoreSub=0;
            cutterOfRow=0;
        };
    };

    document.getElementById("outTotal").innerHTML=scoreTotal; //вывод суммы баллов

    //проверка количества ошибок в названии элементов
    document.getElementById("atention").style.color="red";
    if (error==1){
        document.getElementById("atention").innerHTML="проверьте название элемента";
    } else if (error>1){
        document.getElementById("atention").innerHTML="проверьте название элементов";
    } else {
        clean_up_atention(); //функция очистки области "atention"
    };
};
