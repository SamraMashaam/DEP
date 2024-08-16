document.addEventListener('DOMContentLoaded', function(){

    const allbuttons = document.querySelectorAll('.search');
    const searchbar = document.querySelector('.sbar');
    const searchinput = document.getElementById('searchInput');
    const searchclose = document.getElementById('searchClose');

    for( var i = 0; i < allbuttons.length; i++ ){
        allbuttons[i].addEventListener('click', function(){
            searchbar.style.visibility = 'visible';
            searchbar.classList.add('open');
            this.setAttribute('aria-expanded','true');
            searchinput.focus();
            
        });
    }

    searchclose.addEventListener('click', function(){
        searchbar.style.visibility = 'hidden';
        searchbar.classList.remove('open');
        this.setAttribute('aria-expanded','false');
    });
});