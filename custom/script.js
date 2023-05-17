toastr.options.preventDuplicates = true;

$(document).ready(function(){

	// mode default
	var mode = "lyric";

	// click radio mode
	$("input[name='mode']").click(function(){
		mode = $('input[name="mode"]:checked').val();

		if (mode == "content") {
			$("#input-title").show(500);
		}else{
			$("#input-title").hide(500);
		}
	});

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
			$("#output-lyric").css('background-color', '#303026');
			setTimeout(function(){
				navigator.clipboard.writeText($("#output-lyric").val());
				$("#output-lyric").css('background-color', '#1c1c1c');
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
			var output = "";
			if(mode == "lyric") {
				output = handleRemakeLyric(input);
			} else {
				output = handleRemakeContent(input);
			}

			$("#output-lyric").css('background-color', '#303026');
			setTimeout(function(){
				$("#output-lyric").val(output);
				$("#output-lyric").css('background-color', '#1c1c1c');
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

	function handleRemakeContent(input) {
		var title = $("#input-title").val();
		var output = "";

		newTitle = capitalize(title);
		output = v.replaceAll(input, title, newTitle);

		return output;
	}
});