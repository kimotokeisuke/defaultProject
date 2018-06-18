inlets = 1;
outlets = 2;

var a_p = [];
var s_n;

function anything()
{
	a_p.push(messagename);
}

function bang()
{
	a_p = [];
}

function msg_int(val)
{
	outlet(1,a_p[val]);
	
	if(a_p[val]!==s_n)
		outlet(0,1);
	else
		outlet(0,0);
}

function set(val)
{
	s_n = val +"";
}