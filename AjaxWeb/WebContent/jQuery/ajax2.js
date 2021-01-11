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
        // if($('#all_check').is(":checked")) {
        // $('td > input').prop('checked',true);
        // } else {
        // $('td > input').prop('checked',false);
        // }
    });
    // $('body').on('click',$('td>input').is(':checked'),function(){
    //     if($('#contents>input').is(':checked')==true){
    //         console.log('all checked');
    //     }
    // })
    $('#show').on('click','#checkbox',function(){
        if(($('#checkbox').is(':checked'))){
            console.log('true');
            } else {
                console.log('false');
            }
    })
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
               let tr = $('<tr />').attr('align','center').attr('id','contents');
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
                    let checkbox = $('<input />').attr('type','checkbox');
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