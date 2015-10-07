/**
 * Transformer function for taking kenya-formated objects and outputting FRED-formated.
 */
module.exports = function(facility) {

    var example_facility = {
        "name": "APPROVED SCHOOL DISP",
        "HMIS": 2268,
        "Province": "WESTERN",
        "District": "KAKAMEGA",
        "Division": "MUNICIPALITY",
        "LOCATION": "BUKHUNGU",
        "County": "KAKAMEGA",
        "Constituency": "SHINYALU",
        "Sub-Location": "MAHIAKALO",
        "Spatial Reference Method": "AMKENI",
        "Facility Type": 9,
        "Agency": "MOH",
        "coordinates": [34.76145000000, 0.29292400000],
        "properties": {
            "sector": "health",
            "type": "Institutions Health Facilities - schools, Universities, Employer, Police, Prisons, Other Ministries, Airport & Port Authorities, Armed forces",
            "visits": 0
        }
    };

    var site = {
        name: facility.name,
        active: true,
        coordinates: facility.coordinates,
        properties: {
            sector: facility.properties.sector,
            type: facility.properties.type,
            grid_power: '',
            improved_water_supply: '',
            improved_sanitation: '',
            province: facility.Province,
            district: facility.District,
            location: facility.LOCATION,
            county: facility.County,
            country: 'KENYA',
            constituency: facility.Constituency,
            "sub-location": facility["Sub-Location"],
            visits: 0
        },
        identifiers: [
            {
                "agency": "KNBS",
                "context": "HMIS",
                "id": facility.HMIS
            },
        ],
        updatedAt: new Date(),
        createdAt: new Date()
    };

    return site;

}
