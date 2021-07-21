var NbJoueur = document.getElementById("NbJoueur");
var commentaire = [];
var joueurs = [];
var Tour = 0
var images = []
images["brulure"] = "Images/Flamme.jpg"
images["poison"] = "Images/Poison.jpg"
images["paralysie"] = "Images/Foudre.jpg"
images["gel"] = "Images/Flocon.jpg"
images["sang"] = "Images/Sang.jpg"
images["folie"] = "Images/Folie.jpg"
images["armure"] = "Images/Armure.jpg"
images["armureMagique"] = "Images/ArmureMagique.jpg"
images["attaque"] = "Images/Attaque.png"
images["attaqueMagique"] = "Images/Sceptre.png"
images["soin"] = "Images/Soin.jpg"
images["precision"] = "Images/Precision.png"

function recupNbJoueur() 
{
    if(NbJoueur.value <= 0){
        document.getElementById("erreurNb").innerHTML = "Nombre invalide"
    } else {
        document.getElementById("nomJoueur").style.display = "block";
        document.getElementById("erreurNb").innerHTML = ""
    }

    document.getElementById("listeJoueur").innerHTML = "";

    console.log(joueurs)

    for(i=0; i < NbJoueur.value ; i++)
    {
        index = i + 1;
        joueurs.push({"Nom" : "", "Vit": "" , "decompte" : 1000, "commentaire" : "", "tour" : 0, "debuff" : [], "buff" : [], "status" : "vivant" });
        document.getElementById("listeJoueur").innerHTML += "<h4><label class='ownLabel mt-2 w-100' for='Joueur" + i + "'> Joueur " + index + " :</label></h4> <input value='" + joueurs[i]['Nom'] + "' class='ownInput mt-2' type='text' id='Joueur" + i + "'> <br>";
    }
    joueurs.length = NbJoueur.value
}

function recupNomJoueur() 
{
    var NewJoueur = "";
    var erreur = 0;

    for(i=0; i < NbJoueur.value ; i++)
    {
        if(document.getElementById("Joueur" + i).value == "")
        {
            erreur++
        }
    }

    console.log(erreur)

    if(erreur > 0){
        document.getElementById("erreurNom").innerHTML = "Nom invalide"
    } else {
        document.getElementById("vitesseJoueur").style.display = "block";
        document.getElementById("erreurNom").innerHTML = ""
        document.getElementById("ajoutVitesse").innerHTML = ""
        
        for(i=0; i < NbJoueur.value ; i++)
        {
            NewJoueur = document.getElementById("Joueur" + i).value;
            joueurs[i]["Nom"] = NewJoueur;
        }
        console.log(joueurs);
        
        for(i=0; i < joueurs.length; i++)
        {
            document.getElementById("ajoutVitesse").innerHTML += "<h4><label class='ownLabel mt-2 w-100' for='vitesse" + i + "'>" + joueurs[i]['Nom'] + " : </label></h4> <input class='ownInput mt-2' type='number' value='" + joueurs[i]['Vit'] + "' placeholder=0 min='0' id='vitesse" + i + "'> <br> "
        }
    }
}

