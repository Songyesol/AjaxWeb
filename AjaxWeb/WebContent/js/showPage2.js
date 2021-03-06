/**
 * showPage.js
 */

function showPage(){
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);
	
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border','1');
	tableTag.setAttribute('id','table');
	tableTag.style.textAlign = 'center';
	
	
	let headerTr = titleRow(data); //data:실제넣는 값
	let dataTr = contentRow(data); 
	tableTag.appendChild(headerTr);
	for(let i=0; i<dataTr.length; i++){
		tableTag.appendChild(addBtn(dataTr[i],delFunc));
	}
	
	document.getElementById('show').appendChild(tableTag);
	
}
function delFunc() {
	console.log(this.parentNode.parentNode.remove()); //-->화면에서 행삭제
	let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
	let xhtp = new XMLHttpRequest();
	let url = 'empId='+id;
	xhtp.open('post','../deleteEmp');
	xhtp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhtp.send(url);
/*	xhtp.open('get','../deleteEmp'); //--> ajax에 연결된 deleteEmp를 통해 db에 해당 행 삭제
	xhtp.send();*/
	xhtp.onload = function(){
		console.log(xhtp.responseText);
	}
}

function addBtn(tr,callBackFunc) {
	//button 추가 코드, 이벤트 등록
	let button = document.createElement('button');
	button.onclick = callBackFunc;
	button.innerHTML = '삭제';
	let tdTag= document.createElement('td');
	tdTag.appendChild(button);
	tr.appendChild(tdTag);
	return tr;
}

	
function titleRow(result){ //result = 매개변수
	console.log(result[0].childNodes[2].nodeName);
	let trTag = document.createElement('tr');
	for(let i=0; i<result[0].childNodes.length; i++){
		let thTag = document.createElement('th');
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);
	}
	let thTag = document.createElement('th');
	let txNode= document.createTextNode('비고');
	thTag.appendChild(txNode);
	trTag.appendChild(thTag);

	return trTag;
}

function mouseOver(){
	this.style.background = 'pink';
}
function mouseOut(){
	this.style.background = '';
}
function putData(){
	let eId = document.getElementById('eId');
	let fName = document.getElementById('fName');	
	let lName = document.getElementById('lName');
	let email = document.getElementById('email');
	let jobId = document.getElementById('jobId');
	
	eId.value = this.childNodes[0].firstChild.nodeValue;
	fName.value = this.childNodes[1].firstChild.nodeValue;
	lName.value = this.childNodes[2].firstChild.nodeValue;
	email.value = this.childNodes[3].firstChild.nodeValue;
	jobId.value = this.childNodes[5].firstChild.nodeValue;
}

function contentRow(result){
	let trTags =[];
	for(let j=0; j<result.length ; j++){
		let trTag = document.createElement('tr');
		let empId = result[j].childNodes[0].firstChild.nodeValue;
		trTag.setAttribute('id','emp_'+empId);		
		trTag.onmouseover = mouseOver;
		trTag.onmouseout = mouseOut;
		trTag.onclick = putData;
			for(let i=0; i<result[0].childNodes.length; i++){
				let tdTag = document.createElement('td');
				let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
				tdTag.appendChild(textNode);
				trTag.appendChild(tdTag);
		}
		trTags.push(trTag);
	}
		return trTags;
}