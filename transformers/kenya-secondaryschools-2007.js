/**
 * Transformer function for taking kenya-formated objects and outputting FRED-formated.
 */
module.exports = function(facility) {

    var example_facility = {
        "Code": "H3010415",
        "Name of School": "ROKA SEC SCH",
        "School Address": "271 KILIFI",
        "Public or Private": "PUBLIC",
        "School Sponsor": "CENTRAL GOVERNMENT/DEB",
        "Girls/Boys/Mixed": "MIXED",
        "Day or Boarding": "DAY ONLY",
        "Ordinary or Special": "ORDINARY",
        "Total Enrolment 2007": 25,
        "Pupil Teacher Ratio": 5,
        "Total Teaching staff": 5,
        "Acreage per enrolment": 2.8,
        "TSC Male Teachers": 0,
        "TSC Female Teachers": 0,
        "Local Authority Male Teachers": 0,
        "Local Authority Female Teachers": 0,
        "PTA Board of Governors Male Teacher": 3,
        "PTA Board of Governors Female Teacher": 2,
        "Other Male Teachers": 0,
        "Other Female Teachers": 0,
        "Non Teaching Staff Male": 0,
        "Non Teaching Staff Female": 0,
        "Acreage": 9,
        "Province": "COAST",
        "County": "KILIFI",
        "District": "KILIFI",
        "Division": "BAHARI",
        "Location": "ROKA",
        "Sublocation": "ROKA",
        "School Zone": "CENTRAL",
        "Costituency": "BAHARI",
        "Location 1": "(-3.43146900000, 39.90130200000)",
        "KODI_County_info": "Kilifi"
    };

    var coords = facility['Location 1'];

    coords = coords.substring(1, coords.length - 2);

    coords = coords.split(', ');

    var site = {
        name: facility["Name of School"],
        active: true,
        coordinates: [parseFloat(coords[1]),parseFloat(coords[0])],
        properties: {
            sector: 'education',
            type: "SECONDARY SCHOOL",
            public_or_private: facility["Status of School"],
            grid_power: '',
            improved_water_supply: '',
            improved_sanitation: '',
            province: facility.Province,
            county: facility.County,
            district: facility.District,
            division: facility.Division,
            location: facility.Location,
            sub_location: facility.Sublocation,
            constituency: facility.Constituency,
            country: 'KENYA',
            visits: 0
        },
        updatedAt: new Date(),
        createdAt: new Date()
    };

    return site;

}
