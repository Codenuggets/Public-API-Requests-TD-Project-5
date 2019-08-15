// Assigns api url to variable
const randomUrl = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.querySelector('#gallery');

// Asynchronous function used for grabbing the employee data from randomuser.me
async function getEmployees(url) {
  const employeeResponse = await fetch(url);
  // grabs the data and converts to json
  const employeeJSON = await employeeResponse.json();

  // iterates through the promise object and returns the iterable employee data
  return Promise.all(employeeJSON.results);
}

// generates the employee cards and displays them on the page
function generateHTML(data) {
  console.log(data);
  data.map(employee => {
    const employeeCard = document.createElement('div');
    employeeCard.setAttribute('class', 'card');
    gallery.appendChild(employeeCard);
    // Interpolation used to grab the information from data and insert them into the page
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
  // data is returned for used in following .then() method calls
  return data;
}

// Creates and appends search bar code
function generateSearch(data) {
  document.querySelector('.search-container').innerHTML =
    ` <form action="#" method="get">
        <input type="search" id="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit">
      </form>`;
  // data is returned for use in following .then() method calls
  return data;
}

// Adds functionality to search bar
function handleSearch(data) {
  // Click event added to search bar
  $('#search-input').keyup((e) => {
    // searchResults declared for use after loop is run
    let searchResults = [];
    // Hides all cards so only the cards that match are shown
    $('.card').hide();
    // .entries used to allow the index for use as reference in the loop
    for (let [index,employee] of data.entries()) {
      // Both first and last names are concatenated so the user can search by either
      let fullName = employee.name.first.concat(` ${employee.name.last}`)
      if(fullName.includes(e.target.value.toLowerCase())) {
        // To ensure the no results message isn't displayed if there is a match
        $('#no-results').remove();
        // fading animation to ease showing to users
        $(`.card:eq(${index})`).fadeIn("fast", () => {
          // :eq used to grab to corresponding card with it's postion in the index
          $(`.card:eq(${index})`).show();
        });

        // employee pushed into searchResults array for a check after loop is finished
        searchResults.push(employee);
      }
    }
    // Checks length of search results
    if(searchResults.length === 0) {
      // Makes sure the no results message isn't already displayed
      if(document.querySelector('#no-results') === null ) {
        // Creates and appends no results message
        $('#gallery').append('<div id="no-results">Sorry, no results found.</div>');
      }
    }
  });
}

// converts date from iso format to short date for use in generateModal
function formatDate(date) {
  const convertedDate = new Date(date);
  const formatedDate = `${convertedDate.getMonth() +1}/${convertedDate.getDate()}/${convertedDate.getFullYear()}`;
  return formatedDate;
}

// Handles the functionality of the prev button in the modal
function handlePrevClick(data, iterator) {
    $('#modal-prev').click(() => {
      // Ensures that no error occurs if the user presses the prev button on the first card
      if(iterator <= 0) {
        iterator = 0;
      } else {
        // code is reused from generateModal but adjusted to show previous card
        document.querySelector('.modal-container').innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data[iterator -1].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data[iterator -1].name.first} ${data[iterator -1].name.last}</h3>
                <p class="modal-text">${data[iterator -1].email}</p>
                <p class="modal-text cap">${data[iterator -1].location.city}</p>
                <hr>
                <p class="modal-text">${data[iterator -1].cell}</p>
                <p class="modal-text cap">${data[iterator -1].location.street}, ${data[iterator -1].location.city}, ${data[iterator -1].location.state} ${data[iterator -1].location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDate(data[iterator -1].dob.date)}</p>
            </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
        `
        // iterator adjusted only if previous card is shown
        iterator -= 1;
      }
      // button functionality is added to new card modal shown
      handleRemoveModal();
      handleNextClick(data, iterator);
      handlePrevClick(data, iterator);
    });

  };

// adds functionality to next button in modal
function handleNextClick(data, iterator) {
      $('#modal-next').click(() => {
        // ensures that no error occurs when the user presses next on last card
        if(iterator >= 11) {
          iterator = 11;
        } else {
          // Reuses code from generateModal but adjusts for showing next card
          document.querySelector('.modal-container').innerHTML = `
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${data[iterator +1].picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${data[iterator +1].name.first} ${data[iterator +1].name.last}</h3>
                  <p class="modal-text">${data[iterator +1].email}</p>
                  <p class="modal-text cap">${data[iterator +1].location.city}</p>
                  <hr>
                  <p class="modal-text">${data[iterator +1].cell}</p>
                  <p class="modal-text cap">${data[iterator +1].location.street}, ${data[iterator +1].location.city}, ${data[iterator +1].location.state} ${data[iterator +1].location.postcode}</p>
                  <p class="modal-text">Birthday: ${formatDate(data[iterator +1].dob.date)}</p>
              </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
          `
          // Adjusts iterator only if the next card is shown
          iterator += 1;
        }
        // Adds button functionality to new card shown
        handleRemoveModal();
        handlePrevClick(data, iterator);
        handleNextClick(data, iterator);
      });

    };

// adds functionality to close button on modal
function handleRemoveModal() {
  // Selects close button on modal and adds click event
  $('#modal-close-btn').click(() => {
    //Added fading animation to modal to ease it going out for user
    $('.modal-container').fadeOut(() => {
      // Once fading animation is complete, the modal is removed
      $('.modal-container').remove();
    });
  });
}

// Handles the creation and appending of modal
function generateModal(data) {
  const employeeCards = document.querySelectorAll('.card');
  // Iterates through all data so that the index can be used and adds click event listener to each
  for(let i = 0; i < data.length; i++){
    employeeCards[i].addEventListener('click', (e) => {
      $('body').append(
        // Interpolation used to grab information from data to display
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
              <div class="modal-btn-container">
                  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                  <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>
            </div>
        `
      );
      // Adds button functionality to modal
      handleRemoveModal();
      handlePrevClick(data, i);
      handleNextClick(data, i);
      });
  }
  // data returned for use in following .then() method calls
  return data;
}
// Promise function calls to set up page
getEmployees(randomUrl)
  .then(generateHTML)
  .then(generateModal)
  .then(generateSearch)
  .then(handleSearch);
