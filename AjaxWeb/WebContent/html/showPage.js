/**
 * showPage.js
 */

function showPage(){
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);
	
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border','1');
	tableTag.style.textAlign = 'center';
	
	
	let headerTr = titleRow(data); //data:실제넣는 값
	let dataTr = contentRow(data); 
	tableTag.appendChild(headerTr);
	for(let i=0; i<dataTr.length; i++){
		tableTag.appendChild(dataTr[i]);
	}
	
	document.getElementById('show').appendChild(tableTag);
	
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
		let textNode = document.createTextNode('처리');
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);
	return trTag;
}

function contentRow(result){
	let trTags =[];
	for(let j=0; j<result.length ; j++){
		let trTag = document.createElement('tr');
			for(let i=0; i<result[0].childNodes.length; i++){
				let tdTag = document.createElement('td');
				let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
				tdTag.appendChild(textNode);
				trTag.appendChild(tdTag);
		}
		
		//임의로 버튼 생성 
		let button = document.createElement('button');
		button.innerHTML = "삭제";
		button.onclick = function(){
			console.log(this.parentNode.parentNode.remove()); //이벤트가 발생되는 element : this / 여기서는 button을 의미한다.
			let id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
			let req = new XMLHttpRequest();
			req.open('get','../deleteEmp?empId='+ id);
			req.send();
			req.onload = function(){
			console.log(req.responseText);
			}
		}
		let tdTag = document.createElement('td');
		tdTag.appendChild(button);
		trTag.appendChild(tdTag);
		
		trTags.push(trTag);
	}
		return trTags;
}