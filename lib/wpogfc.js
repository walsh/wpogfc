(function($) {
   var sh = sh || { wal: { wpogfc: {} } }; 
   console.log("wpogfc.js");

   // Procedurally populate for initial rendering view of friends
   $.getJSON(
     "https://graph.facebook.com/me/friends?access_token=2227470867|2.UuAatxMAui5nukMmOyINWg__.3600.1291010400-1178471455|hAvH7peeHt86viZ0Np8Ahupr33A" + "&callback=?",
     function(data) {
       console.info(data);
     }
   );


   // Procedurally populate for initial rendering view of likes
   $.getJSON(
     "https://graph.facebook.com/me/likes?access_token=2227470867|2.UuAatxMAui5nukMmOyINWg__.3600.1291010400-1178471455|hAvH7peeHt86viZ0Np8Ahupr33A" + "&callback=?",
     function(data) {
       console.info(data);
     }
   );


 }(jQuery));