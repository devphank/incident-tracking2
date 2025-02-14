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

            <label for="etr${incidentCount}" class="form-label mt-2">🕒 Estimated Time to Resolution (ETR):</label>
            <input type="text" id="etr${incidentCount}" class="form-control" placeholder="Enter ETR">

            <label for="notes${incidentCount}" class="form-label mt-2">📝 Notes:</label>
            <textarea id="notes${incidentCount}" class="form-control" rows="2" placeholder="Additional details..."></textarea>

            <button class="btn btn-danger mt-2" onclick="removeIncident(${incidentCount})">🗑️ Remove Incident</button>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", entryHTML);
}

function removeIncident(id) {
    const incidentEntry = document.getElementById(`incident${id}`);
    if (incidentEntry) {
        incidentEntry.remove();
    }
}

function submitForm() {
    let unit = document.getElementById("unit").value.trim();
    let name = document.getElementById("name").value.trim();
    let position = document.getElementById("position").value.trim();

    if (!unit || !name || !position) {
        alert("⚠️ Please fill out all required fields.");
        return;
    }

    let incidents = [];
    document.querySelectorAll(".incident-entry").forEach((entry, index) => {
        let location = document.getElementById(`incidentLocation${index + 1}`).value.trim();
        let time = document.getElementById(`incidentTime${index + 1}`).value;
        let status = document.getElementById(`status${index + 1}`).value;
        let etr = document.getElementById(`etr${index + 1}`).value.trim();
        let notes = document.getElementById(`notes${index + 1}`).value.trim();

        if (!location || !time || !status) {
            alert(`⚠️ Incident #${index + 1} is missing required fields.`);
            return;
        }

        incidents.push({
            ID: `Incident-${index + 1}`,
            Location: location,
            Time: time,
            Status: status,
            ETR: etr,
            Notes: notes
        });
    });

    let formData = {
        Unit: unit,
        Name: name,
        Position: position,
        Incidents: incidents
    };

    console.log("📩 Form Submitted", formData);
    localStorage.setItem("incidentTrackingData", JSON.stringify(formData));
    alert("✅ Form submitted successfully!");
}

function downloadJSON() {
    let data = localStorage.getItem("incidentTrackingData");
    if (!data) {
        alert("⚠️ No data available!");
        return;
    }

    let blob = new Blob([data], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "incident_report.json";
    a.click();
}
