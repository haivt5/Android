
$(document).ready(function() {
	$('.linkView').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	$('#data-table-1').on('click', '.btn-check',function(e){ 
		var foodID=$(this).attr('value');
		$.ajax({
			url: "/iCook/getFoodID?txtFoodID="+foodID,
			type: "GET",
			success: function(food) {
				food.status = 0;
				$.ajax({
					 url: "/iCook/updateFood", 
					 type: 'POST', 
					 dataType: 'json',
					 data: JSON.stringify(food), 
					 beforeSend: function(xhr) {
				            xhr.setRequestHeader("Accept", "application/json");
				            xhr.setRequestHeader("Content-Type", "application/json");
				        }, 
					 success: function(newfood) {
						 
					 }
				});
			}
		});
		var td = $(this).closest('tr').find('td.statustd');
		 td.html("Đã Duyệt");
	});
	$("#btnDelete").click(function(){
		$('input:checkBox[type=checkbox]:checked').each(function () {
			   var sThisVal = $(this).val() ;
			   $.ajax({
					url: "/iCook/deleteFood?txtFoodID="+sThisVal,
					type: "GET",
					success: function(food) {
						$('#'+sThisVal).remove();
					}
				});
			 });
	});
	$("#btnSubmit").click(function(){
		var foodDetail =  JSON.stringify({
			"materialDetail": $("#txtMaterialDetail").val(),
			"tutorial": $("#txtContent").val(),
			"source": $("#txtSource").val(),
			"user":"ADMIN"
		});
		var food =  JSON.stringify({
			"categoryId": $("#cbbCategory").val(),
			"foodName": $("#txtFoodName").val(),
			"description": $("#txtDescription").val(),
			"linkImage":$("#txtImageLink").val(),
			"listMaterial":$("#txtMaterialLst").val()
		});
    	$.ajax({
			url:"/iCook/createFood",
			type: 'POST', 
			 dataType: 'json',
			 data: (food), 
			 beforeSend: function(xhr) {
		            xhr.setRequestHeader("Accept", "application/json");
		            xhr.setRequestHeader("Content-Type", "application/json");
		        },
		        success: function(foodNew) {
		        	var foodname=foodNew.foodName;
		    		$.ajax({
		    			url:"/iCook/createFoodDetail",
		    			type: 'POST', 
		    			 dataType: 'json',
		    			 data: (foodDetail), 
		    			 beforeSend: function(xhr) {
		    		            xhr.setRequestHeader("Accept", "application/json");
		    		            xhr.setRequestHeader("Content-Type", "application/json");
		    		        },
		    		        success: function(foodDetail) {
		    		        	$("#createSuccess").html("<div class=\"alert alert-success\">" +
		    		        			+foodname+" đã thêm vào cơ sở dữ liệu."+
		    		        			"</div>");
		    		        }
		    		});
		        	
		        }
		});

		
	});
	$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});
	$('.imagelink').focusout(function(){
		$('#imageFood').attr("src",$('#txtImage').val());
		$('#imageFood').attr("src",$('#txtImageLink').val());
		$("#imageZoom").attr("href", $('#txtImageLink').val());
		$("#imageZoom").attr("href", $('#txtImage').val());
	});
	$('.imagelink').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	    	$('#imageFood').attr("src",$('#txtImage').val());
	    	$('#imageFood').attr("src",$('#txtImageLink').val());
	    	$("#imageZoom").attr("href", $('#txtImage').val());
	    	$('#imageZoom').attr("href",$('#txtImageLink').val());
	    }
	});
	$('.imagelink').focus(function() {
		   $(this).select();
		});
	$("#btnNewCatelogue").click(function(){
		$("#myModalCatelogue").modal();
	});
	$('#data-table-1').on('click', '.btn-danger',function(e){ 
		var foodID=$(this).attr('value');
		$.ajax({
			url: "/iCook/deleteFood?txtFoodID="+foodID,
			type: "GET",
			success: function(food) {
				alert(food);
				$(this).closest("tr").remove();
			}
		});
	    $(this).closest("tr").remove();
	});
	$('#data-table-1').on('click', '.btn-warning',function(e){
		
		var foodID=$(this).attr('value');
		$.ajax({
	        url: "/iCook/getFoodID?txtFoodID="+foodID,
	        type: "GET",
	        success: function(category) {
	        	$("#txtID").val(category.foodId);
//	   
	        	$("#txtView").val(category.visitNum);
	        	$("#cbbCategory").val(category.categoryId);
	        	$('.imagelink').val(category.linkImage);
	        	$("#imageZoom").attr("href", category.linkImage);
	        	$('#imageFood').attr("src",category.linkImage);
	        	$("#myModal .modal-title").html('<b>'+category.foodName+'</b>');
	        	$("#myModal .modal-body .foodName").val(category.foodName);
	        	$("#myModal .modal-body #txtDescription").html(category.description);
	        	$("#myModal .modal-body #txtMaterial").html(category.listMaterial);
	        	$("#txtUser").val(category.userID);
	        	$.ajax({
	    	        url: "/iCook/getFoodDetail?txtFoodID="+foodID,
	    	        type: "GET",
	    	        success: function(foodDetail) {
	    	        	$("#myModal .modal-body #txtContent").html(foodDetail.tutorial);
	    	        	$("#myModal .modal-body #txtInfo").html(foodDetail.materialDetail);
	    	        	
	    	        	$("#txtSource").val(foodDetail.source);
	    	        	$("#myModal").modal();
	    	        }
	    	    });
	        	   
	        	   
	        }
	    });
		
	});
	function loadCatalog(){
		$.ajax({
	        url: "/iCook/getCategory",
	        type: "GET",
	        success: function(category) {
	            for (var i = 0; i < category.length; i++) {
		            $('#cbbCategory').append($("<option/>", {
		                value: category[i].categoryId,
		                text: category[i].categoryName
		            }));

				}
	                   
	        }
	    });
	}
	
	$('#btnSaveChange').click(function(){
		var food = JSON.stringify({
			"foodId" :$("#txtID").val(),
		    "foodName" : $('#txtFoodName').val() ,
		    "description": $('#txtDescription').val() , 
		    "linkImage": $('#txtImage').val(), 
		    "listMaterial": $('#txtMaterial').val(), 
		    "categoryId": $( "#cbbCategory option:selected" ).val(),
		    "visitNum": $( "#txtView" ).val()
		});
		var foodDetail = JSON.stringify({
			"foodID" :$("#txtID").val(),
		    "tutorial": $('#txtContent').val(),
		    "materialInfo": $('#txtInfo').val(), 
		    "source": $("#source").val(),
		    "user": $("#txtUser").val()
		});
		$.ajax({
			 url: "/iCook/updateFood", 
			 type: 'POST', 
			 dataType: 'json',
			 data: (food), 
			 beforeSend: function(xhr) {
		            xhr.setRequestHeader("Accept", "application/json");
		            xhr.setRequestHeader("Content-Type", "application/json");
		        }, 
			 success: function(newfood) { 
				 $.ajax({
					 url: "/iCook/updateFoodDetail", 
					 type: 'POST', 
					 dataType: 'json',
					 data: (foodDetail), 
					 beforeSend: function(xhr) {
				            xhr.setRequestHeader("Accept", "application/json");
				            xhr.setRequestHeader("Content-Type", "application/json");
				        }, 
					 success: function(newfoodDetail) { 
					 		alert(newfood.foodName + " updated đã cập nhật vào cơ sở dữ liệu." );
					    } 
				});
			    } 
		});
	});
 	$("#btnSaveCatelog").click(function(){
 		var dat = JSON.stringify({
			"categoryName" :$("#txtCatelog").val()
		});
 		$.ajax({
			 url: "/iCook/createCaltalogue", 
			 type: 'POST', 
			 dataType: 'json',
			 data: (dat), 
			 beforeSend: function(xhr) {
		            xhr.setRequestHeader("Accept", "application/json");
		            xhr.setRequestHeader("Content-Type", "application/json");
		        }, 
			 success: function(catelog) { 
				 if(catelog!= null){
			 		alert(catelog.categoryName + " updated đã cập nhật vào cơ sở dữ liệu." );
			 		$('#cbbCategory').append($("<option/>", {
		                value: catelog.categoryId,
		                text: catelog.categoryName
		            }));
			 		
				 }
				
			  },
			  error: function (request, status, error) {
			        alert($("#txtCatelog").val()+" đã tồn tại trong cơ sở dữ liệu.");
			    }
		      
		});
 	});
	    loadCatalog();
	    $('select').on('change', function (e) {
	        var optionSelected = $("option:selected", this);
	        var valueSelected = this.value;
	    	var oTable = $('#data-table-1').DataTable();
	    	if (valueSelected == 0) {
	    		oTable.search( 'Đã duyệt' ).draw();
	    		oTable.search( '', true );
			}
	    	if (valueSelected == 1) {
	    		oTable.search( 'Đang xử lý' ).draw();
	    		oTable.search( '', true );
			}
	    	
	    });
	});