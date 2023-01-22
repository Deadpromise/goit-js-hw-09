const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(amountRef.value);
  const step = Number(stepRef.value);
  const firstDel = Number(delayRef.value);
  let pos = 0;
  let del = firstDel;

  for (let i = 1; i <= amount; i += 1) {
    pos += 1;
    const condition = pos < 2;
    if (!condition) {
       del += step; 
    };
    createPromise(pos, del)
    .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });;
  }

};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
        if (shouldResolve) {
        resolve({ position, delay })
        } else {
        reject({ position, delay })
        };
    }, delay);
  });
};



// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

