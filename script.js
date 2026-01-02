// Select DOM elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const companySections = document.querySelectorAll(".company-list"); // Only target sections with tables

function filterTables() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  let totalMatchesOnPage = 0;

  // Loop through each table section
  companySections.forEach((section) => {
    const rows = section.querySelectorAll("tbody tr");
    let matchesInSection = 0;

    rows.forEach((row) => {
      // Get text content of the row
      const rowText = row.innerText.toLowerCase();
      // Get the category cell (first cell)
      const categoryCell = row.cells[0] ? row.cells[0].innerText : "";

      // Logic: Does Row Text match Input? AND Does Category match Filter?
      const textMatch = rowText.includes(searchText);
      const catMatch =
        selectedCategory === "" || categoryCell === selectedCategory;

      if (textMatch && catMatch) {
        row.style.display = ""; // Show row
        matchesInSection++;
        totalMatchesOnPage++;
      } else {
        row.style.display = "none"; // Hide row
      }
    });

    // If no rows match in this specific section, hide the whole section (Header + Table)
    if (matchesInSection === 0) {
      section.style.display = "none";
    } else {
      section.style.display = ""; // Show section if there are matches
    }
  });

  // ================= THE "NO BLANK PAGE" RULE =================
  // If user searches for something crazy and total matches are 0,
  // Show ALL tables again (Reset view).
  if (totalMatchesOnPage === 0) {
    // Optional: You could show a "No results found" toast here.

    companySections.forEach((section) => {
      section.style.display = ""; // Unhide all sections
      const rows = section.querySelectorAll("tbody tr");
      rows.forEach((r) => (r.style.display = "")); // Unhide all rows
    });
  }
}

// Attach event listeners
searchInput.addEventListener("keyup", filterTables);
categoryFilter.addEventListener("change", filterTables);

// Dark Mode Toggle
function toggleMode() {
  document.body.classList.toggle("dark");
}
