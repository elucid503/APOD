function getFormattedDate() {
    const date = new Date();
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Add the appropriate ordinal suffix for the day
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
  
    return `${month} ${day}${suffix}, ${year}`;
  }

function global() { 

    // Resize Listeners

    $(window).on('resize', updateNavbarText);

    function updateNavbarText() {

        let date = new Date().getFullYear();
        
        let windowWidth = $(window).width();
        
        let navbarBrand = $('.navbar-brand');
      
        if (windowWidth <= 900) {
          
            navbarBrand.html(`${$('.navbar-brand').attr('data-minified')}<span>${getFormattedDate()}</span>`);
        
        } else {
         
            navbarBrand.html(`Astronomy Picture of the Day<span>${getFormattedDate()}</span>`);
        
        }
    }

    updateNavbarText();
      
    // Navbar Toggler

    document.getElementById('navbar-toggler').addEventListener('click', function () {

        $('.nav-list').toggleClass('show');

    });

    document.addEventListener('click', function (e) {

        if ($('.nav-list').hasClass('show') && !e.target.classList.contains('nav-link') && !e.target.classList.contains('bx')) {

            $('.nav-list').removeClass('show');

        }


    });

}