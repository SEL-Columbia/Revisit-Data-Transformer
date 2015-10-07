var fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    data_dir = __dirname + '/data/lgas',
    sites = [];


MongoClient.connect('mongodb://127.0.0.1:27017/sel', function(err, db) {
    if (err) throw err;
    // readFilesFromDir('./data/lgas');
    var dir = './data/lgas';
    fs.readdir(dir, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
        	if (file.indexOf('.') === 0) {
        		return;
        	}
        	var path = dir + "/" + file;
        	console.log(path);
        	// parseFile(dir + "/" + file);
        	var data = fs.readFileSync(path);
        	data = JSON.parse(data);
	        var facilities = data.facilities || [];

	        facilities.forEach(function(facility) {
	        	var site = transformToSite(facility);
	        	//insertIntoDb(site);
	        	if (site) {
	        		sites.push(site);
	        	}
	    	});
        });

        insertIntoDb(db, sites);
    });
    
});


function readFilesFromDir(dir) {
    fs.readdir(dir, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
        	if (file.indexOf('.') === 0) {
        		return;
        	}
        	var path = dir + "/" + file;
        	// console.log(path);
        	parseFile(dir + "/" + file);
        });
    });
}

function parseFile(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        console.log(file);

        data = JSON.parse(data);
        var facilities = data.facilities || [];

        facilities.forEach(function(facility) {
        	var site = transformToSite(facility);
        	//insertIntoDb(site);
        	if (site) {
        		console.log("SITE: " + site);
        		sites.push(site);
        	}
    	});
    });
}

function transformToSite(facility) {

	var example_facility = {
        "facility_name": "Wilcox memoral comprehensive sec.sch",
        "facility_type_display": "Junior and Senior Secondary school combined",
        "improved_water_supply": true,
        "improved_sanitation": false,
        "chalkboard_each_classroom_yn": true,
        "num_tchrs_with_nce": "25",
        "num_tchr_full_time": " 33",
        "num_students_total": " 600",
        "num_classrms_total": "15",
        "phcn_electricity": true,
        "num_toilets_total": " 0",
        "num_students_male": " 600",
        "num_students_female": "   0",
        "num_tchrs_male": " 8",
        "num_tchrs_female": "25",
        "date_of_survey": "2014-02-26",
        "education_type": "formal_only",
        "facility_id": "ECXRX",
        "community": "Xxx",
        "ward": "Xxx",
        "management": "public",
        "sector": "education",
        "formhub_photo_id": "1393408788454.jpg",
        "gps": "5.113 7.3859 91.5 5",
        "survey_id": "79e6ae26-fe08-491f-8938-640949a23665",
        "unique_lga": "abia_aba_north",
        "latitude": "5.113000",
        "longitude": "7.385900",
        "maternal_health_delivery_services": null,
        "emergency_transport": null,
        "skilled_birth_attendant": null,
        "num_chews_fulltime": null,
        "c_section_yn": null,
        "child_health_measles_immun_calc": null,
        "num_nurses_fulltime": null,
        "num_nursemidwives_fulltime": null,
        "num_doctors_fulltime": null,
        "vaccines_fridge_freezer": null,
        "antenatal_care_yn": null,
        "family_planning_yn": null,
        "malaria_treatment_artemisinin": null,
        "water_point_type": null,
        "is_improved": null,
        "functional": null,
        "breakdown": null,
        "lift_mechanism": null
    };

    var name = facility.facility_name ? facility.facility_name.toLowerCase() : 'site name unavailable',
    	sector = facility.sector ? facility.sector.toLowerCase() : 'sector unavailable',
    	type = facility.facility_type_display ? facility.facility_type_display.toLowerCase() : 'type unavailable',
    	coordinates = [],
        grid_power = typeof facility.phcn_electricity !== 'undefined' ? facility.phcn_electricity : 'unknown',
        improved_water_supply = typeof facility.improved_water_supply !== 'undefined' ? facility.improved_water_supply : 'unknown',
        improved_sanitation = typeof facility.improved_sanitation !== undefined ? facility.improved_sanitation : 'unknown';

    // clean up name
    name = name.trim();
    name = name.replace('\n', '');

    if (facility.longitude && facility.latitude) {
		coordinates = [
			parseFloat(facility.longitude),
			parseFloat(facility.latitude)
		];
    } else {
    	return null;
    }

	var site = {
		name: name,
		active: true,
		coordinates: coordinates,
		properties: {
			sector: sector,
			type: type,
            grid_power: grid_power,
            improved_water_supply: improved_water_supply,
            improved_sanitation: improved_sanitation, 
			visits: 0
		},
		updatedAt: new Date(),
		createdAt: new Date()
	};

	return site;

}

function insertIntoDb(db, sites) {
    var collection = db.collection('facilities');

    collection.insert(sites, function(err, docs) {

    	if (err) {
    		console.log(err);
    		return;
    	}

    	console.log('sites inserted');
    	db.close();
        process.exit();
    });
}

// parseFile('./data/lgas/abia_aba_north.json');
