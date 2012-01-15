app = "";
org = "";


$(document).ready(function(){

    $("input#login").click(function(){

        mp.search($("#search").val(),  function(search){
            console.log("results: ", search);
        });
    });

	$( "#find-org" ).autocomplete({
		"source": mp.organization_search,
        "select": function(event, ui) { 
            console.log("selected", ui);
            org = ui.item;
        }
	});
	$( "#find-app" ).autocomplete({
		"source": mp.application_search,
        "select": function(event, ui) { 
            console.log("selected", ui);

            if(org != ""){
                app = ui.item;
                var url = "";
                if(app.field_application_logo.und != undefined){
                    url = app.field_application_logo.und[0].uri.replace("public://", "http://marketplace.civiccommons.org/sites/default/files/styles/app_detail_logo/public/");
                }
                

                //mp.addInteraction(org.nid, app.nid, "deploy");
                $("#apps").append("<article class='app'>" +
                                  "<img src='"+url+"'>" +
                                  "<h2>"+app.title+"</h2>" +
                                  "<p>"+app.field_application_description.und[0].value+"</p>" +
                                  "</article>");
                $("#find-app").val("");
            }else{
                alert("you need to select an organization");
            }


            
        }
	});



});