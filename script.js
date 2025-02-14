function addIncidentEntry() {
    const container = document.getElementById("incidentEntries");
    const incidentIndex = container.childElementCount + 1;

    const entryHTML = `
        <div class="incident-entry">
            <h4>Incident ${incidentIndex}</h4>
            <label for="incidentLocation${incidentIndex}">Location:</label>
            <input type="text" id="incidentLocation${incidentIndex}" placeholder="Enter Location">
            
            <label for="incidentTime${incidentIndex}">Time:</label>
            <input type="time" id="incidentTime${incidentIndex}">
            
            <label>Status:</label>
            <div class="status-group">
                <label><input type="checkbox" id="assigned${incidentIndex}"> Assigned</label>
                <label><input type="checkbox" id="available${incidentIndex}"> Available</label>
                <label><input type="checkbox" id="osRest${incidentIndex}"> O/S Rest</label>
                <label><input type="checkbox" id="osPers${incidentIndex}"> O/S Pers</label>
                <label><input type="checkbox" id="osMech${incidentIndex}"> O/S Mech</label>
            </div>
            
            <label for="etr${incidentIndex}">ETR:</label>
            <input type="text" id="etr${incidentIndex}" placeholder="Enter ETR">
            
            <label for="notes${incidentIndex}">Notes:</label>
            <textarea id="notes${incidentIndex}" rows="2" placeholder="Additional details..."></textarea>
            
            <hr>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", entryHTML);
}

function submitForm() {
    let unit = document.getElementById("unit").value;
    let name = document.getElementById("name").value;
    let position = document.getElementById("position").value;

    if (!unit || !name || !position) {
        alert("Please fill out all required fields.");
        return;
    }

    let incidents = [];
    document.querySelectorAll(".incident-entry").forEach((entry, index) => {
        let location = document.getElementById(`incidentLocation${index + 1}`).value;
        let time = document.getElementById(`incidentTime${index + 1}`).value;
        let assigned = document.getElementById(`assigned${index + 1}`).checked;
        let available = document.getElementById(`available${index + 1}`).checked;
        let osRest = document.getElementById(`osRest${index + 1}`).checked;
        let osPers = document.getElementById(`osPers${index + 1}`).checked;
        let osMech = document.getElementById(`osMech${index + 1}`).checked;
        let etr = document.getElementById(`etr${index + 1}`).value;
        let notes = document.getElementById(`notes${index + 1}`).value;

        incidents.push({
            Location: location,
            Time: time,
            Status: {
                Assigned: assigned,
                Available: available,
                "O/S Rest": osRest,
                "O/S Pers": osPers,
                "O/S Mech": osMech
            },
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

    console.log("Form Submitted", formData);
    alert("Form submitted successfully!");
}
