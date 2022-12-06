// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');


//Global Variables
let Contacts = loadContact();


// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);


function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    displayByEmail();
  }
}


// MENU FUNCTIONS
function displayContacts() {
  console.log('Display Contacts');
  displayAll();
}


function addContact() {
  console.log('Add Contact');
  let Name = prompt("Name");
  let Email = prompt("Email");
  let PhoneNumber = prompt("Phone number");
  let Country = prompt("Country");
  let index = findByEmail(Email);

  if(index === -1){
    Contacts.push(CreateContact(Name, Email, PhoneNumber, Country));
    saveContact();
    displayAll();
  }else{
    let answer = prompt("This email is already in use! do you want to still add this? Y/N?");
    if(answer === "Y" || answer === "y" || answer === "Yes" || answer === "yes"){
      Contacts.push(CreateContact(Name, Email, PhoneNumber, Country));
      saveContact();
      displayAll();
    }else{
      alert("Ok we didn't add it!");
    }
  }
  console.log(index);
}


function removeContact() {
  console.log('Remove Contact');
  let indexRemove = prompt("Type in the email you want to remove!");
  let index = findByEmail(indexRemove);
  
  for(let i = 0; i < index.length; i++){
    Contacts.splice(index[i], index.length);
    saveContact();
    displayAll();
    console.log(index);
  }
  if(index === -1){
    alert("this email does not exist yet!");
  }
}


function displayByName() {
  console.log('Display by Name');
  let Name = prompt("Who do you want to find?");
  displayName(Name);
}


function displayByCountry() {
  console.log('Display by Country');
  let Country = prompt("What country do you want to search for?");
  displayCountry(Country);
}


function displayByEmail() {
  console.log('Display by Email');
  let Email = prompt("What Email do you want to search for?");
  displayEmail(Email);

}

//Helper
function CreateContact(name, email, phone, country){
  return {
    Name: name,
    Email: email,
    PhoneNumber: phone,
    Country: country
  }
}


function displayAll(){
  let ouputStr = '';
  for(i = 0; i < Contacts.length; i++){
    ouputStr += getContactHTMLStr(Contacts[i], i);
  }
  outputEl.innerHTML = ouputStr;
}


function displayName(name){
  let ouputStr = '';
  for(i = 0; i < Contacts.length; i++){
    if(Contacts[i].Name === name){
      ouputStr += getContactHTMLStr(Contacts[i], i);
    }
  }
  outputEl.innerHTML = ouputStr;
}


function displayCountry(country){
  let ouputStr = '';
  for(i = 0; i < Contacts.length; i++){
    if(Contacts[i].Country === country){
      ouputStr += getContactHTMLStr(Contacts[i], i);
    }
  }
  outputEl.innerHTML = ouputStr;
}


function displayEmail(email){
  let ouputStr = '';
  for(i = 0; i < Contacts.length; i++){
    if(Contacts[i].Email === email){
      ouputStr += getContactHTMLStr(Contacts[i], i);
    }
  }
  outputEl.innerHTML = ouputStr;
}


function findByEmail(email){
  let emailIndex = [];
  for(let i = 0; i < Contacts.length; i++){
    if(Contacts[i].Email === email){
      emailIndex.push(i);
    }
  }
  if(emailIndex.length === 0){
    return -1;
  }else{
    return emailIndex;
  }
}

//Get Html for given Contact
function getContactHTMLStr(Contacts, i){
  return `
    <div>
      ${i}: ${Contacts.Name}
      <br>
      ${Contacts.Email}
      <br>
      ${Contacts.PhoneNumber} (${Contacts.Country})
    </div>
  `
}


function saveContact() {
  localStorage.setItem("Contacts", JSON.stringify(Contacts));
}


function loadContact(){
  let contactsStr = localStorage.getItem("Contacts");
  return JSON.parse(contactsStr) ?? [];
}