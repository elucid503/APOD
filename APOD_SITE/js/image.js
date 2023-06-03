function loadPhoto() {

    let api = 'https://accelerated.sjparts.org/'

    $.ajax({
       
        url: api,
        type: 'GET',
        crossDomain: true,
        context: document.body,
       
        success: function (data) {

            let photo = $('.photo img');
            let photoInfo = $('.info')
            
            let header = { name: $('.header h1'), credit: $('.header h2') }
            
            header.name.html(data?.title);
            header.credit.html(data?.credit);
            photoInfo.html(`                
            
            <h2>Photo Info</h2> 
            <p>${data?.description}</p>`
            
            );

            if (data?.type !== 'image') {

                photo.html('Video is not yet supported.')
                
                // BETA: photo.html('<video autoplay loop muted playsinline><source src="' + data?.url + '" type="video/mp4"></video>')
                
                return

            }

            let imgURL = data?.url

            photo.attr('src', imgURL)

            let photoElement = document.querySelector('.photo img')

            photoElement.addEventListener('load', () => { 

                setTimeout(() => {

                    let canvas = $('#ambience')
    
                    canvas.css('opacity', '1')
    
                }, 750)    

            })

            actions()
            
        }
    })

    analytics()

}

function ambience() { 

    const canvas = document.getElementById('ambience');
    const img = document.querySelector('.photo img');
  
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      
        canvas.width = window.innerWidth / 0.7
        canvas.height = window.innerHeight / 0.925
    
    }

    function updateCanvas() { 

        canvas.style.animation = `CanvasAnimation 160s linear infinite`

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
                
        const radius = Math.max(canvas.width, canvas.height) / 2;
    
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(13, 13, 13, 1)');
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
    
    img.addEventListener('load', () => {
        resizeCanvas();
        updateCanvas();
    });
  
    window.addEventListener('resize', () => {
        resizeCanvas();
        updateCanvas();
    });

    resizeCanvas();
    updateCanvas();

}

function actions() { 

    let photoWrapper = $('.actions')
    let isActive = false

    photoWrapper.hover(
                
        () => {

            $('.action').css('opacity', '1')
            isActive = true 

         },
        
        () => { 

            $('.action').css('opacity', '0')
            isActive = false

        }
    
    )

    photoWrapper.click((e) => {

        let id = e.target.dataset.id

        if (id === 'external') { 

            window.open($('.photo img').attr('src'), '_blank')

        }

        else if (id === 'hide') { 

            let title = $('.container')
            let description = $('.container-info')

            title.fadeToggle(() => {

                description.fadeToggle(() => { 

                    let icon = $('.action[data-id="hide"]')

                    if (title.is(':visible')) { 
        
                        icon.html(`<i class='bx bx-hide' data-id="hide"></i>`)
        
                    }
        
                    else { 
        
                        icon.html(`<i class='bx bx-show' data-id="hide"></i>`)
        
                    }        

                })

             })
            
        }

        else { 

            if (!isActive) { 

                $('.action').css('opacity', '1')
                isActive = true

            }

            else { 

                $('.action').css('opacity', '0')
                isActive = false

            }

        }
        
    })

}
        
function analytics() { 

    $.ajax({
    type: "POST",
    url: "https://sproutlogs.xyz/service",
    context: document.body,
    data: JSON.stringify({ "service": "APOD", "page": "Home Page" }),
    contentType: "application/json" });    

}
