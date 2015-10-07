/**
 * Transformer function for taking kenya-formated objects and outputting FRED-formated.
 */
module.exports = function(facility) {

    var example_facility = {
        "Name of School": "MTUMWA PRY SCH",
        "Level of Education": "PRIMARY SCHOOL",
        "Status of School": "PUBLIC",
        "Sponsor of School": "CENTRAL GOVERNMENT/DEB",
        "School Institution Type_1": "MIXED",
        "School Institution Type_2": "DAY ONLY",
        "School Institution Type_3": "ORDINARY",
        "Pupil Teacher Ratio": 839,
        "Pupil Classroom Ratio": 839,
        "Pupil Toilet Ratio": 0,
        "Total Number of Classrooms": 1,
        "Boys Toilets": 0,
        "Girls Toilets": 0,
        "Total Toilets": 0,
        "Teachers Toilets": 0,
        "Total Boys": 0,
        "Total Girls": 0,
        "Total Enrolment": 839,
        "GOK TSC Male": 0,
        "GOK TSC Female": 0,
        "Local Authority Male": 0,
        "Local Authority Female": 0,
        "PTA BOG Male": 1,
        "PTA BOG Female": 0,
        "Others Male": 0,
        "Others Female": 0,
        "Non-Teaching Staff Male": 0,
        "Non-Teaching Staff Female": 0,
        "Province": "COAST",
        "County": "KWALE",
        "District": "KWALE",
        "Division": "MSAMBWENI",
        "Location": "MWERENI",
        "Costituency": "MSAMBWENI",
        "Geolocation": "(-4.248295, 39.085658)",
        "KODI_County": null
    };

    var coords = facility['Geolocation'];

    coords = coords.substring(1, coords.length - 2);

    coords = coords.split(', ');

    var site = {
        name: facility["Name of School"],
        active: true,
        coordinates: [parseFloat(coords[1]),parseFloat(coords[0])],
        properties: {
            sector: 'education',
            type: facility["Level of Education"],
            public_or_private: facility["Status of School"],
            grid_power: '',
            improved_water_supply: '',
            improved_sanitation: '',
            province: facility.Province,
            county: facility.County,
            district: facility.District,
            division: facility.Division,
            location: facility.Location,
            constituency: facility.Constituency,
            country: 'KENYA',
            visits: 0
        },
        updatedAt: new Date(),
        createdAt: new Date()
    };

    return site;

}
