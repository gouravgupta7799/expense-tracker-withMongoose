
let url = 'http://localhost:4000/user'
let token = localStorage.getItem('token');

document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault()
  let obj = JSON.stringify({
    name: document.getElementById('nameInput').value,
    email: document.getElementById('emailInput').value,
    contect: document.getElementById('contectInput').value,
    password: document.getElementById('passwordInput').value
  })
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/signin',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  };

  axios.request(config)
    .then((response) => {

      obj = JSON.stringify({
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + '/login',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        data: obj
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            window.location.href = 'http://127.0.0.1:5500/frontend/DailyExpense/expense.html?'
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

})



