"use strict";
$(document).ready(function(){

// Storing the properties of the playing charcters in an object.
    let characters = {
        'kenobi': {
            name: 'Kenobi',
            health: 120,
            attack: 8,
            imageUrl: "assets/images/obi.jpg",
            enemyAttackBack: 15
        }, 
        'luke': {
            name: 'Luke',
            health: 100,
            attack: 14,
            imageUrl: "assets/images/luke.jpg",
            enemyAttackBack: 5
        }, 
        'sidous': {
            name: 'Sidous',
            health: 150,
            attack: 8,
            imageUrl: "assets/images/darth.jpg",
            enemyAttackBack: 25
        }, 
        'maus': {
            name: 'Maus',
            health: 180,
            attack: 7,
            imageUrl: "assets/images/maus.jpg",
            enemyAttackBack: 20
        }
    };
    
// Displaying the characters at the top of the page when the page reloads.
   
    //Player one 
    let charDiv1 = $("<div class='character' data-name='" + characters.kenobi.name + "'>");
    let charName1 = $("<div class='character-name'>").text(characters.kenobi.name);
    let charImage1 = $("<img alt='image' class='character-image col-md-12 col-sm-12'>").attr("src", characters.kenobi.imageUrl);
    let charHealth1 = $("<div class='character-health'>").text(characters.kenobi.health);
    $("#image1").append(charDiv1).append(charName1).append(charImage1).append(charHealth1);
       
    //Player two 
    let charDiv2 = $("<div class='character' data-name='" + characters.luke.name + "'>");
    let charName2 = $("<div class='character-name'>").text(characters.luke.name);
    let charImage2 = $("<img alt='image' class='character-image col-md-12 col-sm-12'>").attr("src", characters.luke.imageUrl);
    let charHealth2 = $("<div class='character-health'>").text(characters.luke.health);
    $("#image2").append(charDiv2).append(charName2).append(charImage2).append(charHealth2);


    //Player three
    let charDiv3 = $("<div class='character' data-name='" + characters.sidous.name + "'>");
    let charName3 = $("<div class='character-name'>").text(characters.sidous.name);
    let charImage3 = $("<img alt='image' class='character-image col-md-12 col-sm-12'>").attr("src", characters.sidous.imageUrl);
    let charHealth3 = $("<div class='character-health'>").text(characters.sidous.health);
    $("#image3").append(charDiv3).append(charName3).append(charImage3).append(charHealth3);
        

    //Player four 
    let charDiv4 = $("<div class='character' data-name='" + characters.maus.name + "'>");
    let charName4 = $("<div class='character-name'>").text(characters.maus.name);
    let charImage4 = $("<img alt='image' class='character-image col-md-12 col-sm-12'>").attr("src", characters.maus.imageUrl);
    let charHealth4 = $("<div class='character-health'>").text(characters.maus.health);
    $("#image4").append(charDiv4).append(charName4).append(charImage4).append(charHealth4);

// Declaring global variables     
    
    // Variable used to store the selected players  
    let yourPlayer = $("<div>");
    let selectedEnemy = $("<div>");

    // Your characters properties 
    let attackerAttributeName; 
    let attackerName;
    let attackerAttackPoint=0;
    let attackerHealthPoint;

    // Your opponents properties
    let counterAttackerAttributeName; 
    let counterAttackerName;
    let counterAttackerAttackPoint;
    let counterAttackerHealthPoint;

    // variable created to prompt the player if he/she hadn't selected his enemy
    let attack=0; 
   
    // console.log(a)

// Used to select your player and move the rest players to enemies avilable section
    $(".images").on("click.images", function() {
       
        // Storing all the html content of the clicked element in variable
        yourPlayer.html(this);
        yourPlayer.addClass("attackers col-md-12 col-sm-3");

        // detaching the click event handler after selection
        $('.images').off('click.images');

        // adding and removing classes from your character
        $(this).filter(".textPostion").removeClass("images");
        $(this).filter(".textPostion").addClass("attacker");
        $(this).filter(".textPostion").removeClass("selectionList");

        // Appending and displaying the var yourPlayer in to the div
        $(this).detach().appendTo('#selected');
        $('.images').off('click.images');

       // Adding and removing classes from  character available for selecting as your opponent 
        $("div").filter(".selectionList").addClass("defender");
        $('#enemies').detach().appendTo('#availableForSelection');
        $("div").filter(".textPostion").removeClass("images");
        
        // Storing the values/properties of the character selected as your player in the variables
        attackerAttributeName = $(".attacker> .character").attr("data-name");
        attackerName = $(".attacker> .character-name").text().toLowerCase();
        attackerName = attackerName.toLowerCase()
        attackerHealthPoint = $(".attacker> .character-health").text();
      
    });

// Adding the click event handler to the newly created class containing options for selection as an opponent
    $(document).on("click",".defender" ,function() {
       
        // Storing all the html content of the clicked element in variable
        selectedEnemy.html(this);
        selectedEnemy.addClass("opponents col-md-8 col-sm-3");
    
        // adding and removing classes from the character selected as an enemy
        $(this).filter(".textPostion").addClass("opponent");
        $(this).filter(".textPostion").removeClass("selectionList");
        $(this).filter(".textPostion").removeClass("defender");

        // Appending and displaying the var selectedEnemy in to the div
        $('#selectedDefender').append(selectedEnemy);
        $("#attackerInfo").text("");
        $("#noSelectionInfo").text("");

        // Storing the values/properties of the character selected as an opponent in the variables
        counterAttackerAttributeName = $(".opponent> .character").attr("data-name");
        counterAttackerName = $(".opponent> .character-name").text();
        counterAttackerName = counterAttackerName.toLowerCase();
        counterAttackerAttackPoint = characters[counterAttackerName].attack;
        counterAttackerHealthPoint = $(".opponent> .character-health").text();
        attack=0;   
   
    });

// Adding the click event handler to the the attack button    
    $(".attack").on("click", function(){
    // console.log(parseInt(attackerAttackPoint));

        //Conditions for the attack button

        //condtion if your player health point is greater than 0
        if(attackerHealthPoint >= 0 && $("#selectedDefender").text() != ""){
            attackerAttackPoint += characters[attackerName].attack;
            attackerHealthPoint -= counterAttackerAttackPoint;
            counterAttackerHealthPoint -=attackerAttackPoint;       
            $("#attackerInfo").text(`You attacked ${counterAttackerName} for ${attackerAttackPoint} damage`);
            $("#counterAttackerInfo").text(`${counterAttackerName} attacked you back for ${counterAttackerAttackPoint} damage`);
            $("#noSelectionInfo").text("");
            $('.attacker>.character-health').text(attackerHealthPoint);
            $('.opponent>.character-health').text(counterAttackerHealthPoint);
            attack=0;
            // console.log($("#enemies").html());
        }
        
        // condition if the enemies health point is greater than 0 
        if(attackerHealthPoint >= 0 && counterAttackerHealthPoint < 0 ){

                $("#selectedDefender").empty();
                // console.log($("#selectedDefender").text());
                $("#attackerInfo").text(`You have defeated ${counterAttackerName}, you can choose to fight another enemy.`);
                $("#counterAttackerInfo").text("");
                $("#noSelectionInfo").text("");
                counterAttackerAttackPoint=0;
                attack--;

            // console.log(attack);
            // console.log($(".enemies").text().length);  
        }
        
        // condtion if an enemy is not selected 
        if($(".enemies").text() != "" && attackerHealthPoint > 0 && $("#selectedDefender").text() === "" && attack < -1 && counterAttackerAttackPoint === 0 && $("#attackerInfo").text() ==`You have defeated ${counterAttackerName}, you can choose to fight another enemy.`){
            $("#noSelectionInfo").text(`There is no enemy to attack`);
            $("#counterAttackerInfo").text("");
            $("#attackerInfo").text("");
            // console.log($(".enemies").text().length);
        }

        // condition if the enemies health point is below 0 
        if (attackerHealthPoint < 0 && $("#selectedDefender").text() != ""){
            $("#attackerInfo").text("You have been defeated....GAME OVER!!!!!!!!");
            $("#counterAttackerInfo").html(`<button type="button" onClick="window.location.reload() "class ="reload" >Restart</button>`);
            // console.log($(".enemies").text().length);
        }

        // condition if you win the game
        if ( $(".enemies").text().length === 81 && $("#selectedDefender").text() === ""){
           
            // console.log($(".enemies").text());
            $("#noSelectionInfo").text("");
            $("#attackerInfo").text("You have Won!!!!!....GAME OVER!");
            $("#counterAttackerInfo").html(`<button type="button" onClick="window.location.reload() "class ="reload" >Restart</button>`);
            // console.log($(".enemies").text().length);
        }
        
    });

});