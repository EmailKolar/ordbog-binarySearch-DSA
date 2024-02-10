"use strict";
//test
window.addEventListener("DOMContentLoaded",start);
let globalArrayOfWords;
async function start(){
    const response = await fetch('data/ddo_fullforms_2023-10-11.csv'); 
    const rawtext = await response.text();
    
    globalArrayOfWords = rawtext.split("\n").map(line => {
        const parts = line.split("\t");
        return {
          variant: parts[0],
          headword: parts[1],
          homograph: parts[2],
          partofspeech: parts[3],
          id: parts[4]
        }
      });
      globalArrayOfWords.sort((a, b) => a.variant.localeCompare(b.variant));
    
}

function comparator(lookAt, lookFor){
   /* if(lookAt === lookFor){
        return 0;
    }else if(lookFor < lookAt){
        return -1;
    }else{
        return 1;
    }
    */
    return lookFor.localeCompare(lookAt);
}


function binarySearch(value, values){
    let start = 0;
    let end = values.length - 1;
    let num = -1;
    let running = true;
    while (running) {
        let middle = start + Math.floor((end - start) / 2);
        let compRes = comparator(values[middle].variant, value); 
        //console.log("cr"+compRes);
        //console.log("mid"+middle)
        if (compRes === 0) {
            num = middle;
            break;
        } else if (compRes < 0) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
        if (start > end) {
            running = false;
        }
    }
    return num;

}

 