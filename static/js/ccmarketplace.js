var MarketPlace = function(){

    var apiEndpoint = "http://marketplace.civiccommons.org/api/v1/";

    var thismarket = this;
    this.setCreds = function(username, password){
        thismarket.username = username;
        thismarket.password = password;
        
//        curl -v --data '{"username":"[[your_username]]","password":"[[your_password]]"}' --header "Content-Type:application/json" http://marketplace.civiccommons.org/api/v1/user/login


        var data = {"username":username, "password":password};

        thismarket.request("user", "login", "GET", data, function(data){
            console.log("got data back:", data);
        });
    }
    this.getSession = function(){
        
    }

    this.application_search = function(request, cb){
        thismarket.search(request, "application", cb);
    }

    this.organization_search = function(request, cb){
        thismarket.search(request, "organization", cb);
    }

    
    this.search = function(request, type, cb){
        //http://marketplace.civiccommons.org/api/v1/views/application_api.json?display_id=node_view&filters
        
        thismarket.request("views", type+"_api", "GET", {"display_id":"node_view", "keywords":request.term}, function(data){
            for(d in data){
                data[d].label = data[d].title;
                data[d].value = data[d].title;
            }
            cb(data);
        });
    }


    this.request = function(node, func, type, data, cb){
        
        $.ajax(apiEndpoint+node+"/"+func+".jsonp",
               {//"headers":{"Content-Type":"application/json"},
                "success":cb,
                "type":type,
                "data":data,
                "dataType":"jsonp"});
     
    }

}


var mp = new MarketPlace();
