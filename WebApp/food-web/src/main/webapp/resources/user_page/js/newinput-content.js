var count = 1;
var item = 0;
var isLoad = true;
var checkEmpty = true;
var searchStr = "";
var checkEnter=true;
// -----------Add new input search-------------
$(document).ready(function() {
	$('#btn-plus-search').click(function() {
		var input = '<input type="search" name="" id="input-search'
			+ count
			+ '"class="form-control input-lg" value="" title="" placeholder="Nguyên liệu">';
		$('#btn-plus-search').before(input);
		count++;
		if (count >= 5) {
			$('#btn-plus-search').hide();
		}
	});
	$('#btnStart').click(function(){
		checkEnter=false;
	});
});
// ---------End Add new input search------------

// --------------Ajax load result---------------
function ajax_loading(searchStr, item) {
	checkEmpty = true;
	$.ajax({
		type : "POST",
		url : "search",
		async : false,
		data : {
			"materials" : searchStr,
			"start" : item,
			"limit" : 12
		},
		// contentType: "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			if (result.length == 0){
				checkEmpty = false;
			}
			if (result.length < 12) {
				isLoad = false;
			}
			// alert("Success!");
			// alert(result);
			var resultObj = result;
			// alert(result.length);
			$('#loading').fadeOut('fast');
			var html = "";
			$.each(resultObj, function(key, item) {
				html += '<div class="col-sm-4 col-md-3">';
					html += '<div class="food-item">';
						html += '<figure>';
							html += '<img src="' + item.avatarLink + '">';
							html += '<a href="/iCook/food/'+ item.foodId + '">';
								html += '<figcaption>';
									html += '<h4 class="food-name">'+ item.foodName + '</h4>';
								html += '</figcaption>';
							html += '</a>';
						html += '</figure>';
						html += '<div class="search-detail-container">';
							html += '<div class="search-detail-btn">';
								html += '<span class="search-detail-box description-container">';
									html += '<a href="/iCook/food/'+ item.foodId + '" class="">';
										html += '<h3>' + item.foodName + '</h3>';
										html += '<p><span>' + item.description + '</span></p>';
									html += '</a>';
								html += '</span><!-- /.search-detail-box -->';
							html += '</div><!-- /.search-detail-btn -->';
						html += '</div><!-- /.search-detail-container -->';
					html += '</div><!-- /.food-item -->';
				html += '</div><!-- /.col-md-3 -->';
			});
			$('#search-result').append(html);
		},
		error : function(jqXHR, textStatus, ex) {
			alert("Mất kết nối tới server!");
			console.log(textStatus + "," + ex + "," + jqXHR.responseText);
		}
	});
}

// -----------End Ajax load result--------------

// ---------Ajax load result when click---------
$("#search-button").click(function() {
	item = 0;
	$('#search-result').html("");
	searchStr = "";
	var tmp;
	
	for (var i = 0; i < count; i++) {
		tmp = $("#input-search" + i).val();
		if (tmp.length > 0) {
			if (searchStr.length > 0) {
				searchStr += "-";
			}
			searchStr += tmp;
		}
	}
	if (searchStr.length == 0) {
		alert("Vui lòng nhập nguyên liệu!");
		isLoad = false;
	} else {
		isLoad = true;
		localStorage.setItem("lastSearch", searchStr);
		ajax_loading(searchStr, item);
		if(checkEmpty){
			if ($("#check-search").val() == "on"){
	            $("#search-result-container").slideToggle();
	            $("#check-search").val("off");
	        }
	        $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		}else{
			alert("Không có kết quả");
		}
	}
	return false;
});
//-----------End Ajax load result--------------
//---------Ajax load result when Enter---------
$(document).keypress(function(event){
	  var keycode = (event.keyCode ? event.keyCode : event.which);
	  if (keycode == '13') {
		  if(!checkEnter){
			  $("#search-button").click();
			  return false;
		  }
		  $("#btnStart").click();
		  return false;
	  }
});
//-----------End Ajax load result--------------
// ---------Ajax load result when scroll--------
$(document).scroll(
	function() {
		if (($(window).scrollTop() == $(document).height()- $(window).height())
	/* && $("#check-search").val() == "off" */) {

		if (!isLoad) {
			return;
		}
		$('#loading').html(
				"<img src='resources/user_page/images/loading.gif'/>")
				.fadeIn('fast');
		item += 13;
		ajax_loading(searchStr, item);
	}
	});
// -----------End Ajax load result--------------
