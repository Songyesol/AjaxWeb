/**
 * showPage.js
 */

function showPage(){
	console.log(xhtp.responseXML);
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	
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
	
/*	let thTag = document.createElement('th');
		let textNode = document.createTextNode('처리');
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);*/
	return trTag;
}

function contentRow(result){
	let trTags =[];
	for(let j=0; j<result.length ; j++){
		let trTag = document.createElement('tr');
	trTag.onmouseover = function(){
			this.style.background = 'yellowgreen';
		}
		trTag.onmouseout = function() {
			this.style.background = '';
		}
		trTag.onclick = function() {
			let no = document.getElementById('brdNo');
			let title = document.getElementById('title1');
			let content = document.getElementById('content1');
			let writer = document.getElementById('writer1');
			
			no.value = this.childNodes[0].firstChild.nodeValue;
			title.value = this.childNodes[1].firstChild.nodeValue;
			content.value = this.childNodes[2].firstChild.nodeValue;
			writer.value = this.childNodes[3].firstChild.nodeValue;			
		}
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

