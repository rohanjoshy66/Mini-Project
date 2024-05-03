// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDpobe0CLCA5qJILcPSJd0hIuKg1Dt9HIE",
  authDomain: "ai-legalease.firebaseapp.com",
  databaseURL: "https://ai-legalease-default-rtdb.firebaseio.com",
  projectId: "ai-legalease",
  storageBucket: "ai-legalease.appspot.com",
  messagingSenderId: "671784949113",
  appId: "1:671784949113:web:a75159f67e2d912577cba8",
  measurementId: "G-LT4DH1BGLH"
});

const db = firebase.firestore();
const lawList = document.getElementById('lawList');
const searchInput = document.getElementById('searchInput');

// Get data from Firestore
db.collection('LegalDictionary')
    .get()
    .then((querySnapshot) => {
        const laws = [];
        querySnapshot.forEach((doc) => {
            const law = doc.data().Law;
            const des = doc.data().Des;
            laws.push({ law, des });
            displayLaw(law, des);
        });
        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value.toLowerCase();
            const filteredLaws = laws.filter(({ law }) =>
                law.toLowerCase().includes(searchQuery)
            );
            clearLawList();
            filteredLaws.forEach(({ law, des }) => displayLaw(law, des));
        });
    })
    .catch((error) => {
        console.error('Error getting documents: ', error);
    });

function displayLaw(law, des) {
    const row = document.createElement('tr');

    const lawCell = document.createElement('td');
    lawCell.textContent = law;
    row.appendChild(lawCell);

    const desCell = document.createElement('td');
    desCell.textContent = des;
    row.appendChild(desCell);

    lawList.appendChild(row);
}

function clearLawList() {
    lawList.innerHTML = '';
}