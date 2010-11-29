(function($) {
   var sh = sh || { wal: { wpogfc: {} } }; 
   console.log("sh.wal.wpogfc");

   // Procedurally populate for initial rendering view of friends
   $.getJSON(
     "https://graph.facebook.com/me/friends?access_token=2227470867|2.UuAatxMAui5nukMmOyINWg__.3600.1291010400-1178471455|hAvH7peeHt86viZ0Np8Ahupr33A" + "&callback=?",
     function(data) {
       console.log(data);
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


 }(jQuery));