/* Fichier index.js */
/* Projet MT5 presets */
/* Auteur : Nouriel AZRIA */
/* Description : Fichier js de creation et gestion des presets et de l'affichage de ceux la */

/* ---------------------------------------------------------------------------------------- */

/* Class Preset */
/* Description : Class representant les informations d'un preset */
/* Arguments : type - le nom d'un preset */
function Preset(type){

	// --- Attributs
	// 
	var m_type = type;
	var m_option = []; // Liste des options du preset

	// --- Methodes
	// 
	
	// --- Methode getType
	// 
	this.getType = function(){
		return(m_type);
	};
	
	// --- Methode setType
	// 
	this.setType = function(type){
		m_type = type;
	};

	// --- Methode ajouterOption
	// 
	this.ajouterOption = function(option){
		m_option.push(option);
	};

	// --- Methode retirerOption
	// 
	this.retirerOption = function(option){

		// Trouver l'indice de l'option
		var index = m_option.indexOf(option);
	
		// Si trouve, retirer de la liste
		if (index > -1) {
    		m_option.splice(index, 1);
		}
	};

}

/* Class GBasePreset */
/* Description : Class representant le graphique d'un preset */
/* Arguments : div - la div qui represente de maniere graphique le preset 
			   preset - instance de la classe Preset descrivant le preset */
function GBasePreset(div, preset) {

	// --- Attributs
	// 
	var m_div = div;
	var m_preset = preset;
	//var m_dimension = new Dimension(10, 10); // Les dimensions du div
	//var m_img

	// --- Methodes
	// 
	
	// --- Methode getPreset
	// 
	this.getPreset = function(){
		return(m_preset);
	};

	// --- Methode getDiv
	// 
	this.getDiv = function(){
		return(m_div);
	};

	// --- Methode setPosition
	// 
	/*this.setDimension = function(largeur, hauteur){
		m_dimension.setDimension(largeur, hauteur);
	};*/

}

/* Class GPreset */
/* Description : Class representant le graphique d'un preset reel */
/* Arguments : div - la div qui represente de maniere graphique le preset 
			   preset - instance de la classe Preset descrivant le preset */
function GPreset(div, preset) {

	// Heritage
	GBasePreset.call(this, div, preset);

	// --- Attributs
	// 
	var m_predecesseur = []; // Les GBasePreset (ou filles) qui precedent
	var m_successeur = []; // Les GBasePreset (ou filles) qui suivent

	// --- Methodes
	// 
	
	// --- Methode getPredecesseurs
	// 
	this.getPredecesseurs = function(){
		return(m_predecesseur);
	};

	// --- Methode getSuccesseurs
	// 
	this.getSuccesseurs = function(){
		return(m_successeur);
	};

}
GPreset.prototype = new GBasePreset();
GPreset.prototype.ajouterPredecesseur = ajouterPredecesseur;
GPreset.prototype.ajouterSuccesseur = ajouterSuccesseur;
GPreset.prototype.retirerPredecesseur = retirerPredecesseur;
GPreset.prototype.retirerSuccesseur = retirerSuccesseur;


/* Class GPresetDebut */
/* Description : Class representant le graphique de l'entree */
/* Arguments : div - la div qui represente de maniere graphique le preset d'entree 
			   preset - instance de la classe Preset descrivant le preset d'entree */
function GPresetDebut(div, preset) {

	// Heritage
	GBasePreset.call(this, div, preset);

	// --- Attributs
	// 
	var m_successeur = []; // Les GBasePreset (ou filles) qui suivent

	// --- Methodes
	// 

	// --- Methode getSuccesseurs
	// 
	this.getSuccesseurs = function(){
		return(m_successeur);
	};

}
GPresetDebut.prototype = new GBasePreset();
GPresetDebut.prototype.ajouterSuccesseur = ajouterSuccesseur;
GPresetDebut.prototype.retirerSuccesseur = retirerSuccesseur;

/* Class GPresetFin */
/* Description : Class representant le graphique d'un preset de fin */
/* Arguments : div - la div qui represente de maniere graphique le preset de fin
			   preset - instance de la classe Preset descrivant le preset de fin */
