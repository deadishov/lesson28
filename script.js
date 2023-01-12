const selectFrom = document.querySelector('#from')
const selectTo = document.querySelector('#to')
const inputFrom = document.querySelector('.from')
const inputTo = document.querySelector('.to')
let currencyFrom = 'USD'
let currencyTo = 'RUB'

inputFrom.value = 0
inputTo.value = 0

selectFrom.addEventListener('change', () => {
    currencyFrom = selectFrom.options[selectFrom.selectedIndex].textContent
})
selectTo.addEventListener('change', () => {
    currencyTo = selectTo.options[selectTo.selectedIndex].textContent
})

const debounce = (fn, waitTime) => {
    let timeOut;

    return () => {
        clearTimeout(timeOut);
        timeOut = setTimeout(fn, waitTime);
    };
};

const myHeaders = new Headers();
myHeaders.append("apikey", "CQ5wqHaqQfEtuuTVrat1C1ZeUyk0wd41");
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
}



const converter = () => {
    if (inputFrom.value === '') {
        inputTo.value = 0
        return
    }
    let from = inputFrom.value

    const getData = () => {
        return fetch(`https://api.apilayer.com/exchangerates_data/convert?from=${currencyFrom}&to=${currencyTo}&amount=${from}`, requestOptions)
            .then(res => res.json())
            .catch(error => {
                console.log(error);
            })
    }

    getData()
        .then(data => {
            from = inputFrom.value
            console.log(inputFrom.value);
            inputTo.value = data.result

        })

}
inputFrom.addEventListener('input', debounce(converter, 500))
inputFrom.addEventListener('blur', (e) => {
    if (e.target.value === '') {
        e.target.value = 0
    }
})

