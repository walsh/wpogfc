console.log("sh.wal.wpogfc");
var sh = sh || { wal: { wpogfc: {} } }; 

(function($) {
   // Procedurally populate for initial rendering view of friends
   $.getJSON(
     "https://graph.facebook.com/me/friends?access_token=2227470867|2.UuAatxMAui5nukMmOyINWg__.3600.1291010400-1178471455|hAvH7peeHt86viZ0Np8Ahupr33A" + "&callback=?",
     function(data) {
       //       console.log(data);
       sh.wal.wpogfc.friends = data.data;
       // TODO: No DOM update in each loop
       for (var p in sh.wal.wpogfc.friends) {
	 // id: "10720515"
	 // name: "Joya Iverson"
	 $("#friendsContainer").append(
	   "<li>" + sh.wal.wpogfc.friends[p].name + "</li>"
	 );
       }

     }
   );


   // Procedurally populate for initial rendering view of likes
   $.getJSON(
     "https://graph.facebook.com/me/likes?access_token=2227470867|2.UuAatxMAui5nukMmOyINWg__.3600.1291010400-1178471455|hAvH7peeHt86viZ0Np8Ahupr33A" + "&callback=?",
     function(data) {
       sh.wal.wpogfc.likes = data.data;
       // TODO: No DOM update in each loop
       for (var p in sh.wal.wpogfc.likes) {
	 //  category: "Nonprofit"
	 // created_time: "2010-11-07T17:00:17+0000"
	 // id: "24878436177"
	 // name: "IGNITEworldwide"
	 $("#likesContainer").append(
	   "<li>" + sh.wal.wpogfc.likes[p].name + "</li>"
	 );
       }
     }
   );


   // Provide callback support for when Facebook connect is loaded.
   // For the initial review just test with FB.api

   FB.api(
     {
       method: 'fql.query',
       query: 'SELECT name FROM user WHERE uid=5526183'
     },
     function(response) {
       alert('Name is ' + response[0].name);
     }
   );

   // Get the session information for making the additional requests about a user

   // access_token: "110614265673667|2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455|jT2rbJeQ_UPzkPJJ1hW_C8ydYj0"
   // expires: 1291014000
   // secret: "9a9QI_mKr3CVxmFI2enYQQ__"
   // session_key: "2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455"
   // sig: "163abc39f1e918fd555cf8d00ba61c0c"
   // uid: "1178471455"

   // Check for the autenticated state 
   FB.api(
     '/me', 
     function(data) {
       console.log(data);
     });


 }(jQuery));