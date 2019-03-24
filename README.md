"If something is worth doing once, it is worth automating." -- Unknown

Simple Javascript library for drawing a piano keyboard onto an HTML5 cavnas.

Usage:

    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	RedKeys = [0, 39, 43, 46];

	DrawKeyboard(ctx, RedKeys);

(RedKeys is an optional )

Written as part of a blog series on developing computer software, and adopting the "programmer mindset":

 https://www.benjaminpritchard.org/drawing-an-animated-piano-keyboard-using-javascript/

 Benjamin Pritchard / Kundalini Software
 15-March-2019  