toastr.options.preventDuplicates = true;

$(document).ready(function(){

	// click button clear input
	$("#btn-clear-input").click(function(){
		var input = $("#input-lyric").val();
		if(input != "") {
			$("#input-lyric").val("");
			toastr.success('Input is cleared');
		}else{
			toastr.error('Input is null');
		}
	});

	// click button clear output
	$("#btn-clear-output").click(function(){
		var outputLyric = $("#output-lyric").val();
		if(outputLyric != "") {
			$("#output-lyric").val("");
			toastr.success('Output is cleared');
		}else{
			toastr.error('Output is null');
		}
	});

	// click button copy
	$("#btn-copy").click(function(){
		var outputLyric = $("#output-lyric").val();
		if(outputLyric != "") {
			setTimeout(function(){
				navigator.clipboard.writeText($("#output-lyric").val());
			}, 200);
			toastr.success('Output is copied');
		}else{
			toastr.error('Output is null');
		}
	});

	// click button remake
	$("#btn-remake").click(function(){
		var input = $("#input-lyric").val();
		if(input != "") {
			var output = handleRemakeLyric(input);

			setTimeout(function(){
				$("#output-lyric").val(output);
			}, 200);

			toastr.success('Remake done');
		}else{
			toastr.error('Input is null');
		}
	});

	function handleRemakeLyric(input) {
		var lines = input.split('\n');
		var realLength = lines.length;
		var output = "";
		var line = "";

		// remove last empty
		for(var i = lines.length-1; i >= 0; i--) {
			line = lines[i];
			if(line == "") {
				realLength = realLength - 1;
			} else {
				break;
			}
		}

		for(var i = 0; i < realLength; i++) {
			line = lines[i];
			line = line.trim().toLocaleLowerCase();

			// first line
			if(i == 0) {
				line = line.charAt(0).toUpperCase() + line.slice(1);
			}

			// remove sign
			line = v.replaceAll(line, '?', '');
			line = v.replaceAll(line, ',', '');
			line = v.replaceAll(line, '!', '');
			line = v.replaceAll(line, '.', '');
			line = v.replaceAll(line, '…', '');
			line = v.replaceAll(line, '(', '');
			line = v.replaceAll(line, ')', '');
			line = v.replaceAll(line, '  ', ' ');

			// line not first
			if(i >= 1 && lines[i-1] == "") {
				line = line.charAt(0).toUpperCase() + line.slice(1);
			} else if (i != 0){
				line = line.charAt(0).toLocaleLowerCase() + line.slice(1);
			}

			// last line
			if(i == realLength - 1) {
				line = line + " ..";
			}

			output = output + line.trim() + "\n";
		}

		return output;
	}

	function capitalize(str) {
		strVal = '';
		str = str.split(' ');
		for (var chr = 0; chr < str.length; chr++) {
			strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' ';
		}
		return strVal.substring(0, strVal.length - 1);
	}
});