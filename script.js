const getData = () => {
    return fetch('db.json')
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        })
}

getData()
    .then(data => {
        const select = document.querySelector('select')
        const span = document.querySelector('span')

        select.addEventListener('input', () => {

            const car = data.cars.find(cars => cars.brand === select.options[select.selectedIndex].value);
            if (select.selectedIndex > 0) {
                span.innerHTML = `Тачка: ${car["brand"]} ${car["model"]} </br>
                Цена: ${car["price"]}$`
            } else {
                span.textContent = 'Выберите тачку'
            }
        })
    })

