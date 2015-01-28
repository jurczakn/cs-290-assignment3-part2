
function addGist(list, g){

	var dt = document.createElement('dt');

	var lnk = document.createElement('A');

	lnk.href = g.html_url;

	lnk.text = g.description;

	dt.appendChild(lnk);

	list.appendChild(dt);
};

function listGists(gList){

	var resLis = document.getElementById("searchResults");

	var languages = document.getElementsByName ("language");

	var langTot = 0;

	var k;

	for (k = 0; k < languages.size; k++){

		if (languages[k].checked){

			langTot++;
		}
	}

	var hypArray = [];

	var i;

	for (i = 0; i < gList.length; i++){

		if (langTot == 0){

			addGist(resLis, gList[i]);
		}

		else {

			for (var j = 0; j < languages.size; j++){

				if(languages[i].checked && gList[i].contains(languages[i].value)){

				addGist(resLis, gList[i]);

				}

			}

		}


	}

};

function getGists () {

	var reg = new XMLHttpRequest();
	
	if(!reg){

		throw 'Unable to create HttpRequest.';

	}

	var baseurl = 'https://api.github.com/gists';



	var pages = document.getElementById("pages").value;

	for(var i = 1; i <= pages; i++){

		var url = baseurl + '?page=' + i + '&per_page=30';
	
		reg.open('GET', url);

		reg.send();

		reg.onreadystatechange = function(){

			if(this.readyState === 4){

				var gists = JSON.parse(this.responseText);

			 	listGists(gists);

				console.log(gists.length);

			}

		}
	}
};


window.onload = function () {


};

