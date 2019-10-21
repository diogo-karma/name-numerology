/*
 * dg jacquard 21-oct-2019 - http://thekarma.tech
 */

window.requestAnimFrame = (function(callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

//canvas
var ć;

//context
var $;

//distance of hillset - how far out it runs
var Ð = 460;

//max x,y positions (width and height of canvas)
var ღ_ҳ = 460;
var ღ_y = 460;

//view point (higher looks like your watching from above.)
var ಠ_ಠ = 90;

//half width
var Φ = ღ_ҳ / 2;

//half height
var Θ = ღ_y / 2;

//screen margin left
var ŠĻ = 0;

//screen margin top
var Šτ = -15.0;

//screen margin bottom
var Šɓ = 0;

//color update
var ŭ = 0;

function draw() {
  ć = document.getElementById("canv");
  $ = ć.getContext("2d");
  //make valleys, speed
  setInterval(Ѫ, 60);
}
//2d to 3d conversion  (x3d, y3d, z3d)
function Ҫ(ҳщ, үщ, ȥщ) {
  //scale = dist / dist + z3d
  var Ϛ = Ð / (Ð + ȥщ);

  //x2d to x3d - half w * scale + half w
  var ҳЦ = (ҳщ - Φ) * Ϛ + Φ;

  //y2d to y3d - half w * scale + half w *.01
  var yЦ = (үщ - Θ) * Ϛ + Θ - ȥщ * 0.01;

  //return x2d, y2d vals
  return [ҳЦ, yЦ];
}

//noise function א
function א(ҳ, y) {
  //control height and length of peaks here by changing any of the values, but specifically, the 2.55 val
  return (Math.sin(y * 0.172) + Math.sin((ҳ + y * 0.347) * 0.2)) * 2.55;
}

// make hills && valleys
function Ѫ() {
  //the opacity of the canvas background color gives kind of a blending / shaded effect of the lines so they don't appear so sharp - more mystic-like - purely a matter of taste. looks fine with opacity of 1.
  $.fillStyle = "hsla(239, 25%, 5%, .65)";
  $.fillRect(0, 0, ღ_ҳ, ღ_y);

  //increase bottom margin
  Šɓ += 1;

  //increase top margin
  ŠĻ += 1;

  //increment color val
  ŭ -= 0.5;

  //line width: anything higher than 1 slows animation and looks pretty horrible!
  //I think the highest it should go is .8
  $.lineWidth = 0.22;

  //valley crevices counter
  //equals max x / view point
  var ႿҪ = ღ_ҳ / ಠ_ಠ;

  //shift left = margin left mod 1 * viewpoint
  var Լ = (ŠĻ % 1) * ಠ_ಠ;

  //shift bottom = margin bottom mod 1 * viewpoint
  var ɓ = (Šɓ % 1) * ಠ_ಠ;

  //2d starting points
  //point 2d array x,y
  var ҏЦ = [0, 0];

  //z axis crevice loop (the 3d effect)
  //for z crevices = 100; >=10; decrease them (forward movement effect)
  for (let Ⴟƶ = 100; Ⴟƶ >= 10; Ⴟƶ--) {
    $.beginPath();

    // Э = edge > remove / hide elements outside of this container.
    // eq. to z crevices * 1.25
    var Э = Ⴟƶ * 1.25;

    //z position = z crevices * viewpoint - bottom margin
    var ƶǷ = Ⴟƶ * ಠ_ಠ - ɓ;

    //crevice / line visibility set to false initially
    var Ɣ = false;

    //stroke > rotating hues
    $.strokeStyle = "hsla(" + (ŭ % 360) + ",100%,50%,1)";

    // moveTo the first point(ӻǷ).
    var ӻǷ = true;

    //Ⴟϫ = crevice x
    //for crevice x = edge; crevice x <= crevice counter + edge; increase crevice x
    for (let Ⴟϫ = -Э; Ⴟϫ <= ႿҪ + Э; Ⴟϫ++) {
      //ɦ = horizon > level and direction of noise
      //noise(א) is crevice x + margin left &&  margin bottom + crevice z.
      var ɦ = א(Ⴟϫ + ŠĻ, Šɓ + Ⴟƶ);

      //ϪǷ = x position; ɏǷ = y position
      //hiding and showing lines based on their x,y positions
      //x pos = crevice x * viewpoint - left shift
      var ϪǷ = Ⴟϫ * ಠ_ಠ - Լ;
      //y pos = horizon - margin top * viewpoint
      var ɏǷ = (ɦ - Šτ) * ಠ_ಠ;

      //point 2d = scale(xpos, ypos, zpos)
      ҏЦ = Ҫ(ϪǷ, ɏǷ, ƶǷ);

      //if point 2d[array pos 1] > max x
      if (ҏЦ[1] > ღ_ҳ) {
        //point 2d[array pos 1] = max y
        ҏЦ[1] = ღ_y;
      }
      //else if point 2d[array pos 1] < 0
      else if (ҏЦ[1] < 0) {
        //point 2d [array pos 1] = 0
        ҏЦ[1] = 0;
      } else {
        //else, crevice visibility is true (show more lines)
        Ɣ = true;
      }

      //if point location is at first position
      if (ӻǷ) {
        //shift array
        $.moveTo(ҏЦ[0], ҏЦ[1]);

        //first position is now false
        ӻǷ = false;
      } else {
        //else, create point 2d lines x=0, y=1
        $.lineTo(ҏЦ[0], ҏЦ[1]);
      }
    }
    //if line is within the visible (Ɣ) area, draw it.
    if (Ɣ) {
      $.stroke();
    }
  }
}
window.requestAnimFrame(draw);

// the empty: void
var Ɣ = "";

// result
var ϫ = " + ";
var Э = " = ";

function Ⴟҳ(Š) {
  // number of masters
  if (Š == 11 || Š == 22 || Š == 33) {
    return Š;
  }
  // sum all
  while (Š > 9) {
    let ღ_Š = (Ɣ + Š).split(Ɣ);
    let ღ_ҳ = 0;
    for (let ҳ = 0; ҳ < ღ_Š.length; ҳ++) {
      ღ_ҳ += +ღ_Š[ҳ];
    }
    Š = ღ_ҳ;
  }
  return Š;
}

function isVowel(Š) {
  return /^[aeiou]$/i.test(Š);
}

var abc_r = "abcdefghijklmnopqrstuvwxyz".split(Ɣ);
var abc = {};

for (let ღ_ҳ = 0; ღ_ҳ < abc_r.length; ღ_ҳ++) {
  /*
    Pythagorean table
      א A=1  ღ J=1  ɏ S=1
      א B=2  ღ K=11 ɏ T=2
      א C=3  ღ L=3  ɏ U=3
      א D=4  ღ M=4  ɏ V=22
      א E=5  ღ N=5  ɏ W=5
      א F=6  ღ O=6  ɏ X=6
      א G=7  ღ P=7  ɏ Y=7
      א H=8  ღ Q=8  ɏ Z=8
      א I=9  ღ R=9
  */
  abc[Ɣ + abc_r[ღ_ҳ]] = Ⴟҳ(ღ_ҳ + 1);
}

var app = new Vue({
  el: "#app",

  data: {
    author: "Hello Dg!",
    name: Ɣ,
    result: Ɣ,
    resultExpression: Ɣ,
    resultMotivation: Ɣ,
    resultImpression: Ɣ,
    resultExpressionRaw: Ɣ,
    resultMotivationRaw: Ɣ,
    resultImpressionRaw: Ɣ,
    abc: abc, // A-Z
    ret: false // hide result by default
  },

  methods: {
    clearResult() {
      // reset visible data
      app.result = Ɣ;
      app.resultExpression = Ɣ;
      app.resultMotivation = Ɣ;
      app.resultImpression = Ɣ;
      app.resultExpressionRaw = Ɣ;
      app.resultMotivationRaw = Ɣ;
      app.resultImpressionRaw = Ɣ;
    },

    calcule() {
      app.ret = false;
      app.clearResult();

      // only A-Z chars,
      // remove accents/diacritics
      // strip spaces
      let n = app.name
        .toLowerCase()
        .trim()
        .replace(/\s/g, Ɣ)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, Ɣ)
        .replace(/[^a-zA-Z]/g, Ɣ);

      // letters to array
      n = n.split(Ɣ);

      // ignore name calculation
      if (n.length < 1) return;

      console.log(app.name);
      console.log(n);

      var rExp = 0; // Expression
      var rMot = 0; // Motivation
      var rImp = 0; // Impression

      var v = {
        e: [],
        m: [],
        i: []
      };

      // clear
      app.result = Ɣ;

      // calcule name (all letters, vowels & consonants)
      for (let ღ_ҳ = 0; ღ_ҳ < n.length; ღ_ҳ++) {
        console.log("letter", n[ღ_ҳ], abc[n[ღ_ҳ]]);
        let letter = n[ღ_ҳ].toUpperCase();
        v.e.push(`${letter} (${abc[n[ღ_ҳ]]})`);
        if (isVowel(letter)) {
          // vowels
          rMot += abc[n[ღ_ҳ]]; // sum
          v.m.push(`${letter} (${abc[n[ღ_ҳ]]})`);
        } else {
          // consonants
          rImp += abc[n[ღ_ҳ]]; // sum
          v.i.push(`${letter} (${abc[n[ღ_ҳ]]})`);
        }
        rExp += abc[n[ღ_ҳ]]; // sum
      }

      // vue <3
      app.resultExpressionRaw = v.e.join(ϫ) + Э + rExp;
      app.resultMotivationRaw += v.m.join(ϫ) + Э + rMot;
      app.resultImpressionRaw += v.i.join(ϫ) + Э + rImp;

      app.resultExpression = Ⴟҳ(rExp);
      app.resultMotivation = Ⴟҳ(rMot);
      app.resultImpression = Ⴟҳ(rImp);

      // complete result
      if (rExp > 9) {
        app.result += Э + (Ɣ + rExp).split(Ɣ).join(ϫ);
      }

      // show result
      app.ret = true;
    }
  }
});