function ajoutJoueur() 
{
    var newJoueur = "";
    var newVitesse = 0;

    newJoueur = document.getElementById("newJoueur").value;
    newVitesse = document.getElementById("newVitesse").value;
    
    if(newJoueur == "" || newVitesse < 0 || newVitesse == ""){
        document.getElementById("erreurNew").innerHTML = "erreur dans les paramètres du nouveau joueur";
    } else {
        joueurs.push({"Nom" : "", "Vit": "" , "decompte" : 1000, "commentaire" : "", "tour" : 0, "debuff" : [], "buff" : [], "status" : "vivant"});
        joueurs[NbJoueur.value]["Nom"] = newJoueur;
        joueurs[NbJoueur.value]["Vit"] = newVitesse;
        if(NbJoueur.value%2 == 0)
        {
            document.getElementById("infoJoueurs1").innerHTML += '<div id="' + NbJoueur.value + '"><div class="row mt-2"><div class="col-8"><div class="text-center"><h3>' + joueurs[NbJoueur.value]["Nom"] + '</h3></div></div><div class="col-4"><button onclick=supprJoueur(' + NbJoueur.value + ') class="btn btn-danger">X</button></div></div><div class="row"><div class="col-xxl-7 col-sm-6 col-md-12 pv px-2"><h4 style="float: left; width: max-content; margin-left : 15px">PV : </h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"><h4 style="float: left; width: max-content"> /</h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"></div><div class="col-xxl-5 col-sm-6 col-md-12 vit px-3"><h4 style="float: left; width: max-content">Vit : </h4><input type="text" id="vitJoueur' + NbJoueur.value + '" class="invisibleInput" value="' + joueurs[NbJoueur.value]["Vit"] +'" maxlength="3"></div></div><div class="row"><div class="col-xxl-4 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-warning w-100" data-bs-toggle="collapse" href="#collapseDebuff' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseDebuff' + NbJoueur.value + '">Debuff</a></div><div class="collapse" id="collapseDebuff' + NbJoueur.value + '"><div style="float: left;"><img src="Images/Flamme.jpg" alt="" style="width: 40px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img brulure" id="brulure' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Poison.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img poison" id="poison' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Foudre.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 2px"><input placeholder=0 type="text" class="img foudre" id="paralysie' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Flocon.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; "><input placeholder=0 type="text" class="img flocon" id="gel' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sang.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 1px"><input placeholder=0 type="text" class="img sang" id="saignement' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Folie.jpg" alt="" style="width: 50px; height : 40px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img folie" id="folie' + NbJoueur.value + '" maxlength="2"></div></div><div class="col-xxl-3 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-info w-100" data-bs-toggle="collapse" href="#collapseBuff' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseBuff' + NbJoueur.value + '">Buff</a></div><div class="collapse" id="collapseBuff' + NbJoueur.value + '"><div style="float: left;"><img src="Images/Armure.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1;"><input placeholder=0 type="text" class="img armure" id="armure' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/ArmureMagique.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img armureMagique" id="armureMagique' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Attaque.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaque" id="attaque' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sceptre.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaqueMagique" id="attaqueMagique' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Soin.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img soin" id="soin' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Precision.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img precision" id="precision' + NbJoueur.value + '" maxlength="2"></div></div><div class="col-xxl-5 col-md-12 col-sm-6 col-xs-6 mt-1"><a class="btn btn-secondary w-100" data-bs-toggle="collapse" href="#collapseCommentaire' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseCommentaire' + NbJoueur.value + '">Infos</a></div><div class="collapse" id="collapseCommentaire' + NbJoueur.value + '"><textarea rows=2 id="commentaire' + NbJoueur.value + '" class="mt-2 commentaire"></textarea></div></div></div>'
        } else {
            document.getElementById("infoJoueurs2").innerHTML += '<div id="' + NbJoueur.value + '"><div class="row mt-2"><div class="col-8"><div class="text-center"><h3>' + joueurs[NbJoueur.value]["Nom"] + '</h3></div></div><div class="col-4"><button onclick=supprJoueur(' + NbJoueur.value + ') class="btn btn-danger">X</button></div></div><div class="row"><div class="col-xxl-7 col-sm-6 col-md-12 pv px-2"><h4 style="float: left; width: max-content; margin-left : 15px">PV : </h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"><h4 style="float: left; width: max-content"> /</h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"></div><div class="col-xxl-5 col-sm-6 col-md-12 vit px-3"><h4 style="float: left; width: max-content">Vit : </h4><input type="text" id="vitJoueur' + NbJoueur.value + '" class="invisibleInput" value="' + joueurs[NbJoueur.value]["Vit"] +'" maxlength="3"></div></div><div class="row"><div class="col-xxl-4 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-warning w-100" data-bs-toggle="collapse" href="#collapseDebuff' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseDebuff' + NbJoueur.value + '">Debuff</a></div><div class="collapse" id="collapseDebuff' + NbJoueur.value + '"><div style="float: left;"><img src="Images/Flamme.jpg" alt="" style="width: 40px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img brulure" id="brulure' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Poison.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img poison" id="poison' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Foudre.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 2px"><input placeholder=0 type="text" class="img foudre" id="paralysie' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Flocon.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; "><input placeholder=0 type="text" class="img flocon" id="gel' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sang.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 1px"><input placeholder=0 type="text" class="img sang" id="saignement' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Folie.jpg" alt="" style="width: 50px; height : 40px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img folie" id="folie' + NbJoueur.value + '" maxlength="2"></div></div><div class="col-xxl-3 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-info w-100" data-bs-toggle="collapse" href="#collapseBuff' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseBuff' + NbJoueur.value + '">Buff</a></div><div class="collapse" id="collapseBuff' + NbJoueur.value + '"><div style="float: left;"><img src="Images/Armure.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1;"><input placeholder=0 type="text" class="img armure" id="armure' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/ArmureMagique.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img armureMagique" id="armureMagique' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Attaque.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaque" id="attaque' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sceptre.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaqueMagique" id="attaqueMagique' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Soin.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img soin" id="soin' + NbJoueur.value + '" maxlength="2"></div><div style="float: left;"><img src="Images/Precision.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img precision" id="precision' + NbJoueur.value + '" maxlength="2"></div></div><div class="col-xxl-5 col-md-12 col-sm-6 col-xs-6 mt-1"><a class="btn btn-secondary w-100" data-bs-toggle="collapse" href="#collapseCommentaire' + NbJoueur.value + '" role="button" aria-expanded="false" aria-controls="collapseCommentaire' + NbJoueur.value + '">Infos</a></div><div class="collapse" id="collapseCommentaire' + NbJoueur.value + '"><textarea rows=2 id="commentaire' + NbJoueur.value + '" class="mt-2 commentaire"></textarea></div></div></div>'
        }
        NbJoueur.value++
        document.getElementById("newJoueur").value = "";
        document.getElementById("newVitesse").value = "";
    }
}

