



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

	//всплывающие подсказки
	$(document).ready(function(){
	$("[data-toggle='tooltip']").tooltip({
		placement: "right",
		title: "элемент во второй половине программы"
		});
	});



	//функция добавления полей ввода и кнопок
	$(document).ready(function(){
	$(".buttonPlus").click(show_field);
	$(".buttonPlusH").click(show_field)
	});
	function show_field(){
		$(this)
		.parent()
		.next()
		.find("input")
		.show()
		.parent()
		.next()
		.find("input")
		.show();
	};

	//функция свернуть-развернуть список
	$(document).ready(function(){
	$(".point_of_list").click(sc);
	$(".sub_title").click(sc);
	});
	function sc(){
		$(this).parent().parent().children(".wrap_list")
		.not($(this).parent().next())
		.hide();
		$(this).parent()
		.next()
		.toggle()
	};

	

	//функция очистки области "atention"
	function clean_up_atention(){
		document.getElementById("atention").innerHTML="";
		document.getElementById("atention").style.color="black";
	};

	//функция сброса
	function Reset() {
		var listOfInputs_text = document.querySelectorAll("td input[type='text']"); //массив полей ввода
		var listOfInputs_check = document.querySelectorAll("td input[type='checkbox']"); //массив полей checkbox
		var listOfOutputs = document.querySelectorAll("td output"); //массив полей баллов
		var listOfInputs_hide = document.querySelectorAll("td input.smallAndHide, td input.buttonPlusH"); //массив элементов, которые надо скрыть


		for (var i=0;i<listOfInputs_text.length;i++){
			//очистка полей ввода
			var info_text = listOfInputs_text[i];
			info_text.value = "";
			info_text.style.color = "black";
			//скрытие дополнительных полей ввода и кнопок
			var info_hide = listOfInputs_hide[i];
			info_hide.style.display = "none";

			if (i>=listOfInputs_check.length) continue; //почему >= вместо > не знаю, но работает только таким образом
			//очистка полей баллов и checkbox
			var info_out = listOfOutputs[i];
			info_out.innerHTML="";
			var info_check = listOfInputs_check[i];
			info_check.checked=false;
		};
			document.getElementById("outTotal").innerHTML="";
			clean_up_atention();
	};



	//функция подсчета баллов
	function get_value(){
		var error=0 //переменная счетчика количества ошибок
		var scoreTotal=0;
		var scoreSub=0;
		var score=0;
		var cutterOfRow=0; //переменная счетчика ряда
		var R=0; //переменная для поля вывода стоимости
		var Ch=0; //переменная для поля checkbox

		var listOfInputs_text = document.querySelectorAll("td input[type='text'] "); //массив полей ввода
		var listOfInputs_check = document.querySelectorAll ("td input[type='checkbox']"); //массив полей checkbox
		var listOfOutputs = document.querySelectorAll("td output"); //массив полей баллов


		//проверка полей ввода
		for (var i=0;i<listOfInputs_text.length;i++){
			var cutterOfRow = cutterOfRow+1; //счетчик полей в одном ряду
			var info_text = listOfInputs_text[i]; //получение данных поля ввода
			var item = info_text.value;
			info_text.style.color = "black";

			var itemLow = item.toLowerCase();
			score = list_value [itemLow];

			if (item == ""){ //проверка на пустую строку
				score=0;
				} else if (score == undefined){ //проверка на ошибку ввода
				error = error+1;
				info_text.style.color = "red";
				score=0;
				} else {
				var nameCorrect = list_name[itemLow]; //вывод правильного написания элемента
				info_text.value=nameCorrect;
				};

			scoreSub = scoreSub+score;

			//отсчет ряда
			if (cutterOfRow == 3){
				info_check = listOfInputs_check[Ch];
				if (info_check.checked == true){ //бонус за исполнение во второй половине программы
					scoreSub = scoreSub*1.1
				};
				scoreTotal = scoreTotal+scoreSub;

				var info_output = listOfOutputs[R];
				info_output.innerHTML=scoreSub.toFixed(2); //вывод стоимости элемента (каскада)

				//прокрутка счетчиков
				Ch = Ch+1;
				R = R+1;
				scoreSub=0;
				cutterOfRow=0;
            };
		};
		document.getElementById("outTotal").innerHTML=scoreTotal.toFixed(2); //вывод суммы баллов

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
