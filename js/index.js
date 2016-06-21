//Reference= https://codepen.io/FreeCodeCamp/full/Myvqmo/

//Example API-  https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Front-End-Project-Use-Twitchtv-JSON-API

//API documentation-  https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel

// constant stream array- ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

$(document).ready(function() {
  var channel = ["ESL_SC2", "OgamingSC2", "Cretetion", "FreeCodeCamp", "Storbeck", "Habathcx", "ALK824", "Babrooster", "JCVIM"];

  var jsondata = [];
  for (x = 0; x < channel.length; x++) {
    var link = 'https://api.twitch.tv/kraken/streams/' + channel[x] + '?callback=?';

    $.ajax({
      url: link,
      type: 'GET',
      dataType: 'jsonp',
      success: function(json) {
        jsondata = json;

        console.log(jsondata);

        if (jsondata.stream != null) {
          var div2 = document.createElement('div');

          var h2 = document.createElement('h4');

          var tit2 = document.createTextNode(jsondata.stream.channel.display_name);

          h2.appendChild(tit2);

          $(div2).append($('<img>', {
            src: jsondata.stream.channel.logo,
            alt: "Logo",
            title: jsondata.stream.channel.display_name,
            style: "position:fixed ; float:left; height:5%;"
          }));
          div2.appendChild(h2);

          div2.setAttribute("class", "rclass2");
          var a2 = document.createElement('a');
          a2.href = jsondata.stream.channel.url;
          var p2 = document.createElement('h5');
          var infor2 = document.createTextNode(jsondata.stream.game + "- " + jsondata.stream.channel.status);
          p2.setAttribute("class", "info");
          p2.appendChild(infor2);
          a2.appendChild(p2);
          div2.appendChild(a2);
          $('#onlineList').append(div2);
        } else {
          var div2 = document.createElement('div');
          var a2 = document.createElement('a');
          var h2 = document.createElement('h3');
          var newid = jsondata._links.self.split("/").pop();

          var tit2 = document.createTextNode(newid);
          a2.href = "https://www.twitch.tv/" + newid;

          h2.appendChild(tit2);
          a2.appendChild(h2);
          div2.appendChild(a2);

          div2.setAttribute("class", "rclass2");
          $('#offlineList').append(div2);
        };

          var newid = jsondata._links.self.split("/").pop();
          var div = document.createElement('div');

          var h = document.createElement('h5');

          var tit = document.createTextNode(newid);
          h.appendChild(tit);

          div.appendChild(h);

          div.setAttribute("class", "rclass");

          if (jsondata.stream != null) {
            var p = document.createElement('h4');
            var infor = document.createTextNode(jsondata.stream.game + "- " + jsondata.stream.channel.status);
            var a = document.createElement('a');
            a.href = jsondata.stream.channel.url;
            p.setAttribute("class", "info");
            p.appendChild(infor);
            a.appendChild(p);
            div.appendChild(a);
            $("#completeList").append(div);
          } else {
            var p = document.createElement('h5');
            var a = document.createElement('a');
            p.setAttribute("class", "info-o");
            var infor = document.createTextNode("Not Online");
            a.href = "https://www.twitch.tv/" + newid;
            p.appendChild(infor);
            a.appendChild(p)
            div.appendChild(a);
            $("#completeList").append(div);
          };
        } 
      
    });
  };

  // ----------------TABS ---------------------
  $('#onlineBTN').click(function() {
    $("#onlineList").css("z-index", "999");
    $("#onlineList").css("opacity", "1");
    $("#completeList").css("z-index", "997");
    $("#offlineList").css("z-index", "996");
  });

  $('#completeBTN').click(function() {
    $("#onlineList").css("z-index", "997");
    $("#onlineList").css("opacity", "0");
    $("#completeList").css("z-index", "999");
    $("#offlineList").css("z-index", "996");
  });

  $('#offlineBTN').click(function() {
    $("#onlineList").css("z-index", "996");
    $("#onlineList").css("opacity", "0");
    $("#completeList").css("z-index", "997");
    $("#offlineList").css("z-index", "999");
  });

});