function supprJoueur(index)
{

    resultat = window.confirm('êtes vous sûr de vouloir supprimer ' + joueurs[index]["Nom"] + ' des joueurs? ')
    if(resultat == true)
    {
        joueurs[index]["status"] = "mort";
        document.getElementById(index).innerHTML = ""
    }
}

function recupVitesseJoueur() 
{
    var erreur = 0;
    var newVitesse = 0;
    for(i=0; i < NbJoueur.value ; i++)
    {
        if(document.getElementById("vitesse" + i).value <= 0)
        {
            erreur++
        }
    }
    if(erreur > 0)
    {
        document.getElementById("erreurVit").innerHTML = "Vitesse invalide";
    } else {
        for(i=0; i < NbJoueur.value ; i++)
        {
            newVitesse = document.getElementById("vitesse" + i).value;
            joueurs[i]["Vit"] = newVitesse
            if(joueurs[i]["status"] == "vivant")
            {
                if(i%2 == 0)
                {
                    document.getElementById("infoJoueurs1").innerHTML += '<div id="' + i + '"><div class="row mt-2"><div class="col-8"><div class="text-center"><h3>' + joueurs[i]["Nom"] + '</h3></div></div><div class="col-4"><button onclick=supprJoueur(' + i + ') class="btn btn-danger">X</button></div></div><div class="row"><div class="col-xxl-7 col-sm-6 col-md-12 pv px-2"><h4 style="float: left; width: max-content; margin-left : 15px">PV : </h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"><h4 style="float: left; width: max-content"> /</h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"></div><div class="col-xxl-5 col-sm-6 col-md-12 vit px-3"><h4 style="float: left; width: max-content">Vit : </h4><input type="text" id="vitJoueur' + i + '" class="invisibleInput" value="' + joueurs[i]["Vit"] +'" maxlength="3"></div></div><div class="row"><div class="col-xxl-4 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-warning w-100" data-bs-toggle="collapse" href="#collapseDebuff' + i + '" role="button" aria-expanded="false" aria-controls="collapseDebuff' + i + '">Debuff</a></div><div class="collapse" id="collapseDebuff' + i + '"><div style="float: left;"><img src="Images/Flamme.jpg" alt="" style="width: 40px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img brulure" id="brulure' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Poison.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img poison" id="poison' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Foudre.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 2px"><input placeholder=0 type="text" class="img foudre" id="paralysie' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Flocon.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; "><input placeholder=0 type="text" class="img flocon" id="gel' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sang.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 1px"><input placeholder=0 type="text" class="img sang" id="saignement' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Folie.jpg" alt="" style="width: 50px; height : 40px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img folie" id="folie' + i + '" maxlength="2"></div></div><div class="col-xxl-3 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-info w-100" data-bs-toggle="collapse" href="#collapseBuff' + i + '" role="button" aria-expanded="false" aria-controls="collapseBuff' + i + '">Buff</a></div><div class="collapse" id="collapseBuff' + i + '"><div style="float: left;"><img src="Images/Armure.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1;"><input placeholder=0 type="text" class="img armure" id="armure' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/ArmureMagique.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img armureMagique" id="armureMagique' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Attaque.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaque" id="attaque' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sceptre.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaqueMagique" id="attaqueMagique' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Soin.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img soin" id="soin' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Precision.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img precision" id="precision' + i + '" maxlength="2"></div></div><div class="col-xxl-5 col-md-12 col-sm-6 col-xs-6 mt-1"><a class="btn btn-secondary w-100" data-bs-toggle="collapse" href="#collapseCommentaire' + i + '" role="button" aria-expanded="false" aria-controls="collapseCommentaire' + i + '">Infos</a></div><div class="collapse" id="collapseCommentaire' + i + '"><textarea rows=2 id="commentaire' + i + '" class="mt-2 commentaire"></textarea></div></div></div>'
                } else {
                    document.getElementById("infoJoueurs2").innerHTML += '<div id="' + i + '"><div class="row mt-2"><div class="col-8"><div class="text-center"><h3>' + joueurs[i]["Nom"] + '</h3></div></div><div class="col-4"><button onclick=supprJoueur(' + i + ') class="btn btn-danger">X</button></div></div><div class="row"><div class="col-xxl-7 col-sm-6 col-md-12 pv px-2"><h4 style="float: left; width: max-content; margin-left : 15px">PV : </h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"><h4 style="float: left; width: max-content"> /</h4><input type="text" class="invisibleInput" placeholder="_ _" maxlength="3"></div><div class="col-xxl-5 col-sm-6 col-md-12 vit px-3"><h4 style="float: left; width: max-content">Vit : </h4><input type="text" id="vitJoueur' + i + '" class="invisibleInput" value="' + joueurs[i]["Vit"] +'" maxlength="3"></div></div><div class="row"><div class="col-xxl-4 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-warning w-100" data-bs-toggle="collapse" href="#collapseDebuff' + i + '" role="button" aria-expanded="false" aria-controls="collapseDebuff' + i + '">Debuff</a></div><div class="collapse" id="collapseDebuff' + i + '"><div style="float: left;"><img src="Images/Flamme.jpg" alt="" style="width: 40px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img brulure" id="brulure' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Poison.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img poison" id="poison' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Foudre.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 2px"><input placeholder=0 type="text" class="img foudre" id="paralysie' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Flocon.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; "><input placeholder=0 type="text" class="img flocon" id="gel' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sang.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 1px"><input placeholder=0 type="text" class="img sang" id="saignement' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Folie.jpg" alt="" style="width: 50px; height : 40px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img folie" id="folie' + i + '" maxlength="2"></div></div><div class="col-xxl-3 col-md-6 col-sm-3 col-xs-3 mt-1"><a class="btn btn-info w-100" data-bs-toggle="collapse" href="#collapseBuff' + i + '" role="button" aria-expanded="false" aria-controls="collapseBuff' + i + '">Buff</a></div><div class="collapse" id="collapseBuff' + i + '"><div style="float: left;"><img src="Images/Armure.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1;"><input placeholder=0 type="text" class="img armure" id="armure' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/ArmureMagique.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img armureMagique" id="armureMagique' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Attaque.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaque" id="attaque' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Sceptre.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img attaqueMagique" id="attaqueMagique' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Soin.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img soin" id="soin' + i + '" maxlength="2"></div><div style="float: left;"><img src="Images/Precision.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input placeholder=0 type="text" class="img precision" id="precision' + i + '" maxlength="2"></div></div><div class="col-xxl-5 col-md-12 col-sm-6 col-xs-6 mt-1"><a class="btn btn-secondary w-100" data-bs-toggle="collapse" href="#collapseCommentaire' + i + '" role="button" aria-expanded="false" aria-controls="collapseCommentaire' + i + '">Infos</a></div><div class="collapse" id="collapseCommentaire' + i + '"><textarea rows=2 id="commentaire' + i + '" class="mt-2 commentaire"></textarea></div></div></div>'
                }
            }
        }
        document.getElementById("initialisation").style.display = "none";
        document.getElementById("annonce").style.display = "block";
        document.getElementById("nouveauJoueur").style.display = "block";
        document.getElementById("historique").style.display = "block";
        document.getElementById("btnHistorique").style.display = "block";
    }
}

