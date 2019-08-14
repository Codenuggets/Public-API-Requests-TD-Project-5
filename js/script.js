// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   }
// });
const randomUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.querySelector('#gallery');

async function getEmployees(url) {
  const employeeResponse = await fetch(url);
  const employeeJSON = await employeeResponse.json();

  return Promise.all(employeeJSON.results);
}

function generateHTML(data) {
  console.log(data);
  data.map(employee => {
    const employeeCard = document.createElement('div');
    employeeCard.setAttribute('class', 'card');
    gallery.appendChild(employeeCard);
    employeeCard.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>
    `;
  });
  return data;
}

function formatDate(date) {
  const convertedDate = new Date(date);
  const formatedDate = `${convertedDate.getMonth() +1}/${convertedDate.getDate()}/${convertedDate.getFullYear()}`;
  return formatedDate;
}

function generateModal(data) {
  console.log(data);
  const employeeCards = document.querySelectorAll('.card');
  for(let i = 0; i < data.length; i++){
    employeeCards[i].addEventListener('click', (e) => {
      console.log('that tickles');
      $('body').append(
        `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-text">${data[i].email}</p>
                    <p class="modal-text cap">${data[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${data[i].cell}</p>
                    <p class="modal-text cap">${data[i].location.street}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatDate(data[i].dob.date)}</p>
                </div>
            </div>
        `
      );
      $('#modal-close-btn').click(() => {
        $('.modal-container').remove();
      });
    });
  }
}

getEmployees(randomUrl).then(generateHTML).then(generateModal);
