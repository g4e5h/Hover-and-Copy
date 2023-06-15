javascript: (function(){let copyArray=[];
let defaultTimeGap=850;
let debounce=debouncer(copyThat,defaultTimeGap);
let isEnabled=true;
let debounceTimer;


alert(" HOVER AND COPY \n Ctrl+Shift -> Enable/Disable and copy to clipboard\n Ctrl+Alt -> Reset Wait time \n Ctrl+MetaKey -> Remove Hover & Copy",4000);

document.addEventListener('keydown',enableDisableCopy,false);
document.addEventListener('mousemove',debounce,false);
document.addEventListener('scroll',debounce,false);

function enableDisableCopy(e){
    if(e.ctrlKey && e.shiftKey){
        if(!isEnabled){
        document.addEventListener('mousemove',debounce,false);
        document.addEventListener('scroll',debounce,false);
        customAlert("Copy Functionality Enabled!");
        isEnabled=!isEnabled;
       }else{
        disableMouseMoveAndScroll();
        copyToClipboard(copyArray.reduce((collected,single)=> `${collected}\n${single}`));
        copyArray=[];
        customAlert("Copied selected texts to clipboard and disabled copy! "+String.fromCharCode(9989),2000);
    }
       
    }else if(e.ctrlKey && e.altKey){
        let userInput=prompt("Enter wait time in seconds: \nExample:1s=1  5s=5 ");
        if(userInput==="" || userInput===null || !userInput){
            customAlert("Please set a value between 1s to 5s",1500);
        }
        else if(parseFloat(userInput)<1.00 || parseFloat(userInput)>5.00){
            customAlert("Please set a value between 1s to 5s",1500);
        }else{
            defaultTimeGap=parseFloat(userInput)*1000;
            debounce=debouncer(copyThat,defaultTimeGap);
            customAlert(`Wait time changed to ${defaultTimeGap/1000}s`+String.fromCharCode(9989),1500);
        }
    }else if(e.ctrlKey && e.metaKey){
       disableMouseMoveAndScroll();
        document.removeEventListener('keydown',enableDisableCopy,false);
         customAlert("Copy Functionality Removed!"+String.fromCharCode(9989));
    }
    }

function disableMouseMoveAndScroll(){
    clearTimeout(debounceTimer);
    document.removeEventListener('mousemove',debounce,false);
    document.removeEventListener('scroll',debounce,false);
    isEnabled=!isEnabled;
}

function copyThat(e){
    let copiedValue=e.target.innerText;
    if(copiedValue){
        copyArray.push(copiedValue);
        customAlert(`Copied ${copiedValue} `+String.fromCharCode(9989));
    }else{
        customAlert(`Please Try Again! `+String.fromCharCode(10060));
    }
}

function debouncer(func,delay) {
    return function() {
        const context=this;
        const args=arguments;
        clearTimeout(debounceTimer);
        debounceTimer=setTimeout(()=>func.apply(context,args),delay);
    }
}

async function copyToClipboard(text){
    if(text){await navigator.clipboard.writeText(text);};
}

function customAlert(msg,duration=1000){
    let styler=document.createElement("div");
    styler.setAttribute("style","font-weight:heavy;position:fixed;border:solid 1px White;width:auto;height:auto;padding:0.5em;top:15%;right:1.2%;background-color:Crimson;color:White;border-radius:15px 30px;font-family:Serif;z-index:5000");
    styler.innerHTML="<span>"+msg+"</span>";
    document.body.appendChild(styler);
    setTimeout(function(){styler.parentNode.removeChild(styler);},duration);
}})()