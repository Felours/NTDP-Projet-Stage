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
			   valInit - la valeur initiale
			   steps - valeur de saut lors d'un changement  */
function ParametreGain(minVal, maxVal, valInit, steps){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Gain");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(minVal, maxVal, valInit, steps);

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
	var g = new GParametreKnob(-1, 1, 0, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametrePan.prototype = new Parametre();
ParametrePan.prototype.traiterAudio = traiterAudioPan;

/* Class ParametreTone */
/* Description : Class representant un parametre Tone d'un preset */
function ParametreTone(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Tone");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(100, 10000, 1000, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreTone.prototype = new Parametre();
ParametreTone.prototype.traiterAudio = traiterAudioTone;

/* Class ParametreVolume */
/* Description : Class representant un parametre Volume d'un preset */
/* Argument : valInit - la valeur initiale */
function ParametreVolume(valInit){

	// Heritage
	Parametre.call(this);

	// Verifier si l'argument est correct
	if(typeof(valInit) === 'undefined')
		valInit = 1;

	// Indiquer le nom du parametre
	this.setNom("Volume");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 1, valInit, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreVolume.prototype = new Parametre();
ParametreVolume.prototype.traiterAudio = traiterAudioVolume;

/* Class ParametreType */
/* Description : Class representant un parametre Type d'un preset */
/* Argument : tab - tableu contenant les elements de la liste */
function ParametreType(tab){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Type");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreListe(tab);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreType.prototype = new Parametre();
ParametreType.prototype.traiterAudio = traiterAudioType;

/* Class ParametreMix */
/* Description : Class representant un parametre Mix d'un preset */
function ParametreMix(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Mix");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 100, 20, 0.1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreMix.prototype = new Parametre();
ParametreMix.prototype.traiterAudio = traiterAudioMix;

/* Class ParametreRoom */
/* Description : Class representant un parametre Room d'un preset */
function ParametreRoom(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Room");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 100, 0, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreRoom.prototype = new Parametre();
ParametreRoom.prototype.traiterAudio = traiterAudioRoom;

/* Class ParametreFeedBack */
/* Description : Class representant un parametre FeedBack d'un preset */
function ParametreFeedBack(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("FeedBack");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 100, 60, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreFeedBack.prototype = new Parametre();
ParametreFeedBack.prototype.traiterAudio = traiterAudioFeedBack;

/* Class ParametreTime */
/* Description : Class representant un parametre Time d'un preset */
function ParametreTime(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Time");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(1, 1000, 190, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreTime.prototype = new Parametre();
ParametreTime.prototype.traiterAudio = traiterAudioTime;

/* Class ParametreDrive */
/* Description : Class representant un parametre Drive d'un preset */
function ParametreDrive(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Drive");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 3, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreTime.prototype = new Parametre();
ParametreTime.prototype.traiterAudio = traiterAudioDrive;

/* Class ParametreBass */
/* Description : Class representant un parametre Bass d'un preset */
function ParametreBass(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Bass");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 5, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreBass.prototype = new Parametre();
ParametreBass.prototype.traiterAudio = traiterAudioBass;

/* Class ParametreMid */
/* Description : Class representant un parametre Mid d'un preset */
function ParametreMid(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Mid");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 5, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreMid.prototype = new Parametre();
ParametreMid.prototype.traiterAudio = traiterAudioMid;

/* Class ParametreTreb */
/* Description : Class representant un parametre Treb d'un preset */
function ParametreTreb(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Treb");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 5, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreTreb.prototype = new Parametre();
ParametreTreb.prototype.traiterAudio = traiterAudioTreb;

/* Class ParametrePresence */
/* Description : Class representant un parametre Presence d'un preset */
function ParametrePresence(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Presence");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 5, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametrePresence.prototype = new Parametre();
ParametrePresence.prototype.traiterAudio = traiterAudioPresence;

/* Class ParametreBoost */
/* Description : Class representant un parametre Boost d'un preset */
/* Argument : valInit - la valeur initiale */
function ParametreBoost(valInit){

	// Heritage
	Parametre.call(this);

	// Verifier si l'argument est correct
	if(typeof(valInit) === 'undefined')
		valInit = false;

	// Indiquer le nom du parametre
	this.setNom("Boost");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreSwitch(valInit);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreBoost.prototype = new Parametre();
ParametreBoost.prototype.traiterAudio = traiterAudioBoost;

/* Class ParametreMaster */
/* Description : Class representant un parametre Presence d'un preset */
function ParametreMaster(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Master");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 8, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreMaster.prototype = new Parametre();
ParametreMaster.prototype.traiterAudio = traiterAudioMaster;

/* Class ParametreFrequency */
/* Description : Class representant un parametre Frequency d'un preset */
/* Argument : valInit - valeur initiale */
function ParametreFrequency(valInit){

	// Heritage
	Parametre.call(this);

	// Verifier si l'argument est correct
	if(typeof(valInit) === 'undefined')
		valInit = 500;

	// Indiquer le nom du parametre
	this.setNom("Frequency");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(20, 20000, valInit, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreFrequency.prototype = new Parametre();
ParametreFrequency.prototype.traiterAudio = traiterAudioFrequency;

/* Class ParametreQ */
/* Description : Class representant un parametre Q d'un preset */
function ParametreQ(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Q");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 30, 1, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreQ.prototype = new Parametre();
ParametreQ.prototype.traiterAudio = traiterAudioQ;

/* Class ParametreRelease */
/* Description : Class representant un parametre Release d'un preset */
function ParametreRelease(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Release");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 1, 0.25, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreRelease.prototype = new Parametre();
ParametreRelease.prototype.traiterAudio = traiterAudioRelease;

/* Class ParametreThreshold */
/* Description : Class representant un parametre Threshold d'un preset */
function ParametreThreshold(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Threshold");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(-90, -10, -22, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreThreshold.prototype = new Parametre();
ParametreThreshold.prototype.traiterAudio = traiterAudioThreshold;

/* Class ParametreResonance */
/* Description : Class representant un parametre Resonance d'un preset */
function ParametreResonance(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Resonance");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(2, 7, 4, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreResonance.prototype = new Parametre();
ParametreResonance.prototype.traiterAudio = traiterAudioResonance;

/* Class ParametreNum */
/* Description : Class representant un parametre dont le nom est un nombre d'un preset */
function ParametreNum(nom){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom(nom);

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(-40, 40, 0, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreNum.prototype = new Parametre();
ParametreNum.prototype.traiterAudio = traiterAudioNum;

/* Class ParametrePitch */
/* Description : Class representant un parametre dont le nom est un nombre d'un preset */
function ParametrePitch(){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Pitch");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 100, 0, 1);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametrePitch.prototype = new Parametre();
ParametrePitch.prototype.traiterAudio = traiterAudioPitch;

/* Class ParametreMode */
/* Description : Class representant un parametre Mode d'un preset */
/* Argument : tab - tableu contenant les elements de la liste */
function ParametreMode(tab){

	// Heritage
	Parametre.call(this);

	// Indiquer le nom du parametre
	this.setNom("Mode");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreListe(tab);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreMode.prototype = new Parametre();
ParametreMode.prototype.traiterAudio = traiterAudioMode;

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

// --- Methode traiterAudioTone
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioTone(flux) {
	/* TODO */
}

// --- Methode traiterAudioVolume
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioVolume(flux) {
	/* TODO */
}

// --- Methode traiterAudioType
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioType(flux) {
	/* TODO */
}

// --- Methode traiterAudioMix
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioMix(flux) {
	/* TODO */
}

// --- Methode traiterAudioRoom
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioRoom(flux) {
	/* TODO */
}

// --- Methode traiterAudioFeedBack
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioFeedBack(flux) {
	/* TODO */
}

// --- Methode traiterAudioTime
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioTime(flux) {
	/* TODO */
}

// --- Methode traiterAudioDrive
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioDrive(flux) {
	/* TODO */
}

// --- Methode traiterAudioBass
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioBass(flux) {
	/* TODO */
}

// --- Methode traiterAudioMid
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioMid(flux) {
	/* TODO */
}

// --- Methode traiterAudioTreb
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioTreb(flux) {
	/* TODO */
}

// --- Methode traiterAudioPresence
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioPresence(flux) {
	/* TODO */
}

// --- Methode traiterAudioBoost
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioBoost(flux) {
	/* TODO */
}

// --- Methode traiterAudioMaster
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioMaster(flux) {
	/* TODO */
}

// --- Methode traiterAudioFrequency
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioFrequency(flux) {
	/* TODO */
}

// --- Methode traiterAudioQ
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioQ(flux) {
	/* TODO */
}

// --- Methode traiterAudioRelease
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioRelease(flux) {
	/* TODO */
}

// --- Methode traiterAudioThreshold
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioThreshold(flux) {
	/* TODO */
}

// --- Methode traiterAudioResonance
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioResonance(flux) {
	/* TODO */
}

// --- Methode traiterAudioNum
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioNum(flux) {
	/* TODO */
}

// --- Methode traiterAudioPitch
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioPitch(flux) {
	/* TODO */
}

// --- Methode traiterAudioMode
// --- Description : Methode permettant de recuperer un flux, d'appliquer le parametrage et de le rendre
// 
function traiterAudioMode(flux) {
	/* TODO */
}

/* Classes filles de la classe GParametre */
/* ====================================== */

/* Class GParametreKnob */
/* Description : Class representant le graphique issu du plugin Knob */
/* Arguments : valMin - valeur minimal de l'intervalle
			   valMax - valeur maximale de l'intervalle 
			   valInit - la valeur initiale
			   step - valeur de saut lors d'un changement */
function GParametreKnob(valMin, valMax, valInit, step){

	// Appeler la classe mere (heritage)
	GParametre.call(this);

	// Creer un element Knob
	var graphique = $("<input class='knob' data-angleOffset=-125 data-angleArc=250 data-rotation=clockwise data-linecap=round>");

	// Indiquer les valeurs parametres de l'element
	graphique.attr("data-min", valMin);
	graphique.attr("data-max", valMax);
	graphique.attr("data-step", step);
	graphique.attr("value", valInit);

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


/* Class GParametreListe */
/* Description : Class representant le graphique d'une liste*/
/* Arguments : tab - tableau contenant la liste des valeurs*/
function GParametreListe(tab){

	// Appeler la classe mere (heritage)
	GParametre.call(this);

	// Creer un element select (list)
	var graphique = $("<select class='parametreList'></select>");

	// Entrer les valeurs du tableau donne
	for(var i=0; i<tab.length; i++){
		// Ajouter la valeur dans le graphique
		$("<option>" + tab[i] +"</option>").appendTo(graphique);
		// Ajouter la valeur dans l'objet GParametreListe
		this.ajouteValeur(tab[i]);
	}

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Liste";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique.get()[0]);

}
GParametreListe.prototype = new GParametre();
GParametreListe.prototype.getValeurTraite = getValeurTraiteListe;

/* Class GParametreSwitch */
/* Description : Class representant le graphique d'un switch */
/* Argument : valInit - la valeur initiale */
function GParametreSwitch(valInit){

	// Appeler la classe mere (heritage)
	GParametre.call(this);

	// Verifier si l'argument est correct
	if(typeof(valInit) === 'undefined')
		valInit = false;

	// Creer un element switch
	var graphique = $("<div class='switch'></div>");	// Conteneur
	var input = $("<input id='cmn-toggle-4' class='cmn-toggle cmn-toggle-round-flat' type='checkbox'>").attr("checked", valInit); // Element input
	var label = $("<label for='cmn-toggle-4'></label>");	// Element label (text)

	// Ajouterles elements au conteneur
	input.appendTo(graphique);
	label.appendTo(graphique);

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Switch";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique.get()[0]);
	this.ajouteValeur(true);
	this.ajouteValeur(false);
	this.ajouteValeur(valInit);

}
GParametreSwitch.prototype = new GParametre();
GParametreSwitch.prototype.getValeurTraite = getValeurTraiteSwitch;
// --- Surcharge methode ajouteValeur
// 
GParametreSwitch.prototype.ajouteValeur = function(valeur){

	// Ajouter la valeur dans la liste de l'objet GParametre
	m_valeurs.push(valeur);

	// Ajouter la valeur dans le graphique
	/* TODO */
};
// --- Surcharge methode retirerValeur
// 
GParametreSwitch.prototype.retirerValeur = function(valeur){

	// Trouver l'indice de la valeur
	var index = m_valeurs.indexOf(valeur);

	// Si trouve, retirer de la liste
	if (index > -1) {
		m_valeurs.splice(index, 1);
	}

	// Retirer la valeur dans le graphique
	/* TODO */
};

/* Methodes a ajouter aux classes GParametre */
/* ========================================= */

// --- Methode getValeurTraiteKnob
// 
function getValeurTraiteKnob() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).val();

	// Renvoyer la valeur
	return val;
}

// --- Methode getValeurTraiteListe
// 
function getValeurTraiteListe() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).val();

	// Renvoyer la valeur
	return val;
}

// --- Methode getValeurTraiteSwitch
// 
function getValeurTraiteSwitch() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).children('#cmn-toggle-4').val();

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

	/* Style connexion */
	/* =============== */
	var overlayStyle = [ "Arrow", { foldback:0, location:0.5, width:25 } ]; // Le style "fleche"

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

    // Ajouter le style fleche pour la connexion
    if(typeof(overlayStyle) !== 'undefined')
    	jspInstance.select(connInfo).addOverlay(overlayStyle);

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

	// Recuperer les parametres du GBasePreset
	var listeParams = gbp.getPreset().getParametres();

	// --- Construction de l'affichage de chacun des parametres du preset --- //
	// ---------------------------------------------------------------------- //
	var gParametreInfos, nomParametreInfo, gParametreInfo;
	for(var i=0; i<listeParams.length; i++){

		// Creer un conteneur assemblant les elements du parametre
		gParametreInfos = $("<div class='gParametreInfos'></div>");

		// Recuperer le nom du parametre
		nomParametreInfo = listeParams[i].getNom();

		// Recuperer le graphique du parametre
		gParametreInfo = listeParams[i].getGParametre().getGraphique();

		// Ajouter le nom du parametre dans les informations affichees
		$("<div class='nomParametreInfo centerText'>" + nomParametreInfo + "</div>").appendTo(gParametreInfos);

		// Ajouter le graphique du parametre dans les informations affichees
		$(gParametreInfo).appendTo(gParametreInfos);

		// Ajouter le parametre dans le conteneur
		$(gParametreInfos).appendTo(conteneurParametres);
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
	var param = new ParametreGain(0, 1, 1, 0.01);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Pan'
	param = new ParametrePan();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetReverb
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetReverb(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Mix'
	var param = new ParametreMix();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(0.8);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetCabinet
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetCabinet(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Room'
	var param = new ParametreRoom();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetOverdrive
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetOverdrive(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 10, 5, 0.01);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Tone'
	param = new ParametreTone();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['Vintage', 'Modern'];
	param = new ParametreType(vals);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetDelay
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetDelay(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'FeedBack'
	var param = new ParametreFeedBack();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mix'
	param = new ParametreMix();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Time'
	param = new ParametreTime();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetAmp
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetAmp(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Drive'
	var param = new ParametreDrive();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Bass'
	param = new ParametreBass();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mid'
	param = new ParametreMid();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Treb'
	param = new ParametreTreb();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Presence'
	param = new ParametrePresence();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Boost'
	param = new ParametreBoost(true);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Master'
	param = new ParametreMaster();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['Brit Man', 'German Modern', 'Clean US', 'Class A'];
	param = new ParametreType(vals);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetFilter
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetFilter(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Frequency'
	var param = new ParametreFrequency(500);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Q'
	param = new ParametreQ();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['LOWPASS', 'HIGHPASS', 'BANDPASS', 'LOWSHELF', 'HIGHSHELF', 'PEAKING', 'NOTCH', 'ALLPASS'];
	param = new ParametreType(vals);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetGate
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetGate(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Release'
	var param = new ParametreRelease();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Threshold'
	param = new ParametreThreshold();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetWah
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetWah(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Frequency'
	var param = new ParametreFrequency(600);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Resonance'
	param = new ParametreResonance();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetGraphicEQ
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetGraphicEQ(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre '63'
	var param = new ParametreNum('63');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '125'
	var param = new ParametreNum('125');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '250'
	var param = new ParametreNum('250');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '500'
	var param = new ParametreNum('500');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '1K'
	var param = new ParametreNum('1K');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '2K'
	var param = new ParametreNum('2K');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '4K'
	var param = new ParametreNum('4K');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '8K'
	var param = new ParametreNum('8K');

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetPitch
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetPitch(type){

	// Creer la structure de base du gBasePreset
	var gbp = creerGBasePreset(type);

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 1, 1, 0.01);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Pitch'
	var param = new ParametrePitch();

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mode'
	var vals = ['Octave UP', 'Octave Down'];
	param = new ParametreMode(vals);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	vals = ['Whammy'];
	param = new ParametreType(vals);

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

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
