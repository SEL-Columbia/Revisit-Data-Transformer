# Revisit Data Transformer

This is a simple utility for transforming facility data into a format ready for import into revisit. It can be used for any data transforms, really... just takes an array of js objects, runs each through a supplied transform function, and saves the resulting array to a file.

## Usage

The utility assumes you have a json file containing an array of json objects to be transformed. Using the command line, simply pass the input filepath, a path to a transformer module (described below), and the desired output filename.

For clarity, it's helpful to place data files in a `data` directory and tranform modules in a `transformers` directory. All output files will be written to the `export` directory.

```bash
$ ./transform.js -i [input_filepath] -t [transform_module_path] -o [output_filename]
```


## Example

Let's say we have a JSON file containing the following array of data:

**./data/kenya-health-sites.json**
```json
[{
    "Facility Name": "KIAMBU DISTRICT HOSPITAL",
    "HMIS": 251,
    "Province": "CENTRAL",
    "District": "KIAMBU",
    "Division": "KIAMBAA",
    "LOCATION": "KIAMBAA S/AREA",
    "County": "KIAMBU",
    "Constituency": "GATUNDU NORTH",
    "Sub-Location": "TOWNSHIP(KIAMBAA)",
    "Spatial Reference Method": "GPS",
    "Facility Type": 1,
    "Agency": "MOH",
    "coordinates": [36.82993000000, -1.16938000000],
    "properties": {
        "sector": "health",
        "type": "Hospital Moh and Mission Districts, sub-districts",
        "visits": 0
    }
}, {
    "Facility Name": "KIJABE HOSPITAL",
    "HMIS": 252,
    "Province": "CENTRAL",
    "District": "KIAMBU",
    "Division": "LARI",
    "LOCATION": "KIJABE",
    "County": "KIAMBU",
    "Constituency": "GATUNDU NORTH",
    "Sub-Location": "KIJABE",
    "Spatial Reference Method": "GPS",
    "Facility Type": 1,
    "Agency": "MISS",
    "coordinates": [36.59431000000, -0.94349000000],
    "properties": {
        "sector": "health",
        "type": "Hospital Moh and Mission Districts, sub-districts",
        "visits": 0
    }
}]
```

We want to transform it to the following format:

```json
[{
    "name": "KIAMBU DISTRICT HOSPITAL",
    "active": true,
    "coordinates": [36.82993, -1.16938],
    "properties": {
        "sector": "health",
        "type": "Hospital Moh and Mission Districts, sub-districts",
        "grid_power": "",
        "improved_water_supply": "",
        "improved_sanitation": "",
        "province": "CENTRAL",
        "district": "KIAMBU",
        "location": "KIAMBAA S/AREA",
        "county": "KIAMBU",
        "country": "KENYA",
        "constituency": "GATUNDU NORTH",
        "sub-location": "TOWNSHIP(KIAMBAA)",
        "visits": 0
    },
    "identifiers": [{
        "agency": "KNBS",
        "context": "HMIS",
        "id": 251
    }],
    "updatedAt": "2015-10-07T18:56:54.702Z",
    "createdAt": "2015-10-07T18:56:54.702Z"
}, {
    "name": "KIJABE HOSPITAL",
    "active": true,
    "coordinates": [36.59431, -0.94349],
    "properties": {
        "sector": "health",
        "type": "Hospital Moh and Mission Districts, sub-districts",
        "grid_power": "",
        "improved_water_supply": "",
        "improved_sanitation": "",
        "province": "CENTRAL",
        "district": "KIAMBU",
        "location": "KIJABE",
        "county": "KIAMBU",
        "country": "KENYA",
        "constituency": "GATUNDU NORTH",
        "sub-location": "KIJABE",
        "visits": 0
    },
    "identifiers": [{
        "agency": "KNBS",
        "context": "HMIS",
        "id": 252
    }],
    "updatedAt": "2015-10-07T18:56:54.702Z",
    "createdAt": "2015-10-07T18:56:54.702Z"
}]
```

In this case, we'd create a simple transform module specific to our known in/out formats -- it just exports a function which will take a single object as an argument, transform that object, and return it.

**./transformers/kenya-health.js**
```javascript
/**
 * Transformer function for taking kenya-formated objects and outputting FRED-formated.
 */
module.exports = function(facility) {

    var site = {
        name: facility["Facility Name"],
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
````

We can then process the transformation via the command-line utility:

```bash
$ ./transform.js -i "./data/kenya-health-sites.json" -t "./transformers/kenya-health.js" -o "kenya-health-transformed.json"
```

The utility will load the input json, iterate through its contents transforming each object, then write the results to the output file.
