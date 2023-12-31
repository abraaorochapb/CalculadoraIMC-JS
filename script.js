const data = [
  {
    min: 0,
    max: 18.4,
    classification: 'Menor que 18,5',
    info: 'Magreza',
    obesity: '0',
  },
  {
    min: 18.5,
    max: 24.9,
    classification: 'Entre 18,5 e 24,9',
    info: 'Normal',
    obesity: '0',
  },
  {
    min: 25,
    max: 29.9,
    classification: 'Entre 25 e 29,9',
    info: 'Sobrepeso',
    obesity: 'I',
  },
  {
    min: 30,
    max: 39.9,
    classification: 'Entre 30 e 39,9',
    info: 'Obesidade',
    obesity: 'II',
  },
  {
    min: 40,
    max: 99,
    classification: 'Maior que 40',
    info: 'Obesidade Grave',
    obesity: 'III',
  },
]

const imcTable = document.querySelector('#imc-table')
const heightInput = document.querySelector('#height')
const weightInput = document.querySelector('#weight')
const calcBtn = document.querySelector('#calc-btn')
const clearBtn = document.querySelector('#clear-btn')

const imcNumber = document.querySelector('#imc-number span')
const imcInfo = document.querySelector('#imc-info span')
const backBtn = document.querySelector('#back-btn')

const calcContainer = document.querySelector('#calc-container')
const resultContainer = document.querySelector('#result-container')

const createTable = (data) => {
  data.forEach(element => {
    
    const div = document.createElement('div')
    div.classList.add('table-data')

    const classification = document.createElement('p')
    classification.innerText = element.classification

    const info = document.createElement('p')
    info.innerText = element.info

    const obesity = document.createElement('p')
    obesity.innerText = element.obesity

    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)

    imcTable.appendChild(div)

  });
}
createTable(data)

const cleanInputs = () => {
  heightInput.value = ''
  weightInput.value = ''
  imcInfo.classList = ''
  imcNumber.classList = ''
}

const validDigits = (text) => {
  return text.replace(/[^0-9,]/g, '')
}

[heightInput, weightInput].forEach(el => {
  el.addEventListener('input', (e) => {
    const updatedValue = validDigits(e.target.value)
    e.target.value = updatedValue
  })
})

const calcImc = (height, weight) =>{
  const imc = (weight / (height * height)).toFixed(1)
  return imc
}

const showOrHideResult = () => {
  calcContainer.classList.toggle('hide')
  resultContainer.classList.toggle('hide')
}

calcBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const height = +heightInput.value.replace(',', '.')
  const weight = +weightInput.value.replace(',', '.')

  if (!height || !weight) return

  const imc = calcImc(height, weight)
  
  let info

  data.forEach(element => {
    if (imc >= element.min && imc <= element.max) {
      info = element.info
    }
  })
  if (!info) return

  imcNumber.innerText = imc
  imcInfo.innerText = info

  switch (info) {
    case 'Magreza':
      imcInfo.classList.add('good')
      imcNumber.classList.add('good')
      break;
    case 'Normal':
      imcInfo.classList.add('low')
      imcNumber.classList.add('low')
      break;
    case 'Sobrepeso':
      imcInfo.classList.add('low')
      imcNumber.classList.add('low')
      break;
    case 'Obesidade':
      imcInfo.classList.add('medium')
      imcNumber.classList.add('medium')
      break;
    case 'Obesidade Grave':
      imcInfo.classList.add('bad')
      imcNumber.classList.add('bad')
      break;
  }
  
  showOrHideResult()
})

clearBtn.addEventListener('click', (e) => {
  e.preventDefault()
  cleanInputs()
})

backBtn.addEventListener('click', (e) => {
  cleanInputs()
  showOrHideResult()
})

