let visa = require('./ni-visa.js');
let vcon = require('./ni-visa-constants.js');

let status;
let sesn;

let data = {
    address : '',
    power : '10',
    duration : '10'
}

function getDeviceList(){
    [status, sesn] = visa.viOpenDefaultRM();
    visa.vhListResources(sesn).forEach(address => {
        console.log('>>> ', address);
        data.address = address;
    });
}

function sendSCPI(address, query){
    [status, vi] = visa.viOpen(sesn, address);
    resp = visa.vhQuery(vi, query);
    visa.viClose(vi);
    console.log('>>> ', resp);
}

/*
========== SCPI COMMANDS ==========
sendSCPI(data.address, ":INSTrument:NSELect 46");
sendSCPI(data.address, ":PIManalyzer:MEASure:VALue?");
sendSCPI(data.address, ":PIManalyzer:OUTPut:POWer " + data.power);
sendSCPI(data.address, ":PIManalyzer:TEST:DURation " + data.duration);
sendSCPI(data.address, "INITiate:PIManalyzer:MEASure ON");
sendSCPI(data.address, "SENSe:PIManalyzer:MODe PIM");
*/

getDeviceList();
sendSCPI(data.address, ":INSTrument:NSELect 46");
sendSCPI(data.address, "SENSe:PIManalyzer:MODe PIM");
// sendSCPI(data.address, ":PIManalyzer:OUTPut:POWer " + data.power);


