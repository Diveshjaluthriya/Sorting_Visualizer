let sizeofarr=80,speed=500;
function makebars(){
	function randomnum(){
	return Math.floor((Math.random()*100))+1;
}
let arr=[]; 
for(let i=1;i<=sizeofarr;i++){
	arr.push(randomnum());
}

let bars=document.getElementById("bars");

if((bars.childNodes).length>0){
	let tmp=(bars.childNodes).length;
for(let i=1;i<=tmp;i++){
	bars.removeChild(bars.childNodes[0]);        //removeChild()

}}
for(let i=1;i<=sizeofarr;i++){
	let elem=document.createElement("div");
	elem.classList.add("indbars");
	elem.style.height=`${2*arr[i-1]}px`; elem.style.width="9px";
    bars.appendChild(elem);
}
}

makebars();

let newarraybtn=document.getElementById("newarraybtn");
newarraybtn.addEventListener("click",function (){
makebars();
})
function swap(elem1,elem2){
	let style1=window.getComputedStyle(elem1);   //window.getComputedStyle  , Window
    let style2=window.getComputedStyle(elem2);   
    let h1=style1.getPropertyValue("height"),h2=style2.getPropertyValue("height");  //getPropertyValue
    elem1.style.height=h2; elem2.style.height=h1;
}
function compare(h1,h2){
	let h1val=0,h2val=0;
	let i=h1.length-3; let mul=1;
	while(i>=0){
		h1val+=(h1[i]-'0')*mul; i--; mul*=10;
	}
	i=h2.length-3;  mul=1;
	while(i>=0){
        h2val+=(h2[i]-'0')*mul; i--; mul*=10;
	}
	 
	if(h1val>h2val){return true;}
	else{return false;}
}
 function take2sec(){
 	return new Promise((resolve,reject)=>{
 		setTimeout(()=>{
 			resolve();
 		},speed)
 	})
 }
  function take1sec(){
 	return new Promise((resolve,reject)=>{
 		setTimeout(()=>{
 			resolve();
 		},speed)
 	})
 }
 async function bubsorfun(){
	for(let i=0;i<sizeofarr;i++){
		for(let j=1;j<sizeofarr;j++){
			let elem1=bars.childNodes[j-1],elem2=bars.childNodes[j];
			elem1.style.background="red"; elem2.style.background="red";
             await take2sec();
            let style1=window.getComputedStyle(elem1);  
            let style2=window.getComputedStyle(elem2);   
            let h1=style1.getPropertyValue("height"),h2=style2.getPropertyValue("height");
			if(compare(h1,h2)){
				swap(elem1,elem2);
			}
			await take1sec();
			elem1.style.background="#283bac"; elem2.style.background="#283bac";	
		}
	}
}
//In selection sort function even if we make timer to be 0 sec then it take some time why is this
//so ,if we comment the timer then it happend suddenly
async function selsorfun(){
	for(let i=0;i<sizeofarr-1;i++){
		let minind=i; 
		
		for(let j=i+1;j<sizeofarr;j++){
        let elem1=bars.childNodes[minind]; let style1=window.getComputedStyle(elem1);
        let elem2=bars.childNodes[j]; let style2=window.getComputedStyle(elem2);
        let h1=style1.getPropertyValue("height"),h2=style2.getPropertyValue("height");
        elem2.style.background="red"; elem1.style.background="red";
        await take1sec();
        if(compare(h1,h2)){
        	elem1.style.background="#283bac"; minind=j;
        	bars.childNodes[minind].style.color="red";
        }
        else{elem2.style.background="#283bac";}
		}
        await take1sec();
		swap(bars.childNodes[i],bars.childNodes[minind]);
		bars.childNodes[i].style.background="#283bac"; bars.childNodes[minind].style.background="#283bac";
        
	}
}
// In JavaScript array and Object follows pass by reference property.
let bubsort=document.getElementById("bubsort");
bubsort.addEventListener("click",()=>{
	disableallbtns();
	bubsorfun()
	.then(()=>{enableallbtns();});
	
});

let selsort=document.getElementById("selsort");
selsort.addEventListener("click",()=>{
	disableallbtns();
	selsorfun()
	.then(()=>{enableallbtns();});
	
});

let submit=document.querySelector("#submit");
submit.addEventListener("click",()=>{
	let input1=document.querySelectorAll("input")[0];
	sizeofarr=input1.value;
	let input2=document.querySelectorAll("input")[1];
	speed=input2.value;
	makebars();
})



async function insersortfun(){
	for(let i=1;i<sizeofarr;i++){
		
		let j=i;
	    while(j>=1){
			let elem1=bars.childNodes[j],elem2=bars.childNodes[j-1];
			let style1=window.getComputedStyle(elem1),style2=window.getComputedStyle(elem2);
			let h1=style1.getPropertyValue("height"),h2=style2.getPropertyValue("height");
			elem1.style.background="red"; elem2.style.background="red";
			await take2sec();
			if(compare(h2,h1)){
              elem1.style.height=h2; elem2.style.height=h1;
			 await take2sec();
			  elem1.style.background="#283bac"; elem2.style.background="#283bac";
			}
			else{
				await take2sec();
				elem1.style.background="#283bac"; elem2.style.background="#283bac";
				break;}
			j--;
		}
	}
	return "resolved";
}

