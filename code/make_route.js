inlets = 1;
outlets = 2;

var address = [];
var route;
var sender = [];
var sender_num;
var portnum;
var udpreceive;
var umenu = [];
var oscmonitor_route;
var oscmonitor_sender;
var works_name = "";
var osc_address;
var osc_printer = patcher.getnamed("OSCPrinter");

function name(){
	works_name = arguments[0];
	osc_address = "\u002fsound\u002f" + works_name + "\u002f"
	outlet(1,osc_address);
}

function make_route(){
	if(sender_num){
		this.patcher.remove(route);
		for(i = 0;i<sender_num;i++){
			this.patcher.remove(sender[i]);
		}
	}
	sender_num = arguments.length;
	for(var k=0; k < sender_num;k++){
		address[k] = arguments[k];
	}
	route = this.patcher.newdefault(0, 40, "route", address);
	outlet(0,"clear");
	umenu = ["insert",0,"OSCMonitor"];
	outlet(0,umenu);
	for(var k=0; k < sender_num; k++){
		umenu = ["insert",k+1,arguments[k]]
		outlet(0,umenu);
		arguments[k]=arguments[k].replace(new RegExp(osc_address,'g'),"---");
		// 上の列のwafの部分に作品名を入れる
		sender[k] = this.patcher.newdefault(0+(k*120),80,"send",arguments[k]);
		this.patcher.connect(route,[k],sender[k],0);
	}
	if(udpreceive){
		this.patcher.connect(udpreceive,0,route,0);
	}
	outlet(1,name);
}

function port(val){
	if(udpreceive){
		this.patcher.remove(udpreceive);
	}
	portnum = arguments[0];
	udpreceive = this.patcher.newdefault(0,0,"udpreceive",portnum);
	if(route){
		this.patcher.connect(udpreceive,0,route,0);
	}

}


function OSCMonitor(val){
	if(oscmonitor_route){
		this.patcher.remove(oscmonitor_route);
		// this.patcher.remove(oscmonitor_sender);
	}
	oscmonitor_route = this.patcher.newdefault(0, 150,"route",address[arguments[0]-1]);
	this.patcher.connect(udpreceive,0,oscmonitor_route,0);
	// oscmonitor_sender = this.patcher.newdefault(0, 180, "send","---OSCMonitor");
	this.patcher.connect(oscmonitor_route,0,osc_printer,0);
}
