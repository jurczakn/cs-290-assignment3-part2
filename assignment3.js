
function listFavs(){

	var favList = JSON.parse(localStorage.getItem('userFavorites'));

	var list = document.getElementById("favorites");

	while (list.firstChild){

		list.removeChild(list.firstChild);

	}

	for (var i = 0; i < favList.favorites.length; i++){

		var dt = document.createElement('dt');

		var lnk = document.createElement('A');

		lnk.href = favList.favorites[i].link;

		lnk.text = favList.favorites[i].desc;

		var remBut = document.createElement("BUTTON");

		remBut.type = "button";

		remBut.textContent = "REMOVE";

		dt.appendChild(lnk);

		dt.appendChild(remBut);

		list.appendChild(dt);

		remBut.addEventListener('click', function(){

			for (var k = 0; k < favList.favorites.length; k++){
				if (favList.favorites[k].link == this.previousSibling.href){

					favList.favorites.splice(k, 1);

				}
			}

			localStorage.setItem('userFavorites', JSON.stringify(favList));

			listFavs();

		});


	}

};

function favorited(lnk){

	var favList = JSON.parse(localStorage.getItem('userFavorites'));
	
	for (var k = 0; k < favList.favorites.length; k++){

		if (favList.favorites[k].link == lnk.html_url){

			return true;

		}
	}
	
	return false;

};

function fav(lnk){

	this.link = lnk.href;

	this.desc = lnk.text;

};

function addGist(list, g){

	var dt = document.createElement('dt');

	var lnk = document.createElement('A');

	lnk.href = g.html_url;

	lnk.text = g.description;

	if (lnk.text == ""){

		lnk.text = "No description";

	}

	var favBut = document.createElement("BUTTON");

	favBut.type = "button";

	favBut.textContent = "ADD FAVORITE";

	dt.appendChild(lnk);

	dt.appendChild(favBut);

	list.appendChild(dt);

	favBut.addEventListener('click', function(){

		var favList = JSON.parse(localStorage.getItem('userFavorites'));

		favList.favorites.push(new fav(lnk));

		localStorage.setItem('userFavorites', JSON.stringify(favList));

		lnk.parentNode.removeChild(lnk);

		favBut.parentNode.removeChild(favBut);

		listFavs();
	});

};

function listGists(gList){

	var resLis = document.getElementById("searchResults");

	var languages = document.getElementsByName ("language");

	var langTot = 0;

	var k;

	for (k = 0; k < languages.length; k++){

		if (languages[k].checked){

			langTot++;
		}
	}

	var hypArray = [];

	var i;

	for (i = 0; i < gList.length; i++){

		if (langTot == 0 && !favorited(gList[i])){

			addGist(resLis, gList[i]);
		}

		else if(!favorited(gList[i])) {

			for (var j = 0; j < languages.length; j++){

				if(languages[j].checked){

					for (var file in gList[i].files) {

						if (gList[i].files[file].language == languages[j].value){

							addGist(resLis, gList[i]);
						}

					}

				}

			}

		}

	}

};

function getGists () {

	var baseurl = 'https://api.github.com/gists';

	var resLis = document.getElementById("searchResults");

	while (resLis.firstChild){

		resLis.removeChild(resLis.firstChild);
	}

	var pages = document.getElementById("pages").value;

	if(pages > 5){

		pages = 5;

	}

	for(var i = 1; i <= pages; i++){

		var reg = new XMLHttpRequest();
	
			if(!reg){

				throw 'Unable to create HttpRequest.';

			}


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
	
	var favoritesList = localStorage.getItem('userFavorites');

	if (favoritesList == null){

		favoritesList = {'favorites':[]};

		localStorage.setItem('userFavorites', JSON.stringify(favoritesList));
	}

	listFavs();

};

