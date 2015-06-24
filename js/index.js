/* Fichier index.js */
/* Projet MT5 presets */
/* Auteur : Nouriel AZRIA */
/* Description : Fichier js de creation et gestion des presets et de l'affichage de ceux la */

/* ---------------------------------------------------------------------------------------- */


/* Classe Serialize */
/* ================ */

/* Description : Class a implementer aux classes meres dont les informations doivent etre sauvegardees et restaurees */
// --- Argument : nomClass - nom de la classe implementant Serialize. Doit etre renseigne au constructeur
//
function Serialize(nomClass){
  
  this.m_nomClass = nomClass;
  
  // --- Methode getNomClass
	// 
	this.getNomClass = function(){
		return(this.m_nomClass);
	};
	
	// --- Methode setNomClass
	// 
	this.setNomClass = function(nomClass){
		this.m_nomClass = nomClass;
	};
  
    //this.restaurerObjetsInternes = restaurerClasses;
}
Serialize.prototype.restaurerObjetsInternes = restaurerClasses;

// --- Fonction restaurerClasses
// --- Description : recreer les objets internes de l'objet traite en tant qu'instance de classe dont ils sont definies
// --- Argument : instance - argument optionel contenant un objet non encore recree
//
function restaurerClasses(insta){
  
  // Verifier si l'argument existe
  if(typeof(insta) === 'undefined')
    insta = this;
  
  // Verifier si l'argument est un tableau
  if(Array.isArray(insta)){
    
    // Passer chaque objet au niveau suivant
    for(var i=0; i<insta.length; i++)
      restaurerClasses(insta[i]);
    
  }
  // Si c'est un objet quelconque
  else{
    
    // Verifier si l'objet contient m_nomClass (si oui, il s'agit d'un objet issu de classe personnelle)
    var nomClass = insta.m_nomClass;

    if(typeof(nomClass) !== 'undefined'){
      
      // Indiquer a l'objet sa classe
      insta.__proto__ = Object.create(new window[nomClass]());
      
      // Passer les attributs de l'objet (en cas de composition)
      Object.keys(insta).forEach(function (key) {
        insta.restaurerObjetsInternes(insta[key]);
      });
      
    }
    
  }
}


/* Classes GBasePreset */
/* =================== */


