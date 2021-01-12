$(function(){
    //ajax 호출
    $.ajax({
        url: '../data/MOCK_DATA.json',//문자열로 호출할 페이지
        dataType: 'json',
        success: showContent,
        error: function(result){ //success와 반대 
            console.log('에러: '+result.statusText);
        } 
    });
    //button click event
    $('#btn').on('click',function(){
        $('input:checked').parent().parent().remove();
    });
    
    //all check event (live event)
    $('body').on('click','#all_check',function(){
        console.log('checked');
        $('td>input').prop('checked',$('#all_check').is(":checked"));
    });

	$('body').on('click','#ckb',function(){
		console.log('single_checked');
		let checked = $(this).is(':checked');
		if(!checked){
			$('#all_check').prop("checked",false);
		}
	});
	$('body').on('click','#ckb',function(){
		let is_checked  = true;
		$('#ckb').each(function(){
			is_checked = is_checked && $(this).is(':checked');
		})
		$('#all_check').prop('checked', true);
	});

});

function showContent(result){
    //정상적으로 실행될 callback함수
           let headers = ['chkbox','id','first_name','last_name','email'];
           let data = result;
           let table = $('<table id="tbl" />').attr('border','2');
           let title = $('<tr />'.toUpperCase());
           for( field of headers){
               let thTag=$('<th />');
               if(field == 'chkbox'){
                    $(thTag).html($('<input id="all_check"/>').attr('type','checkbox'));
               } else {
                   thTag.html(field.replace('_','').toUpperCase());
            }
            title.append(thTag);
           }
           table.append(title);
           $(data).each(function(idx,obj){
               if(idx < 5 ){ 
               let tr = $('<tr />').attr('align','center');
               $(tr).attr('id',obj.id);
               $(tr).on({
               'mouseover': function(){
                   $(this).css('background-color','pink');
               },
               'mouseout': function(){
                   $(this).css('background-color','');}
               });
               for(field of headers){
                   let td = $('<td />');
                   if(field == 'chkbox'){
					
                    let checkbox = $('<input />').attr('type','checkbox').attr('id','ckb');
					checkbox.addClass('singleChecked');
                                    td.append(checkbox);
                    
                   }else {
                       td.html(obj[field]);
                   }
                   tr.append(td);
               }
               table.append(tr);
            }
           })
           $('#show').append(table);
        //    $('#all_check').on('click',function(){
        //     console.log('checked');
        // });
   
}