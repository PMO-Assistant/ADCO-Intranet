const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");

let dashboards = ["Projects Overview Dashboard", "Sales Report", "Tender"];
// Object to store related words
const relatedWords = {
    "Projects Overview Dashboard": [],
    "Sales Report": [],
    "Tender": []
};

// Function to handle item click and redirect
function updateName(selectedLi) {
    searchInp.value = "";
    let selectedItem = selectedLi.innerText.trim();
    switch (selectedItem) {
        case "Sales Report":
            window.location.href = "sales.html";
            break;
        case "Projects Overview Dashboard":
            window.location.href = "projects_dashboard.html";
            break;
        case "Tender":
            window.location.href = "tender.html";
            break;
        default:
            console.log("Dashboard not found");
    }
}

// Function to filter options based on search input
function filterOptions(searchWord) {
    let arr = [];
    searchWord = searchWord.toLowerCase();
    dashboards.forEach(data => {
        if (data.toLowerCase().startsWith(searchWord) || relatedWords[data].includes(searchWord)) {
            let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
            arr.push(`<li onclick="updateName(this)" class="${isSelected}">${data}</li>`);
        }
    });
    return arr;
}

// Function to initialize the dropdown with dashboards
function addDashboard(selecteddashboard) {
    options.innerHTML = "";
    dashboards.forEach(dashboard => {
        let isSelected = dashboard == selecteddashboard ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${dashboard}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}

// Event listener for search input
searchInp.addEventListener("keyup", () => {
    let searchWord = searchInp.value;
    let filteredOptions = filterOptions(searchWord);
    options.innerHTML = filteredOptions.length ? filteredOptions.join("") : `<p style="margin-top: 10px;">Oops! Dashboard not found</p>`;
});

// Event listener for dropdown button
selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
    if (wrapper.classList.contains("active")) {
        searchInp.focus();
    }
});

// Initial setup of the dropdown
addDashboard();