function GPresetFin(div, preset) {

	// Heritage
	GBasePreset.call(this, div, preset);

	// --- Attributs
	// 
	var m_predecesseur = []; // Les GBasePreset (ou filles) qui precedent

	// --- Methodes
	// 
	
	// --- Methode getPredecesseurs
	// 
	this.getPredecesseurs = function(){
		return(m_predecesseur);
	};

}
GPresetFin.prototype = new GBasePreset();
GPresetFin.prototype.ajouterPredecesseur = ajouterPredecesseur;
GPresetFin.prototype.retirerPredecesseur = retirerPredecesseur;


/* Methodes a ajouter aux classes */
/* ============================== */

// --- Methode ajouterPredecesseur
// 
var ajouterPredecesseur = function(predecesseur){
	this.getPredecesseurs().push(predecesseur);
};

// --- Methode ajouterSuccesseur
// 
var ajouterSuccesseur = function(successeur){
	this.getSuccesseurs().push(successeur);
};

// --- Methode retirerPredecesseur
// 
var retirerPredecesseur = function(predecesseur){

	// Trouver l'indice du predecesseur
	var index = this.getPredecesseurs().indexOf(predecesseur);

	// Si trouve, retirer de la liste
	if (index > -1) {
		this.getPredecesseurs().splice(index, 1);
	}

};

// --- Methode retirerSuccesseur
// 
var retirerSuccesseur = function(successeur){

	// Trouver l'indice du predecesseur
	var index = this.getSuccesseurs().indexOf(successeur);
	// Si trouve, retirer de la liste
	if (index > -1) {
		this.getSuccesseurs().splice(index, 1);
	}

};


/* Class Dimension */
function Dimension(largeur, hauteur){

	// --- Attributs
	// 
	var m_largeur = largeur;
	var m_hauteur = hauteur;

	// --- Methodes
	// 

	// --- Methode getlargeur
	// 
	this.getlargeur = function(){
		return(m_largeur);
	};

	// --- Methode gethauteur
	// 
	this.gethauteur = function(){
		return(m_hauteur);
	};

	// --- Methode set
	// 
	this.setlargeur = function(largeur){
		m_largeur = largeur;
	};

	// --- Methode set
	// 
	this.sethauteur = function(hauteur){
		m_hauteur = hauteur;
	};

	// --- Methode setDimension
	// 
	this.setDimension = function(largeur, hauteur){
		m_largeur = largeur;
		m_hauteur = hauteur;
	};
}

/* Variables globales */
/* ================== */
var gPresets = []; // Liste des presets existants
var gPresetCourant; // Graphique preset courant
var conteneurPresets = $("#affichagePresents"); // Conteneur des presets
var nomPDeb = "Debut", nomPFin = "Fin"; // Le nom des presets speciaux

/* Definition des elements jsPlumb */
/* =============================== */

	/* Anchors */
	/* ======= */
	var anchorSortie = [ "Right", { shape:"Square", anchorCount:150 }];
	var anchorEntree = [ "Left", { shape:"Square", anchorCount:150 }];

	/* Endpoint */
	/* ======== */
	var endpointEntree = {
	    endpoint:"Dot",
	    maxConnections : -1,
	    isSource:false,
	    isTarget:true,
	    anchor : anchorEntree
	};

	var endpointSortie = {
	    endpoint:"Dot",
	    maxConnections : -1,
	    isSource:true,
	    isTarget:false,
	    anchor : anchorSortie
	};

/* /Fin definition des elements jsPlumb */
/* ==================================== */


