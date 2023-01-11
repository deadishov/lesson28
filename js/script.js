//Функция проверки соответствия данных, выбранному типу данных
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//Функция скрытия блоков с результатом
	hideAllResponseBlocks = () => {
		//получаем массив из всех необходимых блоков
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//каждому блоку присваиваем значение display: none, тем самым скрывая их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//функция появление блока с сообщением
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//запуск функции скрытия всех блоков
		hideAllResponseBlocks();
		//получение блока с сообщением
		document.querySelector(blockSelector).style.display = 'block';
		//проверка на наличие переданного аргумента spanSelector
		if (spanSelector) {
			//если проверка прошла, присваиваем полученному спану значение textContent  
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//функция получения сообщения об ошибке, путем передачи аргументов в функцию появления блока
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//функция получения сообщения об успехе, путем передачи аргументов в функцию появления блока
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//функция оповещения об отсутствии результата путем передачи в виде аргумента соответствующего блока
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//функция попытки фильтрации введенных данных
	tryFilterByType = (type, values) => {
		//в случае успеха
		try {
			//с помощью "eval" получили результат фильтрации и  значения разделили "," и присвоили все это к переменной
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//переменной присвоили одно из 2х значений в зависимости от наличия результата фильтрации 
			const alertMsg = (valuesArray.length) ?
				//если результат есть
				`Данные с типом ${type}: ${valuesArray}` :
				//если результата нет
				`Отсутствуют данные типа ${type}`;
			//запуск функции сообщения об успехе с передачей аргументом алерта
			showResults(alertMsg);
			//в случае ошибки 
		} catch (e) {
			//сообщается об ошибке, но код при этом не ломается
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку запуска
const filterButton = document.querySelector('#filter-btn');
//навешиваем обработчик события по клику
filterButton.addEventListener('click', e => {
	//получаем инпут с типом данных
	const typeInput = document.querySelector('#type');
	//получаем инпут с данными
	const dataInput = document.querySelector('#data');
	// проверка на наличие символов в инпуте с данными
	if (dataInput.value === '') {
		//если инпут пустой, то выводится сообщение о необходимости ввода данных
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//функция оповещения об отсутствии результата
		showNoResults();
		//в ином случае
	} else {
		//обнуляется сообщение о необходимости ввода данных
		dataInput.setCustomValidity('');
		//отменяется действие кнопки по умолчанию
		e.preventDefault();
		//запускается функция попытки фильтрации введенных данных передавая в виде аргументов значения инпутов типа данных и данных
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

