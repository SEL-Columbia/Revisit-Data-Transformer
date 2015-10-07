#!/usr/local/bin/node
var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require('fs'));
    sites = [],
    program = require('commander');

program
  .version('0.0.1')
  .option('-i, --infile <infile>', 'In filepath')
  .option('-o, --outfile <outfile>', 'Out filepath')
  .option('-t, --transformer <transformer>', 'Transformer module, should export a function that takes an object and returns a new object.')
  .parse(process.argv);

if (!program.infile) {
}
if (!program.infile) {
    console.error('Infile is required');
    program.outputHelp();
    process.exit();
} else {
    console.log('Transforming ' + program.infile);
}

var infile = program.infile,
    outfile = program.outfile || 'out.json',
    transformer = program.transformer ? require(program.transformer) : transformItem,
    outpath = './export/';



// do it to it
main();



// kick off the transformation
function main() {
    console.log(infile);
    fs.readFileAsync(infile)
        .then(JSON.parse)
        .then(function(parsed) {

            return transform(parsed, transformer);
        })
        .then(saveToFile)
        .catch(function(e) {
            console.error(e);
        });
}

/**
 * Save the given JS object to a file.
 * @param  {[type]} sites [description]
 * @return {[type]}       [description]
 */
function saveToFile(sites) {
    writeFile(outpath + outfile, JSON.stringify(sites));
}

/**
 * Write the string contents to the file.
 * @param  {String} file     filepath of the file to be written
 * @param  {String} contents contents to write into the file
 */
function writeFile(file, contents) {
    console.log('Saving output file...');
    fs.writeFile(file, contents, 'utf8', function(err) {
        console.log('Save complete.');
        if (err) {
            console.error(err);
        }
    })
}

/**
 * Transform input array item by item via transformer function,
 * resulting in an output array of the transformed objects.
 * @param  {Array} in_ary           Input array
 * @param  {Function} transformer   Transformer function
 * @return {Array}                  Output array
 */
function transform(in_ary, transformer) {
    process.stdout.write('Transforming ' + in_ary.length + ' items');
    var out_ary = [];
    in_ary.forEach(function(facility) {
        var site = transformer(facility);
        if (site) {
            out_ary.push(site);
        }
        process.stdout.write('.');
    });
    console.log(' transform complete.');
    return out_ary;
}

/**
 * Default transform.
 * @param  {Object} facility A facility object to be transformed.
 * @return {Object}          A transformed facility object.
 */
function transformItem(facility) {
    // just returns the facility untransformed...
    return facility;
}
