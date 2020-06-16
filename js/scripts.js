// Business logic for AddressBook
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}
/*
AddressBook.prototype.addWorkAddress = function(id){
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return contact.workAddress[i];
        }
    }
  };
  return false;
}
*/

// Business logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailAddress, address, workAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.address = address;
  this.workAddress = workAddress;
  // this.additionalAddresses = [];
}

// Function to call first and last name
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business logic for work addresses
function Address(workAddress) {
  this.workAddress = workAddress;
}
Address.prototype.workAddress = function(){
  return this.workAddress;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".address").html(contact.address);
  $(".work-address").html(contact.workAddress);
  //console.log(contact.address);
  let buttons = $(".buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
  buttons.append("<button class='workAddressButton' id=" +  + contact.id + ">Work Address</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $(".buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $(".buttons").on("click", ".workAddressButton", function(){
    $("#show-work-address").show();
  });
};
  
$(document).ready(function() {
  let newContact;
  attachContactListeners(); 
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedAddress = $("input#new-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");
    
    newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
  $("form#workAddressInput").submit(function(event){
    event.preventDefault();
    const inputtedWorkAddress = $("input#new-work-address").val();

    $("input#new-work-address").val("");
    newContact.workAddress = inputtedWorkAddress;
    console.log(inputtedWorkAddress);
    displayContactDetails(addressBook);
    //console.log(inputtedWorkAddress);
  })
});