/* Class Preset */
/* Description : Class representant les informations d'un preset */
/* Arguments : type - le nom d'un preset */
function Preset(type){

	// Implementer Serialize
	Serialize.call(this,"Preset");

	// --- Attributs
	// 
	this.m_type = type;	// Type de preset (nom)
	this.m_actif = true;	// Preset actif ou non
	this.m_parametres = []; // Liste des parametres du preset
	var m_ancre;		// Lien vers le GBasePreset

	// --- Methodes
	// 
	
	// --- Methode getType
	// 
	this.getType = function(){
		return(this.m_type);
	};
	
	// --- Methode setType
	// 
	this.setType = function(type){
		this.m_type = type;
	};

	// --- Methode getActivation
	// 
	this.getActivation = function(){
		return(this.m_actif);
	};

	// --- Methode getParametres
	// 
	this.getParametres = function(){
		return(this.m_parametres);
	};

	// --- Methode changerActivation
	// 
	this.changerActivation = function(){

		if(this.m_actif)
			this.m_actif = false;
		else
			this.m_actif = true;

	};

	// --- Methode ajouterParametre
	// 
	this.ajouterParametre = function(parametre){
		this.m_parametres.push(parametre);
	};

	// --- Methode retirerParametre
	// 
	this.retirerParametre = function(parametre){

		// Trouver l'indice du parametre
		var index = this.m_parametres.indexOf(parametre);
	
		// Si trouve, retirer de la liste
		if (index > -1) {
    		this.m_parametres.splice(index, 1);
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
Preset.prototype = new Serialize();

/* Class GBasePreset */
/* Description : Class representant le graphique d'un preset */
/* Arguments : div - la div qui represente de maniere graphique le preset 
			   preset - instance de la classe Preset descrivant le preset */
function GBasePreset(div, preset) {

	// Implementer Serialize
	Serialize.call(this,"GBasePreset");

	// --- Attributs
	// 
	this.m_id = undefined;	// L'id representant le gBasePreset
	var m_div = div;	// Le graphique (element div)
	this.m_preset = preset;
	this.m_position = new Position(0,0); // La position du graphique
	//setAncre(m_preset);	// Faire le lien entre le preset et le GBP

	//var m_dimension = new Dimension(10, 10); // Les dimensions du div
	//var m_img

	// --- Methodes
	// 
	
	// --- Methode getId
	// 
	this.getId = function(){
		return(this.m_id);
	};

	// --- Methode setId
	// 
	this.setId = function(id){
		this.m_id = id;
	};

	// --- Methode getPreset
	// 
	this.getPreset = function(){
		return(this.m_preset);
	};

	// --- Methode getDiv
	// 
	this.getDiv = function(){
		return(m_div);
	};

	// --- Methode setDiv
	// 
	this.setDiv = function(div){
		m_div = div;
	};

	// --- Fonction setAncre
	// Description : Permet de faire un lien entre le GBP et le preset (pour naviguer)
	// 
	this.setAncre = function(){

		// Indiquer dans l'instance du preset le lien vers le GBasePreset
		this.m_preset.setAncre(this);

	};

	// --- Methode getPosition
	// 
	this.getPosition = function(){
		return(this.m_position);
	};

	// --- Methode setPosition
	// 
	this.setPosition = function(x, y){
		this.m_position.setPosition(x, y);
	};

}
GBasePreset.prototype = new Serialize();

/* Class GPreset */
/* Description : Class representant le graphique d'un preset reel */
/* Arguments : div - la div qui represente de maniere graphique le preset 
			   preset - instance de la classe Preset descrivant le preset */
function GPreset(div, preset) {

	// Heritage
	GBasePreset.call(this, div, preset);
	this.setNomClass("GPreset");

	// --- Attributs
	// 
	this.m_predecesseur = []; // Les GBasePreset (ou filles) qui precedent
	this.m_successeur = []; // Les GBasePreset (ou filles) qui suivent

	// --- Methodes
	// 
	
	// --- Methode getPredecesseurs
	// 
	this.getPredecesseurs = function(){
		return(this.m_predecesseur);
	};

	// --- Methode getSuccesseurs
	// 
	this.getSuccesseurs = function(){
		return(this.m_successeur);
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
	this.setNomClass("GPresetDebut");

	// --- Attributs
	// 
	this.m_successeur = []; // Les GBasePreset (ou filles) qui suivent

	// --- Methodes
	// 

	// --- Methode getSuccesseurs
	// 
	this.getSuccesseurs = function(){
		return(this.m_successeur);
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
	this.setNomClass("GPresetFin");

	// --- Attributs
	// 
	this.m_predecesseur = []; // Les GBasePreset (ou filles) qui precedent

	// --- Methodes
	// 
	
	// --- Methode getPredecesseurs
	// 
	this.getPredecesseurs = function(){
		return(this.m_predecesseur);
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

/* Class Position */
/* Description : Class representant la position d'un element */
/* Arguments : x - la position horizontale
			   y - la position verticale */
function Position(x, y){

	// Implementer Serialize
	Serialize.call(this,"Position");

	// --- Attributs
	// 
	this.m_x = x;
	this.m_y = y;

	// --- Methodes
	// 

	// --- Methode getX
	// 
	this.getX = function(){
		return(this.m_x);
	};

	// --- Methode getY
	// 
	this.getY = function(){
		return(this.m_y);
	};

	// --- Methode setX
	// 
	this.setX = function(x){
		this.m_x = x;
	};

	// --- Methode setY
	// 
	this.setY = function(y){
		this.m_y = y;
	};

	// --- Methode setDimension
	// 
	this.setPosition = function(x, y){
		this.m_x = x;
		this.m_y = y;
	};
}
Position.prototype = new Serialize();


/* Classes liees aux Parametre */
/* =========================== */

/* Class Parametre */
/* Description : Class representant un parametre d'un preset (ne sera utilisee que par ses classes filles) */
/* Arguments : nom - le nom du parametre
			   m_gParametre - la classe contenant le graphique du parametre */
function Parametre(nom, gParametre){

	// Implementer Serialize
	Serialize.call(this,"Parametre");

	// --- Attributs
	// 
	this.m_nom = nom;	// Le nom du parametre
	this.m_gParametre = gParametre; // Instance de la classe contenant le graphique representant le parametre

	// --- Methodes
	// 
	
	// --- Methode getNom
	// 
	this.getNom = function(){
		return(this.m_nom);
	};
	
	// --- Methode setNom
	// 
	this.setNom = function(nom){
		this.m_nom = nom;
	};

	// --- Methode getGParametre
	// 
	this.getGParametre = function(){
		return(this.m_gParametre);
	};
	
	// --- Methode setGParametre
	// 
	this.setGParametre = function(gp){
		this.m_gParametre = gp;
	};
	
	// --- Methode modifierGPId
	// Description : Change l'id du graphique du parametre
	// 
	this.modifierGPId = function(id){
		if(this.m_gParametre !== undefined)
			this.m_gParametre.setId(id);
	};

}
Parametre.prototype = new Serialize();

/* Class GParametre */
/* Description : Class representant le graphique d'un parametre (ne sera utilisee que par ses classes filles) */
/* Arguments : graphique - l'element graphique (DOM, pedalboard, autre..)
			   typeValeurs - le type de valeurs du graphique (interval, liste, autre..) */
function GParametre(graphique, typeValeurs){

	// Implementer Serialize
	Serialize.call(this,"GParametre");

	// --- Attributs
	// 
	this.m_graphique = graphique;	// Description HTML du graphique (chaine de caractere qui sera generee)
	this.m_typeValeurs = typeValeurs; // Une chaine de caracteres indiquant le type de valeurs
	this.m_id = undefined;	// L'id du graphique (pour connaitre le graphique declanchant les evenements)
	this.m_valeurs = []; // Tableau associatif (chaque instance du tableau contient 2 valeurs, [0] pour la clef --> [1] pour la valeur) contenant les valeurs (en correlation avec le type de valeur)

	// --- Methodes
	// 
	
	// --- Methode getGraphique (methode a surcharger pour retourner un element graphique genere de m_graphique)
	// 
	this.getGraphique = function(){
		return(this.m_graphique);
	};
	
	// --- Methode setGraphique
	// 
	this.setGraphique = function(g){
		this.m_graphique = g;
	};

	// --- Methode getTypeValeurs
	// 
	this.getTypeValeurs = function(){
		return(this.m_typeValeurs);
	};
	
	// --- Methode setTypeValeurs
	// 
	this.setTypeValeurs = function(tv){
		this.m_typeValeurs = tv;
	};

	// --- Methode getId
	// 
	this.getId = function(){
		return(this.m_id);
	};
	
	// --- Methode setId
	// 
	this.setId = function(id){
		this.m_id = id;
	};

	// --- Methode getValeurs
	// 
	this.getValeurs = function(){
		return(this.m_valeurs);
	};

	// --- Methode ajouteValeur
	// 
	this.ajouteValeur = function(clef, valeur){

		// Ajouter l'association ([0] pour la clef, [1] pour la valeur)
		this.m_valeurs.push([clef,valeur]);
		//this.m_valeurs[clef] = valeur;
	};

	// --- Methode retirerValeur
	// 
	this.retirerValeur = function(clef, valeur){

		// Chercher la clef
		var cle, val;
		for(var i=0; i<this.m_valeurs.length; i++){

			// Recuperer la cle
			cle = this.m_valeurs[i][0];

			// Verifier si la cle correspond
			if(cle === clef){

				// Verifier si on a enseigne la valeur en parametre
				if(valeur !== undefined){

					// Recuperer la valeur
					val = this.m_valeurs[i][1];

					// Verifier si la valeur correspond
					if(val === valeur)
						// Supprimer l'association
						this.m_valeurs.splice(i, 1);

				}
				else
					// Supprimer l'association
					this.m_valeurs.splice(i, 1);

			}

		}


		// for(var ob in tab)
		// Supprimer la clef (puisque tableau associatif)
		//delete this.m_valeurs[clef];
	};

}
GParametre.prototype = new Serialize();

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
	this.setNomClass("ParametreGain");

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
	this.setNomClass("ParametrePan");

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
	this.setNomClass("ParametreTone");

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
	this.setNomClass("ParametreVolume");

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
	this.setNomClass("ParametreType");

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
	this.setNomClass("ParametreMix");

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
	this.setNomClass("ParametreRoom");

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
	this.setNomClass("ParametreFeedBack");

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
	this.setNomClass("ParametreTime");

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
	this.setNomClass("ParametreDrive");

	// Indiquer le nom du parametre
	this.setNom("Drive");

	// Creer le graphique associe (Instance fille de la classe GParametre)
	var g = new GParametreKnob(0, 10, 3, 0.01);

	// Indiquer le graphique du parametre
	this.setGParametre(g);

}
ParametreDrive.prototype = new Parametre();
ParametreDrive.prototype.traiterAudio = traiterAudioDrive;

/* Class ParametreBass */
/* Description : Class representant un parametre Bass d'un preset */
function ParametreBass(){

	// Heritage
	Parametre.call(this);
	this.setNomClass("ParametreBass");

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
	this.setNomClass("ParametreMid");

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
	this.setNomClass("ParametreTreb");

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
	this.setNomClass("ParametrePresence");

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
	this.setNomClass("ParametreBoost");

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
	this.setNomClass("ParametreMaster");

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
	this.setNomClass("ParametreFrequency");

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
	this.setNomClass("ParametreQ");

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
	this.setNomClass("ParametreRelease");

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
	this.setNomClass("ParametreThreshold");

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
	this.setNomClass("ParametreResonance");

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
	this.setNomClass("ParametreNum");

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
	this.setNomClass("ParametrePitch");

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
	this.setNomClass("ParametreMode");

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
	this.setNomClass("GParametreKnob");

	// Creer un element Knob
	var graphique = "<input class='knob gParametre' data-angleOffset=-125 data-angleArc=250 data-rotation=clockwise data-linecap=round>";

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Intervalle";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique);
	this.ajouteValeur("data-min", valMin);
	this.ajouteValeur("data-max", valMax);
	this.ajouteValeur("data-step", step);
	this.ajouteValeur("value", valInit);

	this.ajouteValeur("data-height", 75);
	this.ajouteValeur("data-width", 75);

	// --- Surcharge de la methode getGraphique (pour recuperer l'element graphique)
	// 
	this.getGraphique = function(){
		
		// Recuperer la description html du graphique
		var graphique = $(this.m_graphique);

		// Renseigner l'id du graphique
		graphique.attr('id', this.getId());

		// Recuperer les valeurs du graphique
		var vals = this.getValeurs();

		// Ajouter les valeurs du graphique
		for(var i=0; i<vals.length; i++)
			graphique.attr(vals[i][0], vals[i][1]);

		// Renvoyer le graphique
		return graphique.get()[0];
	};


}
GParametreKnob.prototype = new GParametre();
GParametreKnob.prototype.getValeurTraite = getValeurTraiteKnob;
GParametreKnob.prototype.setValeurTraite = setValeurTraiteKnob;

/* Class GParametreListe */
/* Description : Class representant le graphique d'une liste*/
/* Arguments : tab - tableau contenant la liste des valeurs*/
function GParametreListe(tab){

	// Appeler la classe mere (heritage)
	GParametre.call(this);
	this.setNomClass("GParametreListe");

	// Creer un element select (list)
	var graphique = "<select class='parametreList gParametre'></select>";

	// Entrer les valeurs du tableau donne
	if(tab !== undefined){
		for(var i=0; i<tab.length; i++){

			// Indiquer que le 1er de la liste est selectionnee
			if(i === 0)
				this.ajouteValeur("selected", tab[i]);

			// Ajouter la valeur dans l'objet GParametreListe
			this.ajouteValeur("option", tab[i]);
		}
	}

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Liste";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique);

	// --- Surcharge de la methode getGraphique (pour recuperer l'element graphique)
	// 
	this.getGraphique = function(){
		
		// Recuperer la description html du graphique
		var graphique = $(this.m_graphique);

		// Renseigner l'id du graphique
		graphique.attr('id', this.getId());
		
		// Recuperer les valeurs du graphique
		var vals = this.getValeurs();

		// Trouver l'option selected
		var selected;
		for(var j=0; j<vals.length; j++)
			if(vals[j][0] == "selected")
				selected = vals[j][1];

		// Ajouter les valeurs du graphique
		for(var i=0; i<vals.length; i++){

			// Ajouter les parametres (si c'est le cas de la valeur actuelle)
			if(vals[i][0] === "option")
				// Si l'option doit etre selectionnee
				if(vals[i][1] == selected && selected !== undefined)
					$("<option>" + vals[i][1] +"</option>").attr("selected", "selected").appendTo(graphique);
				else
					$("<option>" + vals[i][1] +"</option>").appendTo(graphique);
			else
				// Ajouter les autres attributs
				if(vals[i][0] != "selected")
					graphique.attr(vals[i][0], vals[i][1]);
		}

		// Renvoyer le graphique
		return graphique.get()[0];
	};

}
GParametreListe.prototype = new GParametre();
GParametreListe.prototype.getValeurTraite = getValeurTraiteListe;
GParametreListe.prototype.setValeurTraite = setValeurTraiteListe;

/* Class GParametreSwitch */
/* Description : Class representant le graphique d'un switch */
/* Argument : valInit - la valeur initiale */
function GParametreSwitch(valInit){

	// Appeler la classe mere (heritage)
	GParametre.call(this);
	this.setNomClass("GParametreSwitch");

	// Verifier si l'argument est correct
	if(typeof(valInit) === 'undefined')
		valInit = false;

	// Creer un element switch
	var graphique = "<div class='switch'> <input class='cmn-toggle cmn-toggle-round-flat gParametre' type='checkbox'> <label></label> </div>";

	// Indiquer que le type de valeurs est un interval
	var typeValeurs = "Switch";

	// Ajouter les parametres a l'instance (par heritage)
	this.setTypeValeurs(typeValeurs);
	this.setGraphique(graphique);
	this.ajouteValeur("checked", valInit);

	// --- Surcharge de la methode getGraphique (pour recuperer l'element graphique)
	// 
	this.getGraphique = function(){
		
		// Recuperer la description html du graphique
		var graphique = $(this.m_graphique);

		// Renseigner l'id du graphique
		graphique.find('input').attr('id', this.getId());
		graphique.find('label').attr('for', this.getId());
		
		// Recuperer les valeurs du graphique
		var vals = this.getValeurs();

		// Ajouter les valeurs du graphique
		for(var i=0; i<vals.length; i++){
			graphique.find('input').attr(vals[i][0], vals[i][1]);
		}

		// Renvoyer le graphique
		return graphique.get()[0];
	};

}
GParametreSwitch.prototype = new GParametre();
GParametreSwitch.prototype.getValeurTraite = getValeurTraiteSwitch;
GParametreSwitch.prototype.setValeurTraite = setValeurTraiteSwitch;


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

// --- Methode setValeurTraiteKnob
//
function setValeurTraiteKnob(val){

	// Modifier la valeur 
	this.retirerValeur('value');
	this.ajouteValeur('value', val);
}

// --- Methode getValeurTraiteListe
// 
function getValeurTraiteListe() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).val();

	// Renvoyer la valeur
	return val;
}

// --- Methode setValeurTraiteKnob
//
function setValeurTraiteListe(val){

	// Modifier la valeur 
	this.retirerValeur('selected');
	this.ajouteValeur('selected', val);
}

// --- Methode getValeurTraiteSwitch
// 
function getValeurTraiteSwitch() {

	// Recuperer la valeur ('value') du graphique
	var val = $(this.getGraphique()).children('#cmn-toggle-4').val();

	// Renvoyer la valeur
	return val;
}

// --- Methode setValeurTraiteSwitch
//
function setValeurTraiteSwitch(val){

	// Modifier la valeur 
	this.retirerValeur('checked');
	this.ajouteValeur('checked', val);
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
		endpoint:["Dot", { radius: 8}],
		maxConnections : -1,
		isSource:false,
		isTarget:true,
		paintStyle: { fillStyle: 'green' },
		anchor : anchorEntree
	};

	var endpointSortie = {
		endpoint:["Dot", { radius: 8}],
		maxConnections : -1,
		isSource:true,
		isTarget:false,
		paintStyle: { fillStyle: 'blue' },
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

// --- Fonction getGPresetFromId()
// Description : Recupere un GBasePreset par son id
//
function getGPresetFromId(id){

	// Scanner les GPresets existants
	var GP, GPId;
	for(var i=0; i<gPresets.length; i++){
		
		// Recuperer le GPreset
		GP = gPresets[i];

		// Recuperer l'id du GPreset
		GPId = GP.getId();

		// Verifier si la div correspond
		if(GPId === id){
			return GP;
		}
	}

	// Renvoyer une erreur
	return -1;

}

// --- Fonction getGParametreFromId
// Description : Recupere un GParametre par son id issu d'un GBasePreset
// Arguments : gbp - instance d'un GBasePreset contenant le parametre
//			   id - id du GParametre
//
function getGParametreFromId(gbp, id){

	// Recuperer les parametres 
	var GPs;
	if(gbp !== undefined && id !== undefined){
		GPs = gbp.getPreset().getParametres();

		// Scanner les GParametres existants
		var GP, GPId;
		for(var i=0; i<GPs.length; i++){
			
			// Recuperer le GParametre
			GP = GPs[i].getGParametre();

			// Recuperer l'id du GParametre
			GPId = GP.getId();

			// Verifier si la div correspond
			if(GPId === id){
				return GP;
			}
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

	// Creer un preset de debut
	// 
	//ajouterPreset(nomPDeb);
	creerGBasePreset(nomPDeb);

	// Creer un preset de fin
	// 
	//ajouterPreset(nomPFin);
	creerGBasePreset(nomPFin);

}

// --- function constructImgPreset
// Description : Fonction permettant de construire l'image d'une div
// 
function constructImgPreset(nomPreset, div, gPreset, CB){

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
		if(CB !== undefined)
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
	var predecs = gbp.getPredecesseurs();	// Liste des ids
	var gbpPre;
	for(var i=0; i<predecs.length; i++){

		// Recuperer le gBasePreset par son id
		gbpPre = getGPresetFromId(predecs[i]);

		// Verifier si le GBasePreset existe
		if(gbpPre !== -1){

			// Retirer le gPreset du predecesseur
			gbpPre.retirerSuccesseur(gbp.getId());

			// Retirer le predecesseur du gPreset (optionnel, permet de laisser propre)
			gbp.retirerPredecesseur(predecs[i]);

		}

	}

	// Retirer les successeurs (mutuellement)
	var success = gbp.getSuccesseurs();	// Liste des ids
	var gbpSucc;

	for(i=0; i<success.length; i++){

		// Recuperer le gBasePreset par son id
		gbpSucc = getGPresetFromId(success[i]);

		// Verifier si le GBasePreset existe
		if(gbpSucc !== -1){

			// Retirer le gPreset du successeur
			gbpSucc.retirerPredecesseur(gbp.getId());

			// Retirer le successeur du gPreset (optionnel, permet de laisser propre)
			gbp.retirerSuccesseur(success[i]);

		}

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
	GBPtrg.retirerPredecesseur(GBPsrc.getId());

	// Retirer le target de la source
	GBPsrc.retirerSuccesseur(GBPtrg.getId());

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
// Description : Sauvegarder l'etat de stockage des presets
//
function savePresets() {
	// Sauvegarder le tableau contenant les gPresets
	localStorage.gPresets = JSON.stringify(gPresets);
}

// --- Fonction loadPresets
// Description : Restaurer l'etat de stockage des presets (version buggee)
//
function loadPresets() {

	// Verifier si le localStorage a sauvegarde les gPresets
	if(localStorage.gPresets) {

		// Effacer l'affichage courant de presets (et reinitialiser jsPlumb)
		reinitialiserAffichagePresets();

		// Recuperer du localStorage le tableau gPresets
		gPresets = JSON.parse(localStorage.gPresets);

		// Redonner au presets leur signfication (grace a la classe Serialize et sa methode)
		restaurerClasses(gPresets);

		// Reconstruire le graphique des gBasePresets
		restaurergBasePresets();

		// Reconstruire la structure jsPlumb
		restaurerJSPlumbPresets();

	}
}

// --- Fonction restaurerJSPlumbPresets
// Description : Restaure l'etat du jsPlumb d'apres la structure du tableau des gBasePresets
//
function restaurerJSPlumbPresets() {

	// Recuperer le tableau des gPresets contenant la structure de jsPlumb
	var tabGPresets = gPresets;

	// Recuperer et recreer les liens jsPlumb de chaque instance de gBasePreset
	var gbp, tabSucc, srcId;
	var endpointsSrc, endpointSrc, endpointsTarget, endpointTarget;
	for(var i=0; i<tabGPresets.length; i++){

		// Recuperer l'instance de gBasePreset
		gbp = tabGPresets[i];

		// Recuperer l'id du graphique
		srcId = gbp.getId();

		// Recuperer les endpoints du source
		endpointsSrc = jspInstance.getEndpoints(srcId);

		// Verifier quel endpoint est le point de sortie
		if(endpointsSrc[0].isSource)
			endpointSrc = endpointsSrc[0];
		else
			if(endpointsSrc[1] !== undefined)
				endpointSrc = endpointsSrc[1];

		// Verifier que le gBasePreset n'est pas le preset de fin
		if(!(gbp instanceof GPresetFin)){

			// Recuperer la liste des successeurs
			tabSucc = gbp.getSuccesseurs();
			for(var j=0; j<tabSucc.length; j++){

				// Recuperer les endpoints du target
				endpointsTarget = jspInstance.getEndpoints(tabSucc[j]);

				// Verifier quel endpoint est le point de rentree
				if(endpointsTarget[0].isTarget)
					endpointTarget = endpointsTarget[0];
				else
					if(endpointsTarget[1] !== undefined)
						endpointTarget = endpointsTarget[1];

				// Connecter les graphiques par jsPlumb
				jspInstance.connect({source:endpointSrc, target:endpointTarget, overlays: [overlayStyle]});
				//jspInstance.repaintEverything();

			}

		}

	}

	// Restaurer les evenements de jsPlumb
	jspInstance.bind("connection", jspEventConnecion);
	jspInstance.bind("click", jspEventClick);

}

// --- Fonction restaurergBasePresets
// Description : Restaure l'etat d'un gBasePreset (apres rechargement)
//
function restaurergBasePresets() {

	// Recuperer le tableau des gPresets a reconstruire
	var tabGPresets = gPresets;

	// Traiter chaque gPreset
	var gbp;
	for(var i=0; i<tabGPresets.length; i++){

		// Recuperer le gPreset courant
		gbp = tabGPresets[i];

		// Construire le graphique associe (div)
		var graphique = $("<div></div>").attr('id', gbp.getId()).attr('class','divPreset');

		// Renseigner la position du graphique
		graphique.css('top', gbp.getPosition().getY());
		graphique.css('left', gbp.getPosition().getX());

		// Ajouter le CSS selon le type
		var type = gbp.getPreset().getType();
		switch(type){

			// --- S'il s'agit d'un preset de debut
			case nomPDeb : 
				graphique.addClass('divPresetDeb');
				break;

			// --- S'il s'agit d'un preset de fin
			case nomPFin :
				graphique.addClass('divPresetFin');
				break;

			// --- S'il s'agit d'un preset normal
			default :
				// Ajouter le css normal
				graphique.addClass('divPresetNormal');

		}

		// Redonner au gBasePreset l'instance du graphique
		gbp.setDiv(graphique.get()[0]);

		// Reconstruire l'image du graphique
		constructImgPreset(type, graphique, gbp, 
			function() {

				// --- jsPlumb ---
				// ---------------
				jspInstance.ready(function() {

					// Rendre le graphique draggable uniquement dans le conteneur
					jspInstance.draggable($(".divPreset"), {
						// Le conteneur
						containment:conteneurPresets
					});

					// Ajouter les endpoints
					//ajouterEndPoints(gPreset);


				});
				// --- /jsPlumb ---
				// ----------------
				
				// Redessiner tous les elements jsPlumb (pour remettre a jour les endpoints)
				jspInstance.repaintEverything();

			}
		);

		// Ajouter les endpoints au gPreset
		ajouterEndPoints(gbp);

		// Ajouter la div dans l'affichage
		graphique.appendTo(conteneurPresets);

	}

}

// --- Fonction reinitialiserAffichagePresets
// Description : Reinitialise l'etat de jsPlumb et de l'affichage courant des presets
//
function reinitialiserAffichagePresets() {

	// Reinitialiser jsPlumb
	reinitialiserJSPlumb();

	// Reinitialiser l'affichage du conteneur des presets
	conteneurPresets.empty();

	// Reinitialiser l'affichage du conteneur des parametres
	resetConteneurParametres();

}

// --- Fonction reinitialiserJSPlumb
// Description : Reinitialise l'etat de jsPlumb
function reinitialiserJSPlumb() {

	// Reinitialiser jsPlumb
	jspInstance.reset();

}

/* Evenements globaux */
/* ------------------ */

// --- Initialisation de la page --- //
// --------------------------------- //
$(document).ready(function(){

	// --- Calculer la taille des conteneurs selon la taille de l'ecran (corriger bug de zoom)--- //
	var hauteurEcran = $(document).height();
	var largeurEcran = $(document).width();

	$("#sectionGenerale").css('height', hauteurEcran);
	$("#sectionGenerale").css('width', largeurEcran);

	// Initialiser les presets de base
	initialiserVuePresets();

	// Indiquer la procedure a suivre en cas de changement de taille de la fenetre
	$(window).resize(function(){
		
		// Correction bug zoom avant
		// Bouger les elements jsPlumb
		// var gPresetCourant;	// Instance du gPreset courant
		// var posGPresetCourant; // la position du gPreset courant
		// for(var i=0; i<gPresets.length; i++){

		// 	// Recuperer le gPreset courant
		// 	gPresetCourant = gPresets[i].getDiv();

		// 	// Recuperer la position du gPreset courant
		// 	posGPresetCourant = $(gPresetCourant).position().top;

		// 	console.log("La position de " + gPresets[i].getPreset().getType() + " est : " + screen.);

		// }


		// Repeindre tous les elements du jsPlumb
		jspInstance.repaintEverything();
	});

	// Mettre a jour la position du GPreset
	// $(".divPreset").droppable({

	// 	drop: function (event, ui) {
 //            console.log("La position : " + ui.position);  //ui.position.left and ui.position.top
 //        }

	// });

	
	// $(".divPreset").on( "mouseup", function(){
	// 	console.log("YEAH");
	// });

	// --- Evenement drop d'un gPreset
	// 
	conteneurPresets.on("mouseup", ".divPreset", function(){

		// Recuperer le div 
		var div = this;

		// Recuperer le GBasePreset
		var gbp = getGPresetFromDiv(div);

		// Recuperer la nouvelle position (relative au conteneur)
		var top = div.getBoundingClientRect().top;
		var left = div.getBoundingClientRect().left;

		// Modifier la position
		gbp.setPosition(left, top);

	});

	// --- Evenement modification des GParametre de type basiques
	// 
	conteneurParametres.delegate(".gParametreInfos .gParametre", 'change', function(){

		// Recuperer l'instance du gParametre
		var gpara = getGParametreFromId(gPresetCourant, this.id);
		
		// Verifier si la recherche de l'instance a reussi
		if(gpara !== -1){

			// Recuperer la valeur souhaitee selon le type du graphique (/* TODO */ a enrichi si besoin d'autres types) (autre solution : Verifier le type de gpara)
			var valeur;
			if(this.checked === undefined)
				valeur = this.value;
			else
				valeur = this.checked;
			
			// Renseigner la valeur
			gpara.setValeurTraite(valeur);

		}

	});

});

// --- Evenement change d'un parametre
// 
// $('#affichageParametres').on("click", ".gParametreInfos div .gParametre",  function(){

// 	console.log("YEAH");

// });

// $(".gParametre").click(function(){
// 	console.log("YEAH");
// });


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

					// Effacer la vue du conteneur des parametres
					resetConteneurParametres();

				}

			});

	});

	// Prendre en charge le zoom de la fenetre : https://jsplumbtoolkit.com/doc/zooming
	// window.setZoom = function(zoom, instance, transformOrigin, el) {
	//   transformOrigin = transformOrigin || [ 0.5, 0.5 ];
	//   instance = instance || jspInstance;
	//   el = el || instance.getContainer();
	//   var p = [ "webkit", "moz", "ms", "o" ],
	//       s = "scale(" + zoom + ")",
	//       oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

	//   for (var i = 0; i < p.length; i++) {
	//     el.style[p[i] + "Transform"] = s;
	//     el.style[p[i] + "TransformOrigin"] = oString;
	//   }

	//   el.style["transform"] = s;
	//   el.style["transformOrigin"] = oString;

	//   instance.setZoom(zoom);   
	//   instance.repaintEverything(); 
	// };




});

// Evenement creation de connexion
// 
jspInstance.bind("connection", jspEventConnecion);
function jspEventConnecion(connInfo, originalEvent) {
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
    GPS.ajouterSuccesseur(GPT.getId());

    // Ajouter le lien (de class) du source dans le target
    GPT.ajouterPredecesseur(GPS.getId());

    // Sauvegarder l'etat des variables a sauvegarder
	//savePresets();

}

// --- Gestion evenement click sur connexion (suppression effective)
// 
jspInstance.bind("click", jspEventClick);
function jspEventClick(conn) {

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

}

// === /Fin Evenements jsPlumb === //
// =============================== //

// --- Gestion evenement click sur preset de la liste
//
$('#presetChoix').on('change', function() {

	// Recuperer le type
	var type = this.options[this.selectedIndex].text;

	// Ajouter le preset
	//ajouterPreset(type);
	creerGBasePreset(type);

});

// --- Gestion evenement click sur button sauvegarde
//
$('#buttonSauvegarde').on('click', function() {

	// Appeler la fonction de sauvegarde
	savePresets();

});


// --- Gestion evenement click sur button restaurer
//
$('#buttonRestaurer').on('click', function() {

	// Appeler la fonction de restauration
	loadPresets();

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

	// Indiquer que le GBasePreset present est celui dont on a clique (sert aux evenements sur les parametres)
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
	$(".knob").knob({/* TODO parametres et evenements */

		// Evenement Knob : Changer valeur
		'release' : function (v) { 

			// Recuperer l'id
			var id = this.i[0].id;

			// Recuperer l'instance de GParametre
			var gp = getGParametreFromId(gPresetCourant, id);
			
			// Modifier la valeur
			gp.setValeurTraite(v);
		}
	});

});

// --- Fonction ajouterPreset
// --- Description : Cree un preset a la liste des presets existants selon le type
//
/*function ajouterPreset(type){

	// Initialiser le nom de la fonction a appeler
	var nomFonctionCreationPreset = "creerGBasePreset";

	// Verifier si la fonction associe a la creation existe
	if (typeof window[nomFonctionCreationPreset + type] == 'function')
		nomFonctionCreationPreset = nomFonctionCreationPreset + type;

	// Indiquer console
	console.log("Appel de la fonction " + nomFonctionCreationPreset);
	
	// Appeler la fonction de creation du preset et son graphique
	window[nomFonctionCreationPreset](type);

}*/

// --- Fonction definirPreset
// --- Description : Cree la structure des parametres du preset souhaite (si le type est defini)
//
function definirPreset(type, gp){

	// Initialiser le nom de la fonction a appeler
	var nomFonctionCreationPreset = "creerGBasePreset";

	// Verifier si la fonction associe a la creation existe
	if (typeof window[nomFonctionCreationPreset + type] == 'function'){

		//
		nomFonctionCreationPreset = nomFonctionCreationPreset + type;

		// Indiquer console
		console.log("Appel de la fonction " + nomFonctionCreationPreset);
		
		// Appeler la fonction de creation du preset et son graphique
		window[nomFonctionCreationPreset](gp);
	}

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
	var infoImg = constructImgPreset(type, divPreset, gPreset, 
		function() {

			// --- jsPlumb ---
			// ---------------
			jspInstance.ready(function() {

				// Rendre le graphique draggable uniquement dans le conteneur
				jspInstance.draggable($(".divPreset"), {
					// Le conteneur
					containment:conteneurPresets
				});

				// Ajouter les endpoints
				//ajouterEndPoints(gPreset);

				// Renseigner l'id au gBasePreset
				gPreset.setId(divPreset[0].id);

				// Creer le GBasePreset souhaite (structure des parametres)
				definirPreset(type, gPreset);

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

	// Indiquer la position initiale du gBasePreset
	var top = divPreset.get()[0].getBoundingClientRect().top;
	var left = divPreset.get()[0].getBoundingClientRect().left;

	gPreset.setPosition(left, top);

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
function creerGBasePresetGain(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 1, 1, 0.01);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Pan'
	param = new ParametrePan();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetReverb
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetReverb(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Mix'
	var param = new ParametreMix();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(0.8);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetCabinet
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetCabinet(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Room'
	var param = new ParametreRoom();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetOverdrive
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetOverdrive(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 10, 5, 0.01);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Tone'
	param = new ParametreTone();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['Vintage', 'Modern'];
	param = new ParametreType(vals);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetDelay
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetDelay(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'FeedBack'
	var param = new ParametreFeedBack();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mix'
	param = new ParametreMix();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Time'
	param = new ParametreTime();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetAmp
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetAmp(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Drive'
	var param = new ParametreDrive();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Bass'
	param = new ParametreBass();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mid'
	param = new ParametreMid();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Treb'
	param = new ParametreTreb();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Presence'
	param = new ParametrePresence();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Boost'
	param = new ParametreBoost(true);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Master'
	param = new ParametreMaster();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['Brit Man', 'German Modern', 'Clean US', 'Class A'];
	param = new ParametreType(vals);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetFilter
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetFilter(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Frequency'
	var param = new ParametreFrequency(500);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Q'
	param = new ParametreQ();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Volume'
	param = new ParametreVolume(1);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	var vals = ['LOWPASS', 'HIGHPASS', 'BANDPASS', 'LOWSHELF', 'HIGHSHELF', 'PEAKING', 'NOTCH', 'ALLPASS'];
	param = new ParametreType(vals);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetGate
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetGate(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Release'
	var param = new ParametreRelease();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Threshold'
	param = new ParametreThreshold();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetWah
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetWah(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Frequency'
	var param = new ParametreFrequency(600);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Resonance'
	param = new ParametreResonance();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetGraphicEQ
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetGraphicEQ(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre '63'
	var param = new ParametreNum('63');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '125'
	var param = new ParametreNum('125');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '250'
	var param = new ParametreNum('250');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '500'
	var param = new ParametreNum('500');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '1K'
	var param = new ParametreNum('1K');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '2K'
	var param = new ParametreNum('2K');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '4K'
	var param = new ParametreNum('4K');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre '8K'
	var param = new ParametreNum('8K');
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

}

// --- Fonction creerGBasePresetPitch
// --- Description : Fonction permettant de creer une structure contenant un GBasePreset et le preset associe (avec tous les traitements)
// 
function creerGBasePresetPitch(gp){

	// Creer la structure de base du gBasePreset
	var gbp = gp;//creerGBasePreset(type);

	// Recuperer l'id du GBasePreset (pour creer l'id des GParametre)
	var gbpid = gbp.getId() + '-';

	// --- Creer et ajouter les parametres associes --- //
	// ------------------------------------------------ //
	// ------------------------------------------------ //

	// Creer le parametre 'Gain'
	var param = new ParametreGain(0, 1, 1, 0.01);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Pitch'
	var param = new ParametrePitch();
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Mode'
	var vals = ['Octave UP', 'Octave Down'];
	param = new ParametreMode(vals);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

	// Ajouter le parametre 
	gbp.getPreset().ajouterParametre(param);

	// Creer le parametre 'Type'
	vals = ['Whammy'];
	param = new ParametreType(vals);
	param.modifierGPId(gbpid + param.getNom());	// Renseigner l'id du Graphique du parametre

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