function calculVitesse()
{   
    erreur = 0
    document.getElementById('btnTour').innerHTML = "Tour : " + Tour + " ; Prochain Tour"
    var place = [];
    var verif = 1;
    var effets = "Effets : <br>"
    // on modifie les informations des personnages
    for(i=0; i < NbJoueur.value ; i++)
    {
        if(joueurs[i]["status"] == "vivant")
        {

            newVitesse = document.getElementById("vitJoueur" + i).value;
            joueurs[i]["Vit"] = newVitesse;
            newBrulure = document.getElementById("brulure" + i).value;
            if(isNaN(newBrulure) || newBrulure < 0){
                erreur++
            }
            joueurs[i]["debuff"]["brulure"] = newBrulure;
            newPoison = document.getElementById("poison" + i).value;
            if(isNaN(newPoison) || newPoison < 0){
                erreur++
            }
            joueurs[i]["debuff"]["poison"] = newPoison;
            newFoudre = document.getElementById("paralysie" + i).value;
            if(isNaN(newFoudre) || newFoudre < 0){
                erreur++
            }
            joueurs[i]["debuff"]["paralysie"] = newFoudre;
            newFlocon = document.getElementById("gel" + i).value;
            if(isNaN(newFlocon) || newFlocon < 0){
                erreur++
            }
            joueurs[i]["debuff"]["gel"] = newFlocon;
            newSang = document.getElementById("saignement" + i).value;
            if(isNaN(newSang) || newSang < 0){
                erreur++
            }
            joueurs[i]["debuff"]["saignement"] = newSang;
            newFolie = document.getElementById("folie" + i).value;
            if(isNaN(newFolie) || newFolie < 0){
                erreur++
            }
            joueurs[i]["debuff"]["folie"] = newFolie;
            newArmure = document.getElementById("armure" + i).value;
            if(isNaN(newArmure) || newArmure < 0){
                erreur++
            }
            joueurs[i]["buff"]["armure"] = newArmure;
            newArmureMagique = document.getElementById("armureMagique" + i).value;
            if(isNaN(newArmureMagique) || newArmureMagique < 0){
                erreur++
            }
            joueurs[i]["buff"]["armureMagique"] = newArmureMagique;
            newAttaque = document.getElementById("attaque" + i).value;
            if(isNaN(newAttaque) || newAttaque < 0){
                erreur++
            }
            joueurs[i]["buff"]["attaque"] = newAttaque;
            newAttaqueMagique = document.getElementById("attaqueMagique" + i).value;
            if(isNaN(newAttaqueMagique) || newAttaqueMagique < 0){
                erreur++
            }
            joueurs[i]["buff"]["attaqueMagique"] = newAttaqueMagique;
            newSoin = document.getElementById("soin" + i).value;
            if(isNaN(newSoin) || newSoin < 0){
                erreur++
            }
            joueurs[i]["buff"]["soin"] = newSoin;
            newPrecision = document.getElementById("precision" + i).value;
            if(isNaN(newPrecision) || newPrecision < 0){
                erreur++
            }
            joueurs[i]["buff"]["precision"] = newPrecision;
            newCommentaire = document.getElementById("commentaire" + i).value;
            joueurs[i]["commentaire"] = newCommentaire;

            //initialise l'affichage des effets 
            if(newBrulure + newPrecision + newFoudre + newFlocon + newSang + newFolie + newArmureMagique + newArmure + newAttaqueMagique + newAttaque + newSoin + newPrecision == 0)
            {
                joueurs[i]["effets"] = ''
            } else {
                joueurs[i]["effets"] = '<div style="height:50px;">'
                if(newBrulure > 0)
                {
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Flamme.jpg" alt="" style="width: 40px; height : 50px; position : absolute; z-index : -1;"><input value="' + joueurs[i]["debuff"]["brulure"] + '" readonly type="text" class="img2 brulure" maxlength="2"></div>'
                }
                if(newPoison > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Poison.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["debuff"]["poison"] + '" readonly type="text" class="img2 poison" maxlength="2"></div>'
                }
                if(newFoudre > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Foudre.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 2px"><input value="' + joueurs[i]["debuff"]["paralysie"] + '" readonly type="text" class="img2 foudre"  maxlength="2"></div>'
                }
                if(newFlocon > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Flocon.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; "><input value="' + joueurs[i]["debuff"]["gel"] + '" readonly type="text" class="img2 flocon" maxlength="2"></div>'
                }
                if(newSang > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Sang.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 1px"><input value="' + joueurs[i]["debuff"]["saignement"] + '" readonly type="text" class="img2 sang" maxlength="2"></div>'
                }
                if(newFolie > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Folie.jpg" alt="" style="width: 50px; height : 40px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["debuff"]["folie"] + '" type="text" class="img2 folie" maxlength="2"></div>'
                }
                if(newArmure > 0){    
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Armure.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1;"><input value="' + joueurs[i]["buff"]["armure"] + '" type="text" class="img2 armure" maxlength="2"></div>'
                }
                if(newArmureMagique > 0){    
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/ArmureMagique.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["buff"]["armureMagique"] + '" type="text" class="img2 armureMagique" id="armureMagique' + i + '" maxlength="2"></div>'
                }
                if(newAttaque > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Attaque.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["buff"]["attaque"] + '" type="text" class="img2 attaque" maxlength="2"></div>'
                }
                if(newAttaqueMagique > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Sceptre.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["buff"]["attaqueMagique"] + '" type="text" class="img2 attaqueMagique" maxlength="2"></div>'
                }
                if(newSoin > 0){    
                joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Soin.jpg" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["buff"]["soin"] + '" type="text" class="img2 soin" maxlength="2"></div>'
                }
                if(newPrecision > 0){
                    joueurs[i]["effets"] += '<div style="float: left;"><img src="Images/Precision.png" alt="" style="width: 50px; height : 50px; position : absolute; z-index : -1; margin-left : 3px"><input value="' + joueurs[i]["buff"]["precision"] + '" type="text" class="img2 precision" maxlength="2"></div>'
                }
                joueurs[i]["effets"] += '</div>';
            }
        }
    }

    if(erreur > 0)
    {
        document.getElementById("erreurEffet").innerHTML = "il y a une erreur dans la saisis d'un effet."
    } else {
        document.getElementById("erreurEffet").innerHTML = ""
        // on calcul les vitesses
        while(verif == 1)
        {
            for(i=0; i < NbJoueur.value; i++)
            {
                if(joueurs[i]["status"] == "vivant")
                {
                    joueurs[i]["decompte"] = joueurs[i]["decompte"] - joueurs[i]["Vit"];
                    
                    if(joueurs[i]["decompte"] <= 0)
                    {
                        verif = 0;
                        joueurs[i]["tour"]++;
                        place.push(i)
                    }
                }
            }
        }

        // on affiche les joueurs qui doivent jouer

        document.getElementById("annonces").innerHTML  = ""

        for(i=0; i < place.length ; i++)
        {
            document.getElementById("annonces").innerHTML += '<h3>C\'est au tour de : ' + joueurs[place[i]]["Nom"] +'</h3><h5>Tour : ' + joueurs[place[i]]["tour"] + ' Score : ' + joueurs[place[i]]["decompte"]*(-1) + '</h5><h5> Effets : </h5>' + joueurs[place[i]]["effets"] + '<h5>Commentaires : <textarea readonly rows=2 placeholder="' + joueurs[place[i]]["commentaire"] + '" class="mt-2 commentaire"></textarea></h5><div class="ligne"></div>'
            document.getElementById("listeHistorique").innerHTML += '<tr><th>' + Tour + '</th><td> ' + joueurs[place[i]]["Nom"] + ' </td><td>' + joueurs[place[i]]["tour"] + '</td></tr>'
        }
        // on décrémente la valeur des buffs et debuffs et on réinitialise le décompte

        for(i=0; i < place.length ; i++)
        {
            if(joueurs[place[i]]["decompte"] <= 0)
            {
                joueurs[place[i]]["decompte"] = joueurs[place[i]]["decompte"] + 1000;
                if(joueurs[place[i]]["debuff"]["brulure"] != 0)
                {
                    joueurs[place[i]]["debuff"]["brulure"]--
                    document.getElementById("brulure" + place[i]).value = joueurs[place[i]]["debuff"]["brulure"]
                } else if(joueurs[place[i]]["debuff"]["brulure"] == 0) {
                    joueurs[place[i]]["debuff"]["brulure"] = ""
                    document.getElementById("brulure" + place[i]).value = "";
                }
                if(joueurs[place[i]]["debuff"]["poison"] != 0)
                {
                    joueurs[place[i]]["debuff"]["poison"]--
                    document.getElementById("poison" + place[i]).value = joueurs[place[i]]["debuff"]["poison"]
                } else if(joueurs[place[i]]["debuff"]["poison"] == 0) {
                    joueurs[place[i]]["debuff"]["poison"] = ""
                    document.getElementById("poison" + place[i]).value = "";
                }
                if(joueurs[place[i]]["debuff"]["paralysie"] != 0)
                {
                    joueurs[place[i]]["debuff"]["paralysie"]--
                    document.getElementById("paralysie" + place[i]).value = joueurs[place[i]]["debuff"]["paralysie"]
                } else if(joueurs[place[i]]["debuff"]["paralysie"] == 0) {
                    joueurs[place[i]]["debuff"]["paralysie"] = ""
                    document.getElementById("paralysie" + place[i]).value = "";
                }
                if(joueurs[place[i]]["debuff"]["gel"] != 0)
                {
                    joueurs[place[i]]["debuff"]["gel"]--
                    document.getElementById("gel" + place[i]).value = joueurs[place[i]]["debuff"]["gel"]
                } else if(joueurs[place[i]]["debuff"]["gel"] == 0) {
                    joueurs[place[i]]["debuff"]["gel"] = ""
                    document.getElementById("gel" + place[i]).value = "";
                }
                if(joueurs[place[i]]["debuff"]["saignement"] != 0)
                {
                    joueurs[place[i]]["debuff"]["saignement"]--
                    document.getElementById("saignement" + place[i]).value = joueurs[place[i]]["debuff"]["saignement"]
                } else if(joueurs[place[i]]["debuff"]["saignement"] == 0) {
                    joueurs[place[i]]["debuff"]["saignement"] = ""
                    document.getElementById("saignement" + place[i]).value = "";
                }
                if(joueurs[place[i]]["debuff"]["folie"] != 0)
                {
                    joueurs[place[i]]["debuff"]["folie"]--
                    document.getElementById("folie" + place[i]).value = joueurs[place[i]]["debuff"]["folie"]
                } else if(joueurs[place[i]]["debuff"]["folie"] == 0) {
                    joueurs[place[i]]["debuff"]["folie"] = ""
                    document.getElementById("folie" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["armure"] != 0)
                {
                    joueurs[place[i]]["buff"]["armure"]--
                    document.getElementById("armure" + place[i]).value = joueurs[place[i]]["buff"]["armure"]
                } else if(joueurs[place[i]]["buff"]["armure"] == 0) {
                    joueurs[place[i]]["buff"]["armure"] = ""
                    document.getElementById("armure" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["armureMagique"] != 0)
                {
                    joueurs[place[i]]["buff"]["armureMagique"]--
                    document.getElementById("armureMagique" + place[i]).value = joueurs[place[i]]["buff"]["armureMagique"]
                } else if(joueurs[place[i]]["buff"]["armureMagique"] == 0) {
                    joueurs[place[i]]["buff"]["armureMagique"] = ""
                    document.getElementById("armureMagique" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["attaque"] != 0)
                {
                    joueurs[place[i]]["buff"]["attaque"]--
                    document.getElementById("attaque" + place[i]).value = joueurs[place[i]]["buff"]["attaque"]
                } else if(joueurs[place[i]]["buff"]["attaque"] == 0) {
                    joueurs[place[i]]["buff"]["attaque"] = ""
                    document.getElementById("attaque" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["attaqueMagique"] != 0)
                {
                    joueurs[place[i]]["buff"]["attaqueMagique"]--
                    document.getElementById("attaqueMagique" + place[i]).value = joueurs[place[i]]["buff"]["attaqueMagique"]
                } else if(joueurs[place[i]]["buff"]["attaqueMagique"] == 0) {
                    joueurs[place[i]]["buff"]["attaqueMagique"] = ""
                    document.getElementById("attaqueMagique" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["soin"] != 0)
                {
                    joueurs[place[i]]["buff"]["soin"]--
                    document.getElementById("soin" + place[i]).value = joueurs[place[i]]["buff"]["soin"]
                } else if(joueurs[place[i]]["buff"]["soin"] == 0) {
                    joueurs[place[i]]["buff"]["soin"] = ""
                    document.getElementById("soin" + place[i]).value = "";
                }
                if(joueurs[place[i]]["buff"]["precision"] != 0)
                {
                    joueurs[place[i]]["buff"]["precision"]--
                    document.getElementById("precision" + place[i]).value = joueurs[place[i]]["buff"]["precision"]
                } else if(joueurs[place[i]]["buff"]["precision"] == 0) {
                    joueurs[place[i]]["buff"]["precision"] = ""
                    document.getElementById("precision" + place[i]).value = "";
                }
            
            }
        }
        Tour++
    }
}
