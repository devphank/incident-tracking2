let incidentCount = 0;

function addIncidentEntry() {
    incidentCount++;
    const container = document.getElementById("incidentEntries");

    const entryHTML = `
        <div class="incident-entry card p-3 mt-3" id="incident${incidentCount}">
            <h5>🔹 Incident #${incidentCount}</h5>
            
            <label for="incidentLocation${incidentCount}" class="form-label">📍 Location:</label>
            <input type="text" id="incidentLocation${incidentCount}" class="form-control" placeholder="Enter Location">

            <label for="incidentTime${incidentCount}" class="form-label mt-2">⏰ Time:</label>
            <input type="time" id="incidentTime${incidentCount}" class="form-control">

            <label for="status${incidentCount}" class="form-label mt-2">📌 Status:</label>
            <select id="status${incidentCount}" class="form-select">
                <option value="Assigned">Assigned</option>
                <option value="Available">Available</option>
                <option value="O/S Rest">O/S Rest</option>
                <option value="O/S Pers">O/S Pers</option>
                <option value="O/S Mech">O/S Mech</option>
            </select>

            <label for="etr${incidentCount}" class="form-label mt-2">🕒 ETR:</label>
            <input type="text" id="etr${incidentCount}" class="form-control" placeholder="Enter ETR">

            <label for="notes${incidentCount}" class="form-label mt-2">📝 Notes:</label>
            <textarea id="notes${incidentCount}" class="form-control" rows="2"></textarea>

            <button class="btn btn-danger mt-2" onclick="removeIncident(${incidentCount})">🗑️ Remove</button>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", entryHTML);
}

function removeIncident(id) {
    document.getElementById(`incident${id}`).remove();
}

function submitForm() {
    alert("✅ Form Submitted Successfully!");
}

function downloadJSON() {
    alert("📥 Downloading Report...");
}

function searchIncidents() {
    let query = document.getElementById("searchIncident").value.toLowerCase();
    document.querySelectorAll(".incident-entry").forEach(entry => {
        let text = entry.innerText.toLowerCase();
        entry.style.display = text.includes(query) ? "block" : "none";
    });
}

function filterIncidents() {
    let filter = document.getElementById("filterStatus").value;
    document.querySelectorAll(".incident-entry").forEach(entry => {
        let status = entry.querySelector("select").value;
        entry.style.display = (filter === "" || status === filter) ? "block" : "none";
    });
}
