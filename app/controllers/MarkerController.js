class MarkerController {
    constructor() {
        this.jsonData = null;
    }

    async getJson() {
        try {
            const response = await fetch("https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation/*");
            const jsonResponse = await response.json();
            this.jsonData = jsonResponse.data;
        } catch (error) {
            console.error(error);
        }
    }

    getPopup(value) {
        let available;
        if (value["smetadata"]["state"] === "ACTIVE") {
            available = "Available";
        } else {
            available = "Not available";
        }
        return (
            `<div>
            <b>${value["smetadata"]["address"]}</b><br/>
            ${available}<br/>
            <a href=${value["smetadata"]["paymentInfo"]}>Payment information</a><br/>
            <a href='' class='marker' data-lat='${value["scoordinate"]["y"]}' data-lng='${value["scoordinate"]["x"]}'>Route</a>
        </div>`
        );
    }

    async fetchData() {
        await this.getJson();
    }

    getJsonData() {
        if (Array.isArray(this.jsonData)) {
            return this.jsonData.map(item => ({
                ...item,
                popup: this.getPopup(item)
            }));
        } else {
            console.error('jsonData is not an array:', this.jsonData);
            return [];
        }
    }
}

module.exports = MarkerController;