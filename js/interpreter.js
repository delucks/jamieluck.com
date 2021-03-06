/* interpreter.js
 */

// base64-encoded `figlet` strings
var ie_banner = 'ICAgICAgXyAgICAgICAgICAgIF8gICAgIF9fICAgICAgICAgX18gICAgICAgICAgICAgICAgIAogICAgIChfKV9fIF9fXyBfICAoXylfXyAvIC9fIF9fX19fXy8gL19fIF9fX19fX18gIF9fIF8gCiAgICAvIC8gXyBgLyAgJyBcLyAvIC1fKSAvIC8vIC8gX18vICAnXy8vIF9fLyBfIFwvICAnIFwKIF9fLyAvXF8sXy9fL18vXy9fL1xfXy9fL1xfLF8vXF9fL18vXF8oXylfXy9cX19fL18vXy9fLwp8X19fLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCg=='
var es_banner = 'ICAgICAgXyAgICAgICAgICAgICAgICAgICAgX18gICAgICAgICBfXyAgICAgICAgICAgICAgICAgCiAgICAgKF8pX18gX19fIF8gIF9fXyBfX18gLyAvXyBfX19fX18vIC9fXyBfX19fX19fICBfXyBfIAogICAgLyAvIF8gYC8gICcgXC8gLV98Xy08LyAvIC8vIC8gX18vICAnXy8vIF9fLyBfIFwvICAnIFwKIF9fLyAvXF8sXy9fL18vXy9cX18vX19fL18vXF8sXy9cX18vXy9cXyhfKV9fL1xfX18vXy9fL18vCnxfX18vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo='
var banner = ie_banner
// Websites that we'll use throughout the document
var home = 'https://jamieluck.com';
var github = 'https://github.com/delucks';
var blog = 'https://jamieluck.com';
var linkedin = 'https://www.linkedin.com/in/jamieluck';
//var resume = home + 'JamesLuckResume.pdf';
var links = [
  [".", home],
  ["$HOME", home],
  ["~", home],
  ["github", github],
  ["blog", blog],
  ["linkedin", linkedin]
];

var help_output = "<table><tr>" +
"<td><span class='term-green'>ping</span></td><td>pong</td>" +
"</tr><tr>" +
"<td><span class='term-green'>contact</span></td><td>my contact information</td>" +
"</tr><tr>" +
"<td><span class='term-green'>ls</span></td><td>links to other places (are clickable)</td>" +
"</tr><tr>" +
"<td><span class='term-green'>cd</span></td><td>open one of my links by name</td>" +
"</tr><tr>" +
"<td><span class='term-green'>help</span></td><td>display this help text</td>" +
"</tr><tr>" +
"<td><span class='term-green'>clear</span></td><td>clear the terminal</td>" +
"</tr></table>";

var ping_output = "PING " + location.hostname + " (127.0.0.1) 56(84) bytes of data.\n" +
"64 bytes from "+location.hostname+": icmp_seq=1 ttl=59 time=0.001 ms\n\n" +
"--- "+location.hostname+" ping statistics ---\n" +
"1 packets transmitted, 1 received, 0% packet loss, time 0ms\n" +
"rtt min/avg/max/mdev = 0.001/0.001/0.001/0.000 ms";

var contact_output = "<pre>echo 'krmt(qznrvofxp)xln' | tr \"$(echo {z..a} | tr -d ' ')()\" 'a-z@.' # email</pre>";

// Set up the terminal
$(document).ready(function() {
  $('#term').terminal({
    echo: function(arg1) {
      this.echo(arg1)
    },
    ping: function() {
      this.echo(ping_output)
    },
    cd: function(arg1) {
      switch (arg1)
      {
        case "$HOME":
          window.open(home,'_blank');
          break;
        case ".":
          window.open(home,'_blank');
          break;
        case "~":
          window.open(home,'_blank');
          break;
        case "github":
          window.open(github,'_blank');
          break;
        case "linkedin":
          window.open(linkedin,'_blank');
          break;
        case "blog":
          window.open(blog,'_blank');
          break;
        case "..":
          this.echo("You're at the top level, silly");
          break;
        default:
          this.echo("I can't find " + arg1);
      }
    },
    cat: function(arg1) {
      this.exec("cd " + arg1);
    },
    help: function() {
      this.echo(help_output, {raw: true});
    },
    ls: function() {
      var linktext = "<p class='term-green'>Links are directories, cd into them to view them. You can also click on the directory names.</p><table>";
      for (var i = 0; i<links.length;i++) {
        linktext = linktext + "<tr><td>drwx-r-xr-x</td><td>2</td><td>delucks</td><td>users</td><td>4096</td><td>Aug 28 19:51</td><td><a class='term-green' href='"+links[i][1]+"' target='_blank'>"+links[i][0]+"</a></td></tr>";
      }
      linktext = linktext + "</table>";
      this.echo(linktext, {raw: true, exec: false});
    },
    contact: function() {
      this.echo(contact_output, {raw: true});
    },
  }, {
    prompt: "visitor@"+location.hostname+":~$ ",
    height: '99%', /* cannot do 100% because it obscures the prompt for whatever reason */
    exit: false,
    convertLinks: false,
    greetings: window.atob(banner) + '\nHi! If you want to see a more traditional website, type \'cd $HOME\' or \'cd ~\'\nThe command "help" is a good starting place.'
    });
});
