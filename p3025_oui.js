const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3025;

// OUI Database URL
const OUI_URL = "http://standards-oui.ieee.org/oui.txt";

// Cache to store OUI data after first fetch
let ouiData = null;

// Function to fetch and parse the OUI database

async function getManufacturer(oui) {
    try {
        // Fetch OUI data if not already loaded
        if (!ouiData) {
            // console.log("Fetching OUI data...");
            try {
                const response = await axios.get(OUI_URL);
                ouiData = response.data.split("\n");
            } catch (fetchError) {
                console.error("Failed to fetch OUI data:", fetchError.message);
                throw fetchError; // Re-throw the error for the caller to handle
            }
        }

        // Search for the OUI in ouiData
        // console.log(`Searching for OUI: ${oui}`);
        const result = ouiData.find(line => line.toUpperCase().includes(oui.toUpperCase()));
        // console.log(`Mac Lookup result: ${result}`);

        return result ? result.split(")")[1].trim() : "Unknown Manufacturer";

    } catch (error) {
        // Handle other errors (e.g., parsing or unexpected issues)
        // console.error("Error in getManufacturer:", error.message);
        return "Unknown Manufacturer"; // Fallback value
    }
}

// API endpoint for OUI MAC Lookup
app.get("/lookup/:mac", async (req, res) => {
    let mac = req.params.mac.toUpperCase().replace(/[^0-9A-F]/g, ""); // Remove non-hex characters
    if (mac.length !== 12) {
        return res.json({ error: "Invalid MAC format" });
    }

    const oui = mac.substring(0, 6); // Extract first 6 characters
    const manufacturer = await getManufacturer(oui);
    res.json({ manufacturer });
});

// Serve static HTML page
app.use(express.static(__dirname + '/public'));

// Adding one additional route for the favicon because Browsers may also request /favicon.ico directly.
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public/img/favicon.ico');
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));