/* Fichier index.js */
/* Projet MT5 presets */
/* Auteur : Nouriel AZRIA */
/* Description : Fichier js de creation et gestion des presets et de l'affichage de ceux la */

/* ---------------------------------------------------------------------------------------- */


/* Classes GBasePreset */
/* =================== */


/* Class Preset */
/* Description : Class representant les informations d'un preset */
/* Arguments : type - le nom d'un preset */
function Preset(type){

	// --- Attributs
	// 
	var m_type = type;	// Type de preset (nom)
	var m_actif = true;	// Preset actif ou non
	var m_parametres = []; // Liste des parametres du preset
	var m_ancre;		// Lien vers le GBasePreset

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

	// --- Methode getActivation
	// 
	this.getActivation = function(){
		return(m_actif);
	};

	// --- Methode getParametres
	// 
	this.getParametres = function(){
		return(m_parametres);
	};

	// --- Methode changerActivation
	// 
	this.changerActivation = function(){

		if(m_actif)
			m_actif = false;
		else
			m_actif = true;

	};

	// --- Methode ajouterParametre
	// 
	this.ajouterParametre = function(parametre){
		m_parametres.push(parametre);
	};

	// --- Methode retirerParametre
	// 
	this.retirerParametre = function(parametre){

		// Trouver l'indice du parametre
		var index = m_parametres.indexOf(parametre);
	
		// Si trouve, retirer de la liste
		if (index > -1) {
    		m_parametres.splice(index, 1);
		}
	};

	// --- Methode getAncre
	// 
	this.getAncre = function(){
		return(m_ancre);
	};
	
	// --- Methode setAncre
	// 
	this.setAncre = function(gbp){
		m_ancre = gbp;
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
	//setAncre(m_preset);	// Faire le lien entre le preset et le GBP

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

	// --- Fonction setAncre
	// Description : Permet de faire un lien entre le GBP et le preset (pour naviguer)
	// 
	this.setAncre = function(){

		// Indiquer dans l'instance du preset le lien vers le GBasePreset
		m_preset.setAncre(this);

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


/* Methodes a ajouter aux classes GBasePreset */
/* ========================================== */

// --- Methode ajouterPredecesseur
// 
function ajouterPredecesseur(predecesseur) {
	this.getPredecesseurs().push(predecesseur);
}

// --- Methode ajouterSuccesseur
// 
function ajouterSuccesseur(successeur) {
	this.getSuccesseurs().push(successeur);
}

// --- Methode retirerPredecesseur
// 
function retirerPredecesseur(predecesseur) {

	// Trouver l'indice du predecesseur
	var index = this.getPredecesseurs().indexOf(predecesseur);

	// Si trouve, retirer de la liste
	if (index > -1) {
		this.getPredecesseurs().splice(index, 1);
	}

}

// --- Methode retirerSuccesseur
// 
function retirerSuccesseur(successeur) {

	// Trouver l'indice du predecesseur
	var index = this.getSuccesseurs().indexOf(successeur);
	// Si trouve, retirer de la liste
	if (index > -1) {
		this.getSuccesseurs().splice(index, 1);
	}

}


/* Classes liees aux Parametre */
/* =========================== */

/* Class Parametre */
/* Description : Class representant un parametre d'un preset (ne sera utilisee que par ses classes filles) */
/* Arguments : nom - le nom du parametre
			   m_gParametre - la classe contenant le graphique du parametre */
function Parametre(nom, gParametre){

	// --- Attributs
	// 
	var m_nom = nom;	// Le nom du parametre
	var m_gParametre = gParametre; // Instance de la classe contenant le graphique representant le parametre

	// --- Methodes
	// 
	
	// --- Methode getNom
	// 
	this.getNom = function(){
		return(m_nom);
	};
	
	// --- Methode setNom
	// 
	this.setNom = function(nom){
		m_nom = nom;
	};

	// --- Methode getGParametre
	// 
	this.getGParametre = function(){
		return(m_gParametre);
	};
	
	// --- Methode setGParametre
	// 
	this.setGParametre = function(gp){
		m_gParametre = gp;
	};

}

/* Class GParametre */
/* Description : Class representant le graphique d'un parametre (ne sera utilisee que par ses classes filles) */
/* Arguments : graphique - l'element graphique (DOM, pedalboard, autre..)
			   typeValeurs - le type de valeurs du graphique (interval, liste, autre..) */
function GParametre(graphique, typeValeurs){

	// --- Attributs
	// 
	var m_graphique = graphique;	// L'instance du graphique a afficher
	var m_typeValeurs = typeValeurs; // Une chaine de caracteres indiquant le type de valeurs
	var m_valeurs = []; // Tableau contenant les valeurs (en correlation avec le type de valeur)

	// --- Methodes
	// 
	
	// --- Methode getGraphique
	// 
	this.getGraphique = function(){
		return(m_graphique);
	};
	
	// --- Methode setGraphique
	// 
	this.setGraphique = function(g){
		m_graphique = g;
	};

	// --- Methode getTypeValeurs
	// 
	this.getTypeValeurs = function(){
		return(m_typeValeurs);
	};
	
	// --- Methode setTypeValeurs
	// 
	this.setTypeValeurs = function(tv){
		m_typeValeurs = tv;
	};

	// --- Methode getValeurs
	// 
	this.getValeurs = function(){
		return(m_valeurs);
	};
	

	// --- Methode ajouteValeur
	// 
	this.ajouteValeur = function(valeur){
		m_valeurs.push(valeur);
	};

	// --- Methode retirerValeur
	// 
	this.retirerValeur = function(valeur){

		// Trouver l'indice de la valeur
		var index = m_valeurs.indexOf(valeur);
	
		// Si trouve, retirer de la liste
		if (index > -1) {
    		m_valeurs.splice(index, 1);
		}
	};

}

/* Classes filles de la classe Parametre */
/* ===================================== */

/* Class ParametreGain */
/* Description : Class representant un parametre Gain d'un preset */
/* Arguments : minVal - la valeur minimale de l'intervalle
			   maxVal - la valeur maximale de l'intervalle
			   steps - valeur de saut lors d'un changement  */
function ParametreGain(minVal, maxVal, steps){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Gain");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(minVal, maxVal, steps);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreGain.prototype = new Parametre();
ParametreGain.prototype.traiterAudio = traiterAudioGain;

/* Class ParametrePan */
/* Description : Class representant un parametre Pan d'un preset */
function ParametrePan(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Pan");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(-1, 1, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametrePan.prototype = new Parametre();
ParametrePan.prototype.traiterAudio = traiterAudioPan;

/* Methodes a ajouter aux classes Parametre */
/* ======================================== */

// --- Methode traiterAudioGain
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioGain(flux) {
	/* TODO */
}

// --- Methode traiterAudioPan
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioPan(flux) {
	/* TODO */
}


/* Classes filles de la classe GParametre */
/* ====================================== */

/* Class GParametreKnob */
/* Description : Class representant le graphique issu du plugin Knob */
/* Arguments : valMin - valeur minimal de l'intervalle
			   valMax - valeur maximale de l'intervalle 
			   step - valeur de saut lors d'un changement */
function GParametreKnob(valMin, valMax, step){

	// Appeler la classe mere (heritage)
	GParametre.call(this);

	// Creer un element Knob
	var graphique = $("<input class='knob' data-angleOffset=-125 data-angleArc=250 data-rotation=clockwise data-linecap=round>");

	// Indiquer les valeurs parametres de l'element
	graphique.attr("data-min", valMin);
	graphique.attr("data-max", valMax);
	graphique.attr("data-step", step);
	graphique.attr("value", valMin);

	// Indiquer la taille de l'element
	graphique.attr("data-height", 75);
	graphique.attr("data-width", 75);

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Intervalle";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique.get()[0]);
	this.ajouteValeur(valMin);
	this.ajouteValeur(valMax);
	this.ajouteValeur(step);

	/*for(var i=0; i<getValeurs().length; i++)
		console.log("Le graphique " + i + " : " + getValeurs()[i]);*/

}
GParametreKnob.prototype = new GParametre();
GParametreKnob.prototype.getValeurTraite = getValeurTraiteKnob;

/* Methodes a ajouter aux classes GParametre */
/* ===============================\========= */

// --- Methode getValeurTraiteKnob
// 
function getValeurTraiteKnob() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).val();

	// Renvoyer la valeur
	return val;
}

/* ********************************************************* DEBUT TRAITEMENT ********************************************************* */
/* ************************************************************************************************************************************ */
/* ************************************************************************************************************************************ */
/* ************************************************************************************************************************************ */

/* Variables globales */
/* ================== */
var gPresets = []; // Liste des presets existants
var gPresetCourant; // Graphique preset courant (pour traitements des elements independants du gPreset mais qui le concerne (ex : parametres associes))
var conteneurPresets = $("#affichagePresents"); // Conteneur des presets
var conteneurParametres = $("#affichageParametres"); // Conteneur des parametres
var jspInstance = jsPlumb.getInstance(); // Une instance de jsPlumb
var nomPDeb = "debut", nomPFin = "fin"; // Le nom des presets speciaux
var srcImgs = "./imgs/effects/";	// Lien dynamique vers le dossier des images


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

// --- Fonction getGPresetFromDiv
// --- Description : Recuperer le GPreset correspondant au div donne en parametre
//
function getGPresetFromDiv(div){

	// Scanner les GPresets existants
	
	var GP, GPdiv;
	for(var i=0; i<gPresets.length; i++){
		
		// Recuperer le GPreset
		GP = gPresets[i];

		// Recuperer la div du GPreset
		GPdiv = GP.getDiv();

		// Verifier si la div correspond
		if(GPdiv === div){
			return GP;
		}
	}

	// Renvoyer une erreur
	return -1;

}

// --- Fonction ajouterEndPoints
// --- Description : Ajouter au GBasePreset (ou fille) un end point jsPlumb
//
function ajouterEndPoints(GBPreset){

	// Verifier quel type de GBasePreset il s'agit
	// -------------------------------------------

	// console.log(GBPreset.getDiv());
	// console.log($(GBPreset.getDiv()).width());

	// Verifier s'il s'agit d'un GBasePreset
	if(GBPreset instanceof GBasePreset){

		// Recuperer la div graphique
		var divPreset = GBPreset.getDiv();

		// Cas d'un GBPreset de debut
		if(GBPreset instanceof GPresetDebut){

			// Ajouter un endpoint de sortie
			jspInstance.addEndpoint(divPreset, endpointSortie);

		}

		// Cas d'un GBPreset de fin	
		if(GBPreset instanceof GPresetFin){

			// Ajouter un endpoint d'entree
			jspInstance.addEndpoint(divPreset, endpointEntree);
			
		}

		// Cas d'un GBPreset normal
		if(GBPreset instanceof GPreset){
			
			// Ajouter un endpoint de sortie
			jspInstance.addEndpoint(divPreset, endpointSortie);

			// Ajouter un endpoint d'entree
			jspInstance.addEndpoint(divPreset, endpointEntree);

		}

	}

}

// --- Fonction initialiserVuePresets
// --- Description : Initialiser la vue des presets 
//
function initialiserVuePresets(){

	// Restaurer l'etat des variables stockees
	// 
	//loadPresets();

	// Creer un preset de debut
	// 
	ajouterPreset(nomPDeb);

	// Creer un preset de fin
	// 
	ajouterPreset(nomPFin);

}

// --- function constructImgPreset
// Description : Fonction permettant de construire l'image d'une div
// 
function constructImgPreset(nomPreset, div, CB){

	// Creer une instance image
	var img = new Image();

	// Indiquer le lien dynamique
	img.src = srcImgs + nomPreset + ".png";

	// Construire quand l'image s'est chargee
	img.onload = function(){

		// Renseigner l'image
		div.css('background-image', 'url('+ this.src +')');

		// Renseigner les dimensions
		div.css("width", this.width);
		div.css("height", this.height);

		// Appeler la fonction callback (construire les endpoints)
		CB();

	};

}

// --- Fonction retirerGBP
// Description : Retire le GBasePreset
//
function retirerGBP(div){

	// Recuperer le GBasePreset
	var gbp = getGPresetFromDiv(div);

	// Retirer les predecesseurs (mutuellement)
	var predecs = gbp.getPredecesseurs();
	for(var i=0; i<predecs.length; i++){

		// Retirer le gPreset du predecesseur
		predecs[i].retirerSuccesseur(gbp);

		// Retirer le predecesseur du gPreset (optionnel, permet de laisser propre)
		gbp.retirerPredecesseur(predecs[i]);

	}

	// Retirer les successeurs (mutuellement)
	var success = gbp.getSuccesseurs();
	for(i=0; i<success.length; i++){

		// Retirer le gPreset du successeur
		success[i].retirerPredecesseur(gbp);

		// Retirer le successeur du gPreset (optionnel, permet de laisser propre)
		gbp.retirerSuccesseur(success[i]);

	}

	// Retirer le gPreset de la liste des gPresets globale
	retirerGPreset(gbp);

	// Retirer les connexions visuelles
	jspInstance.detachAllConnections($(div));
	jspInstance.removeAllEndpoints($(div));
	jspInstance.detach($(div));
	$(div).remove();

	console.log(gPresets.length);

}

// --- Fonction retirerLienGBP
// Description : Retire le lien GBasePreset (par les tableaux successeur et predeccesseur)
//
function retirerLienGBP(src, trg){

	// Recuperer GBP de la div src
	var GBPsrc = getGPresetFromDiv(src);

	// Recuperer GBP de la div trg
	var GBPtrg = getGPresetFromDiv(trg);

	// Retirer la source du target
	GBPtrg.retirerPredecesseur(GBPsrc);

	// Retirer le target de la source
	GBPsrc.retirerSuccesseur(GBPtrg);

}

// --- Fonction retirerGPreset
// Description : Retirer le gPreset de la liste des gPresets globale
//
function retirerGPreset(gPreset){

	// Trouver l'indice du gPreset dans le tableau
	var index = gPresets.indexOf(gPreset);

	// Si trouve, retirer de la liste
	if (index > -1) {
		gPresets.splice(index, 1);
	}

}

// --- Fonction presetExiste
// Description : Indique si un preset existe ou pas (selon la div)
//
function presetExiste(div){

	// Recuperer le GBasePreset
	var gPreset = getGPresetFromDiv(div);

	// Verifier si le gPreset existe
	if(gPreset != -1){

		// Trouver l'indice du gPreset dans le tableau
		var index = gPresets.indexOf(gPreset);

		// Si trouve, indiquer qu'il existe
		if (index > -1) 
			return true;
	}

	// Indiquer qu'il n'existe pas
	return false;
}

// --- Fonction savePresets
// Description : Sauvegarder l'etat de stockage des presets (version buggee)
//
function savePresets() {
   localStorage.gPresets = JSON.stringify(gPresets);
   //localStorage.jspInstance = JSON.stringify(jspInstance);
}

// --- Fonction loadPresets
// Description : Restaurer l'etat de stockage des presets (version buggee)
//
function loadPresets() {
  if(localStorage.gPresets) {
    gPresets = JSON.parse(localStorage.gPresets);
  }

  // if(localStorage.jspInstance) {
  //   jspInstance = JSON.parse(localStorage.jspInstance);
  // }
}

/* Evenements globaux */
/* ------------------ */

// --- Initialisation de la page --- //
// --------------------------------- //
$(document).ready(function(){
   
	// Initialiser les presets de base
	initialiserVuePresets();

	// Essayer implementation Knob
	/*var div = conteneurParametres;

	var knob = new GParametreKnob(10, 100, 10);
	$(knob.getGraphique()).appendTo(div);*/

});

// === Evenements jsPlumb === //
// ========================== //
jspInstance.ready(function() {
	//console.log("Il marche");
	//jsPlumb.setContainer($("#affichagePresents"));
	//jsPlumb.setContainer(document.getElementById("affichagePresents"));

	// --- Gestion evenement doubleclick sur un preset qui n'est ni celui du debut, ni celui de la fin
	//
	$("#affichagePresents").delegate(".divPresetNormal", "dblclick", function() {

		// Verifier si la div existe (corriger bug double demande, fonctionne sans car passe de on a delegate en d'hors du ready se trouvant dans ajouterPreset)
		var pExiste = presetExiste(this);

		// Recuperer l'instance de la div
		var tmpThis = this;

		// Demander confirmation de suppression du preset
		if(pExiste)
			bootbox.confirm("Êtes vous sûr de vouloir supprimer le preset?", function(result) {
				
				// Detacher si la demande est confirmee
				if(result){

					// Retirer le GBasePreset
					retirerGBP(tmpThis);
				}

			});

	});

});

// Evenement creation de connexion
// 
jspInstance.bind("connection", function (connInfo, originalEvent) {
    // console.log(getGPresetFromDiv(connInfo.source).getPreset().getType());
    //console.log(getGPresetFromDiv(connInfo.source).getdiv().id);
    // console.log(getGPresetFromDiv(connInfo.source).getDiv().id);
    //console.log(connInfo.source);
    //console.log(gPresets[2].getDiv());
    
    // Recuperer le GPreset source
    var GPS = getGPresetFromDiv(connInfo.source);

    // Recuperer le GPreset target
    var GPT = getGPresetFromDiv(connInfo.target);

    // Ajouter le lien (de class) du target dans le source
    GPS.ajouterSuccesseur(GPT);

    // Ajouter le lien (de class) du source dans le target
    GPT.ajouterPredecesseur(GPS);

    // Sauvegarder l'etat des variables a sauvegarder
	//savePresets();

});

// --- Gestion evenement click sur connexion (suppression effective)
// 
jspInstance.bind("click", function (conn) {

	//conn.setParameter("data-toggle", "confirmation");
	//$("._jsPlumb_connector").attr("data-toggle", "confirmation");
	//console.log($("._jsPlumb_connector"));

	// Verifier si la connexion existe reellement [CORRECTION BUG CLICK SUR ENDPOINT SANS CONNEXION]
	if(conn.source != undefined && conn.target != undefined)

		// Demander confirmation de suppression de la connexion
		bootbox.confirm("Êtes vous sûr de vouloir\n supprimer la connexion?", function(result) {
			
			// Detacher si la demande est confirmee
			if(result){

				// Recuperer la source
				var src = conn.source;

				// Recuperer la destination
				var trg = conn.target;

				// Retirer le lien respectif
				retirerLienGBP(src, trg);

				// Supprimer la connexion
				jspInstance.detach(conn);
			}

		}); 

});

// === /Fin Evenements jsPlumb === //
// =============================== //

// --- Gestion evenement click sur preset de la liste
//
$('#presetChoix').on('change', function() {

	// Recuperer le type
	var type = this.options[this.selectedIndex].text;

	// Ajouter le preset
	ajouterPreset(type);

});

// --- Fonction resetConteneurParametres
// Description : Retire tous les elements du conteneur des parametres
//
function resetConteneurParametres() {
  
	// Retirer tous les elements
	conteneurParametres.empty();

}

// --- Gestion evenement click sur un GBasePreset (pour afficher les parametres)
//
$("#affichagePresents").delegate(".divPresetNormal", 'click', function() {

	// Restaurer l'etat de l'affichage des parametres
	resetConteneurParametres();

	// Recuperer le GBasePreset associe
	var gbp = getGPresetFromDiv(this);

	// Indiquer que le GBasePreset present est celui dont on a clique
	gPresetCourant = gbp;

	// Creer un titre contenant le nom du preset
	var titrePreset = $("<h2>" + gbp.getPreset().getType() + "</h2>").attr('class','nomPreset');

	// Ajouter le titre a l'affichage des parametres
	titrePreset.appendTo(conteneurParametres);

	// Ajouter les parametres du GBasePreset
	var listeParams = gbp.getPreset().getParametres();

	for(var i=0; i<listeParams.length; i++){
		// Ajouter le graphique dans le conteneur
		$(listeParams[i].getGParametre().getGraphique()).appendTo(conteneurParametres);
	}

	// Valider le Knob
	$(".knob").knob(/* TODO parametres et evenements */);

});

// --- Fonction ajouterPreset
// --- Description : Ajouter un preset a la liste des presets existants
//
function ajouterPreset(type){

	// Initialiser le nom de la fonction a appeler
	var nomFonctionCreationPreset = "creerGBasePreset";

	// Verifier si la fonction associe a la creation existe
	if (typeof window[nomFonctionCreationPreset + type] == 'function')
		nomFonctionCreationPreset = nomFonctionCreationPreset + type;

	// Indiquer console
	console.log("Appel de la fonction " + nomFonctionCreationPreset);
	
	// Appeler la fonction de creation du preset et son graphique
	window[nomFonctionCreationPreset](type);

}

// --- Fonction creerGBasePreset
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePreset(type){

	// Creer le preset
	var preset = new Preset(type);

	// Creer une div d'affichage
	var divPreset = $("<div></div>").attr('class','divPreset');

	// Creer le graphique du preset selon le type
	var gPreset;

	switch(type){

		//divPreset.get()[0] == l'element div du DOM

		// --- S'il s'agit d'un preset de debut
		case nomPDeb :
			gPreset = new GPresetDebut(divPreset.get()[0], preset);
			break;

		// --- S'il s'agit d'un preset de fin
		case nomPFin :
			gPreset = new GPresetFin(divPreset.get()[0], preset);
			break;

		// --- S'il s'agit d'un preset quelconque
		default :
			gPreset = new GPreset(divPreset.get()[0], preset);

	}

	// Faire le lien entre le Preset et le GBasePreset respectif (pour la navigation)
	gPreset.setAncre();

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

		// --- S'il s'agit d'un preset normal
		default :

			// Ajouter le css normal
			divPreset.addClass('divPresetNormal');

	}

	// Construire l'image de la div
	var infoImg = constructImgPreset(type, divPreset, 
		function() {

			// --- jsPlumb ---
			// ---------------
			jspInstance.ready(function() {

				// Rendre le graphique draggable uniquement dans le conteneur
				jspInstance.draggable($(".divPreset"), {
				  containment:conteneurPresets
				});

				// Ajouter les endpoints
				//ajouterEndPoints(gPreset);

			});
			// --- /jsPlumb ---
			// ----------------

			// Ajouter les endpoints au gPreset
			ajouterEndPoints(gPreset);
		}
	);

	// Ajouter la div dans l'affichage
	divPreset.appendTo(conteneurPresets);
	
	// --- jsPlumb ---
	// ---------------
	
	// jspInstance.ready(function() {

	// 	// Rendre le graphique draggable uniquement dans le conteneur
	// 	jspInstance.draggable($(".divPreset"), {
	// 	  containment:conteneurPresets
	// 	});

	// 	// Ajouter les endpoints
	// 	//ajouterEndPoints(gPreset);

	// });

	// --- /jsPlumb ---
	// ----------------

	// Ajouter le preset a la liste
	gPresets.push(gPreset);

	// Renseigner le preset courant
	if(type != nomPDeb || type != nomPFin)
		gPresetCourant = gPreset;

	// Indiquer l'ajout du preset
	console.log("Preset " + type + " cree");

	// Retourner le gPreset cree
	return gPreset;

}

// --- Fonction creerGBasePresetGain
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetGain(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 1, 0.01);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Pan'
	var param2 = new ParametrePan();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param2);

}

// --- Activer les elements 
//$(function($) {

	//window['nomFonction']();
	//if (typeof nomFonction == 'function')

  // Activer l'element Knob
  //$(".knob").knob(/* TODO parametres et evenements */

  	/*{
  		release : function (value) {
			console.log("change : " + value);
    	}

  	}*/
  //)
  
//});

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
