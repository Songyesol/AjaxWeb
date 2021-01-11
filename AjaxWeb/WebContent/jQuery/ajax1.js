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
    //button 이벤트
    $('#btn').click(addRow);
    //찾기 이벤트 
    $('#findBtn').on('click',findRow)
    });

function findRow() {
    let findId= $('#find_id').val();//값을 가져오고 싶으면 val(), 대입하고 싶으면 괄호안에 넣을 내용 넣기
    let findRow =  $('#'+findId+'').css('background-color','skyblue'); 
    //신규 row 생성 
    let tr = makeNewTr();
    findRow.before(tr); 
}

function makeNewTr(){
        let inputs = $('.input_val');
        let tr = $('<tr />');
        $(tr).click(trToIntputFunc);
        $(tr).hover(function(){
            $(this).css('background-color','yellow'); //마우스오버 
        }, function() {
            $(this).css('background-color','');//마우스아웃
        });
    for( let i = 0; i<inputs.length ; i++){
    let td = $('<td />').html(inputs[i].value);
    tr.append(td);
    }
 let tdButton = $('<td />').html($('<button />').html('삭제'));
 $(tdButton).click(deleteFunc);
 tr.append(tdButton);
 return tr;
}

function addRow() {
        let tr = makeNewTr();
       $('#tbl').append(tr);
}

// function btnFunction() {
//     console.log($(this));
//     let id = $('#id').val(); 
//     let fName = $('#firstName').val();
//     let lName = $('#lastName').val();
//     let email = $('#email').val();
//     let tr = $('<tr />');
//     let tdId = $('<td />').html(id);
//     let tdFname=$('<td />').html(fName);
//     let tdlname=$('<td />').html(lName);
//     let tdEmail=$('<td />').html(email);
//     $('#tbl').append($(tr).append(tdId,tdFname,tdlname,tdEmail));
// }
function showContent(result){
     //정상적으로 실행될 callback함수
            let headers = ['id','first_name','last_name','email'];
            let data = result;
            let table = $('<table id="tbl" />').attr('border','2');
            let title = $('<tr />'.toUpperCase());
            for( field of headers){
                let thTag=$('<th />');
                thTag.html(field.toUpperCase());
                title.append(thTag);
            }
            let th = $('<th />').html('비고');
            title.append(th);
            
            table.append(title);
            $(data).each(function(idx,obj){
                if(idx < 5 ){ 
                let tr = $('<tr />');
                $(tr).attr('id',obj.id);
                $(tr).on({'click': trToIntputFunc,
                'mouseover': function(){
                    $(this).css('background-color','pink');
                },
                'mouseout': function(){
                    $(this).css('background-color','');}
                });
                for(field of headers){
                    let td = $('<td />');
                    td.html(obj[field]);
                    tr.append(td);
                }
                let tdButton = $('<td />').html($('<button />').html('삭제'));
                $(tdButton).click(deleteFunc);
                tr.append(tdButton);
                table.append(tr);
                }
            })
            $('#show').append(table);
    
}

function trToIntputFunc(){ 
    $('#id').val($(this).children().eq(0).html());
    $('#firstName').val($(this).children().eq(1).html());
    $('#lastName').val($(this).children().eq(2).html());
    $('#email').val($(this).children().eq(3).html());
    
}

function deleteFunc(){
    console.log($(this).parent().remove());
}