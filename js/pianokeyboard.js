/*
	pianokeyboard.js
	Benjamin Pritchard / Kundalini Software
	15-March-2019

	Simple Javascript routine for drawing a piano keyboard onto a canvas element
	
	Usage:

		var canvas = document.getElementById("canvas");
		RedKeys = [39, 43, 46];
		DrawKeyboard(canvas, RedKeys);	

*/

// canvas 		- HTML5 canvas element
// RedKeyArray  - array of keys to color red (0 = low a, 87 = high c, proceeding chromatically)
function DrawKeyboard(canvas, RedKeyArray) {
	
	// general characteristics of a piano
	
	var TOTAL_KEYS = 88;
	var NUM_WHITE_KEYS = 52;
	var NUM_BLACK_KEYS = TOTAL_KEYS - NUM_WHITE_KEYS;

	var ctx = canvas.getContext("2d");

	var X_BORDER = 0;
	var Y_BORDER = 0;

	var width = canvas.width - (X_BORDER * 2);
	var height = canvas.height - (Y_BORDER * 2); 
	
	var WHITE_KEY_WIDTH = (width / NUM_WHITE_KEYS);
	var WHITE_KEY_HEIGHT = height;

	var BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * .75
	var BLACK_KEY_HEIGHT = height * .66

	function DrawRectWithBorder(X, Y, Width, Height, Color1, Color2) {

		//draw border
		ctx.fillStyle = Color1;
		ctx.fillRect(X, Y, Width, Height);

		//draw inside
		ctx.fillStyle = Color2;
		ctx.fillRect(X+1,Y+1, Width-2, Height-2);

	}

	// draws a back key, based on whiteKeyIndex, where 0 <= WhiteKeyIndex < 52 
	function drawBlackKey(whiteKeyIndex, shouldBeRed = false) { 

	  if (!shouldBeRed) {

		C1 = "rgb(0,0,0)";			// black
		C2 = "rgb(50,50,50)";		// ??
		
		DrawRectWithBorder(X_BORDER + ((whiteKeyIndex+1) * WHITE_KEY_WIDTH) - (BLACK_KEY_WIDTH / 2), Y_BORDER, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT, C1, C2);

	  }
	  else {

		C1 = "rgb(0,0,0)";			// black
		C2 = "rgb(255,0,0)";		// red

		DrawRectWithBorder(X_BORDER + ((whiteKeyIndex+1) * WHITE_KEY_WIDTH) - (BLACK_KEY_WIDTH / 2), Y_BORDER, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT, C1, C2);

	  }
	  
	 }

	function DrawWhiteKey(WhiteKeyIndex, shouldBeRed = false) {
	  
	  if (!shouldBeRed) {

			C1 = "rgb(0,0,0)";			// lback
			C2 = "rgb(255,255,255)";	// white

			DrawRectWithBorder(X_BORDER + (WhiteKeyIndex * WHITE_KEY_WIDTH), Y_BORDER, WHITE_KEY_WIDTH, height, C1, C2);

	   } else {

			C1 = "rgb(0,0,0)";			// black
			C2 = "rgb(255,0,0)";		// red

			DrawRectWithBorder(X_BORDER + (WhiteKeyIndex * WHITE_KEY_WIDTH), Y_BORDER, WHITE_KEY_WIDTH, height, C1, C2);
			
	   }
	}

	function keyType (isBlack,  White_Index) {
		this.isBlack 		= isBlack;
		this.White_Index 	= White_Index
	}  
	
	function AbsoluteToKeyInfo(AbsoluteNoteNum) {
		
		var KeyLookupTable = new Array(TOTAL_KEYS);
	
		KeyLookupTable[0]  = new keyType(false, 0);			// a
		KeyLookupTable[1]  = new keyType(true,  0);			// a#
		KeyLookupTable[2]  = new keyType(false, 1);			// b
		base = 3;
	
		NumOctaves = 8
		for (counter=0; counter<NumOctaves; counter++) {
			octave_offset = 7 * counter;
			
			KeyLookupTable[base+0]  = new keyType(false, octave_offset+2); // c
			KeyLookupTable[base+1]  = new keyType(true,  octave_offset+2); // c#
			KeyLookupTable[base+2]  = new keyType(false, octave_offset+3); // d
			KeyLookupTable[base+3]  = new keyType(true,  octave_offset+3); // d#
			KeyLookupTable[base+4]  = new keyType(false, octave_offset+4); // e
			KeyLookupTable[base+5]  = new keyType(false, octave_offset+5); // f
			KeyLookupTable[base+6]  = new keyType(true,  octave_offset+5); // f#
			KeyLookupTable[base+7] =  new keyType(false, octave_offset+6); // g
			KeyLookupTable[base+8] =  new keyType(true,  octave_offset+6); // g#
			KeyLookupTable[base+9] =  new keyType(false, octave_offset+7); // a
			KeyLookupTable[base+10] = new keyType(true,  octave_offset+7)  // a#
			KeyLookupTable[base+11] = new keyType(false, octave_offset+8); // b
			
			base += 12;
		}
		
		return KeyLookupTable[AbsoluteNoteNum];
	}

	

	// just draw in all the white keys to begin with... 
	for (i = 0; i < NUM_WHITE_KEYS; i++) {
		DrawWhiteKey(i, false);
	}  
	
	
	// now draw specially white keys that need to be red...
	// just loop through all the RedKeyArray
	for (index = 0; index <= TOTAL_KEYS; index++) {
		// and if we find any white keys that are supposed to be red, then draw them in red...
		if (RedKeyArray.includes(index)) {
			KeyLookup = AbsoluteToKeyInfo(index);
			if (!KeyLookup.isBlack)
				DrawWhiteKey(KeyLookup.White_Index, true);
		}
	}
	
	// draw in lowest a# manually (making sure to draw it red if it should be)
	LowestShouldBeRed = RedKeyArray.includes(1);
	drawBlackKey(0, LowestShouldBeRed);					

	// now draw all the rest of the black keys...
	// loop through all 7 octaves	
	numOctaves = 7;
	curWhiteNoteIndex = 2;
	
	for (octave=0; octave<numOctaves; octave++) {
		// and draw 5 black notes per octave...
		for (i=0; i<5; i++) {
			drawBlackKey(curWhiteNoteIndex, false);
			if (i == 1 || i == 4)
				curWhiteNoteIndex +=2;
			else
				curWhiteNoteIndex += 1;
		}
	} 
	
	
	// now draw specially black keys that need to be red...
	// just loop through all the RedKeyArray
	for (index = 0; index <= 88; index++) {
		// and if we find any black keys that are supposed to be red, then draw them in red...
		if (RedKeyArray.includes(index)) {
			KeyLookup = AbsoluteToKeyInfo(index);
			if (KeyLookup.isBlack)
				drawBlackKey(KeyLookup.White_Index, true);
		}
	}
	
}