// --- Fonction ajouterPreset
// --- Description : Ajouter un preset a la liste des presets existants
//
function ajouterPreset(type){

	// Creer le preset
	var preset = new Preset(type);

	// Creer une div d'affichage
	var divPreset = $("<div></div>").attr('class','divPreset').addClass('divPresetNormal');

	// Ajouter le CSS selon le type
	switch(type){

		// --- S'il s'agit d'un preset de debut
		case nomPDeb : 
			divPreset.addClass('divPresetDeb');
			break;

		// --- S'il s'agit d'un preset de fin
		case nomPFin : 
			divPreset.addClass('divPresetFin');
			break;

	}

	// Ajouter la div dans l'affichage
	divPreset.appendTo(conteneurPresets);

	// Creer le graphique du preset selon le type
	var gPreset;

	switch(type){

		// --- S'il s'agit d'un preset de debut
		case nomPDeb : 
			gPreset = new GPresetDebut(divPreset, preset);
			break;

		// --- S'il s'agit d'un preset de fin
		case nomPFin : 
			gPreset = new GPresetFin(divPreset, preset);
			break;

		// --- S'il s'agit d'un preset quelconque
		default :
			gPreset = new GPreset(divPreset, preset);

	}
	
	// --- jsPlumb ---
	// ---------------
	
	jsPlumb.ready(function() {

		// Rendre le graphique draggable uniquement dans le conteneur
		jsPlumb.draggable($(".divPreset"), {
		  containment:conteneurPresets
		});

		// Ajouter les endpoints
		ajouterEndPoints(gPreset);

	});

	// --- /jsPlumb ---
	// ----------------

	// Ajouter le preset a la liste
	gPresets.push(gPreset);

	// Renseigner le preset courant
	if(type != nomPDeb || type != nomPFin)
		gPresetCourant = gPreset;

	// Indiquer l'ajout du preset
	console.log("Preset " + type + " ajoute");

	// Sauvegarder l'etat des presets
	savePresets();

}

// --- Fonction ajouterEndPoints
// --- Description : Ajouter au GBasePreset (ou fille) un end point jsPlumb
//
function ajouterEndPoints(GBPreset){

	// Verifier quel type de GBasePreset il s'agit
	// -------------------------------------------

	// Verifier s'il s'agit d'un GBasePreset
	if(GBPreset instanceof GBasePreset){

		// Recuperer la div graphique
		var divPreset = GBPreset.getDiv();

		// Cas d'un GBPreset de debut
		if(GBPreset instanceof GPresetDebut){

			// Ajouter un endpoint de sortie
			jsPlumb.addEndpoint(divPreset, endpointSortie);

		}

		// Cas d'un GBPreset de fin	
		if(GBPreset instanceof GPresetFin){

			// Ajouter un endpoint d'entree
			jsPlumb.addEndpoint(divPreset, endpointEntree);
			
		}

		// Cas d'un GBPreset normal
		if(GBPreset instanceof GPreset){
			
			// Ajouter un endpoint de sortie
			jsPlumb.addEndpoint(divPreset, endpointSortie);

			// Ajouter un endpoint d'entree
			jsPlumb.addEndpoint(divPreset, endpointEntree);

		}

	}

}

// --- Fonction initialiserVuePresets
// --- Description : Initialiser la vue des presets 
//
function initialiserVuePresets(){

	// Creer un preset de debut
	// 
	ajouterPreset(nomPDeb);

	// Creer un preset de fin
	// 
	ajouterPreset(nomPFin);

}

/* Evenements globaux */
/* ------------------ */

// --- Initialisation de la page --- //
// --------------------------------- //
$(document).ready(function(){
   
	// Initialiser les presets de base
	initialiserVuePresets();

});

// --- jsPlumb --- //
// --------------- //
jsPlumb.ready(function() {
	//console.log("Il marche");
	//jsPlumb.setContainer($("#affichagePresents"));
	//jsPlumb.setContainer(document.getElementById("affichagePresents"));
});

// --- Gestion evenement click sur preset de la liste
//
$('#presetChoix').on('change', function() {

	// Recuperer le type
	var type = this.options[this.selectedIndex].text;

	// Ajouter le preset
	ajouterPreset(type);

});


function loadPresets() {
  if(localStorage.gPresets) {
    presets = JSON.parse(localStorage.gPresets);
    //displayPresets();
  }
}

function savePresets() {
   localStorage.gPresets = JSON.stringify(gPresets);
}

/*
function displayPresets() {
  listPR.innerHTML = "";
  
  for(var i = 0; i < presets.length; i++) {
    console.log(presets[i].name);
    var li = document.createElement("li");
    li.innerHTML = "<button onclick='setValues(" + i + ");' >" + presets[i].name + "</button>";
    listPR.appendChild(li);
  }
}
*/
