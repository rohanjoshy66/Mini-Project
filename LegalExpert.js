// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDpobe0CLCA5qJILcPSJd0hIuKg1Dt9HIE",
    authDomain: "ai-legalease.firebaseapp.com",
    databaseURL: "https://ai-legalease-default-rtdb.firebaseio.com",
    projectId: "ai-legalease",
    storageBucket: "ai-legalease.appspot.com",
    messagingSenderId: "671784949113",
    appId: "1:671784949113:web:a75159f67e2d912577cba8",
    measurementId: "G-LT4DH1BGLH"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Get a reference to the "LegalExpert" collection
  const legalExpertCollection = db.collection("LegalExpert");
  
  // Get a reference to the table body
  const tableBody = document.querySelector("#legalExpertsTable tbody");
  
  // Array to store all legal experts
  let allExperts = [];
  
  // Listen for changes in the "LegalExpert" collection
  legalExpertCollection.onSnapshot(function (querySnapshot) {
    // Clear the table body
    tableBody.innerHTML = "";
    allExperts = [];
  
    // Iterate over the documents in the collection
    querySnapshot.forEach(function (doc) {
      // Get the document data
      const data = doc.data();
      allExperts.push(data);
  
      // Create a new table row
      const row = document.createElement("tr");
  
      // Create table cells and populate them with data
      const nameCell = document.createElement("td");
      nameCell.textContent = data.name;
      row.appendChild(nameCell);
  
      const specCell = document.createElement("td");
      specCell.textContent = data.spec;
      row.appendChild(specCell);
  
      const placeCell = document.createElement("td");
      placeCell.textContent = data.place;
      row.appendChild(placeCell);
  
      const phoneCell = document.createElement("td");
      phoneCell.textContent = data.phno;
      row.appendChild(phoneCell);
  
      const emailCell = document.createElement("td");
      emailCell.textContent = data.email;
      row.appendChild(emailCell);
  
      // Append the row to the table body
      tableBody.appendChild(row);
    });
  });
  
  // Search function
  function searchExperts() {
    // Get the search terms
    const searchSpecTerm = document.getElementById("searchSpecInput").value.toLowerCase();
    const searchLocTerm = document.getElementById("searchLocInput").value.toLowerCase();
  
    // Clear the table body
    tableBody.innerHTML = "";
  
    // Filter the allExperts array based on the search terms
    const filteredExperts = allExperts.filter(expert =>
      expert.spec.toLowerCase().includes(searchSpecTerm) &&
      expert.place.toLowerCase().includes(searchLocTerm)
    );
  
    // Iterate over the filtered experts and create table rows
    filteredExperts.forEach(expert => {
      const row = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = expert.name;
      row.appendChild(nameCell);
  
      const specCell = document.createElement("td");
      specCell.textContent = expert.spec;
      row.appendChild(specCell);
  
      const placeCell = document.createElement("td");
      placeCell.textContent = expert.place;
      row.appendChild(placeCell);
  
      const phoneCell = document.createElement("td");
      phoneCell.textContent = expert.phno;
      row.appendChild(phoneCell);
  
      const emailCell = document.createElement("td");
      emailCell.textContent = expert.email;
      row.appendChild(emailCell);
  
      tableBody.appendChild(row);
    });
  }