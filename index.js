const TypeWriter = function(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {

    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current]; //current targeting the current words in this.words;
    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);//removing
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);//adding chaaracter
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }
    if(!this.isDeleting && this.txt === fullTxt) {
        //make pause at end
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ""){
        this.isDeleting = false;
        //moving to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
}
//init dom load
document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    //initialize typwrite
    new TypeWriter(txtElement, words, wait);
}