let insesort=document.getElementById("insesort");
insesort.addEventListener("click",()=>{
	disableallbtns();
	insersortfun()
	.then(()=>{enableallbtns();});
	
})

// JavaScript function definitions do not specify data types for parameters.

function tonum(hei){
	let h=0;
	let i=hei.length-3; let mul=1;
	while(i>=0){
		h+=(hei[i]-'0')*mul; i--; mul*=10;
	}
	return h;
}

//If i am not using marginTop correctly in mergeleft and mergeright individual elements then the mergeleft and mergeright are moving up
// and down

async function merge(begin,mid,end){
      
		let mergeleft=document.getElementById("mergeleft"),mergeright=document.getElementById("mergeright");

		mergeleft.innerHTML="";  mergeright.innerHTML="";  //remove child alternative
		
		for(let i=begin;i<=mid;i++){
			await take2sec();
			let elem=document.createElement("div"); elem.classList.add("indbars");
			let barele=bars.childNodes[i]; let barelesty=window.getComputedStyle(barele);
			barele.style.background="red"; await take2sec(); let heig=barelesty.getPropertyValue("height");
			elem.style.height=barelesty.getPropertyValue("height"); elem.style.width="9px";
			elem.style.marginTop=`${220-tonum(heig)}px`;
			mergeleft.appendChild(elem);
			await take2sec();
			barele.style.background="#283bac";
			
		}
		for(let i=mid+1;i<=end;i++){
			await take2sec();
			let elem=document.createElement("div"); elem.classList.add("indbars");
			let barele=bars.childNodes[i]; let barelesty=window.getComputedStyle(barele);
			barele.style.background="red"; await take2sec();  let heig=barelesty.getPropertyValue("height");
			elem.style.height=barelesty.getPropertyValue("height"); elem.style.width="9px"; 
			elem.style.marginTop=`${220-tonum(heig)}px`;
			mergeright.appendChild(elem);
			await take2sec();
			barele.style.background="#283bac";
			// throw new Error("Something went badly wrong!");
		}
		let k=begin,i=0,j=0; 
	
		while(i<mid-begin+1 && j<end-(mid+1)+1){
			await take2sec();
		   let left=mergeleft.childNodes[0],right=mergeright.childNodes[0];
		     let leftsty=window.getComputedStyle(left),rightsty=window.getComputedStyle(right);
		     let lh=leftsty.getPropertyValue("height"),rh=rightsty.getPropertyValue("height");
			
		   if(compare(lh,rh)){
				let elembar=bars.childNodes[k]; elembar.style.height=rh; j++; k++;  mergeright.removeChild(right);
		   }
		   else{
			let elembar=bars.childNodes[k]; elembar.style.height=lh; i++; k++;   mergeleft.removeChild(left);
		   }
		   await take2sec();
		}
	     while(i<mid-begin+1){
			 await take2sec();
			let left=mergeleft.childNodes[0]; let leftsty=window.getComputedStyle(left);
			let lh=leftsty.getPropertyValue("height");
			 let elembar=bars.childNodes[k]; elembar.style.height=lh; i++; k++;  mergeleft.removeChild(left);
			await take2sec();
		 }
		while(j<end-(mid+1)+1){
			await take2sec();
			let right=mergeright.childNodes[0]; let rightsty=window.getComputedStyle(right);
			let rh=rightsty.getPropertyValue("height");
			let elembar=bars.childNodes[k]; elembar.style.height=rh; j++; k++;  mergeright.removeChild(right);
			await take2sec();
		}
	
	mergeleft.innerHTML="";  mergeright.innerHTML="";
	return "resolved";
}


async function mergesort(begin,end){
	
	if(begin>=end){return;}
	let mid=begin+Math.floor((end-begin)/2);
	await mergesort(begin,mid); await mergesort(mid+1,end);
   await merge(begin,mid,end);
}

async function mergesortfun(){
	disableallbtns();
	await mergesort(0,sizeofarr-1); enableallbtns();
}

let mersort=document.getElementById("mersort");
mersort.addEventListener("click",()=>{
	mergesortfun();  
})


function disableallbtns(){
	let allbtns=document.getElementById("allbtns");
	for(let i=0;i<allbtns.childNodes.length;i++){
		allbtns.childNodes[i].disabled=true;
	}
}

function enableallbtns(){
	let allbtns=document.getElementById("allbtns");
	for(let i=0;i<allbtns.childNodes.length;i++){
		allbtns.childNodes[i].disabled=false;
	}
}