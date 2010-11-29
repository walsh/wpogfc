// Facebook connect
window.fbAsyncInit = function() {
  FB.init(
    {
      //       appId: '146334962085649', // Production  (wal.sh)
      appId: '110614265673667', // localhost
      status: true, 
      cookie: true,
      xfbml: true
    });
  sh.wal.wpogfc.init(FB.getSession());
};

