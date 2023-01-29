function slider({container,slide,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){
      // Sliders

    // const prev=document.querySelector('.offer__slider-prev'),
    //       next=document.querySelector('.offer__slider-next'),
    //       slides=document.querySelectorAll('.offer__slide'),
    //       current=document.querySelector('#current'),
    //       total=document.querySelector('#total');
    // let slideNumber=1;
    // let slideNumberPrev=1;

    // function hideSlides(number){
    //     slides.forEach(img=>{
    //         img.classList.add('hide');
    //     })
        
    //     if(number===0){
    //         slides[slides.length-1].classList.remove('hide');
    //     }else{
    //         slides[number-1].classList.remove('hide');
    //     }
    // }
    // current.textContent=getZero(slideNumber)
    // total.textContent=getZero(slides.length);

    // hideSlides(slideNumber);

    // function nextSlide(){
    //     next.addEventListener('click',()=>{
    //         slideNumber+=1;
    //         current.textContent=getZero(slideNumber)
    //         if(slideNumber===slides.length){
    //             slideNumber=0;
    //         }
    //         hideSlides(slideNumber);
    //     })
    // }
    // function previousSlide(){
    //     prev.addEventListener('click',()=>{
    //         slideNumberPrev-=1;
    //         if(slideNumberPrev<1){
    //             slideNumberPrev=slides.length;
    //         }
    //         current.textContent=getZero(slideNumberPrev)
    //         hideSlides(slideNumberPrev)
    //     })
    // }
    // nextSlide();
    // previousSlide();    

    const   slides = document.querySelectorAll(slide),
            slider=document.querySelector(container),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper=document.querySelector(wrapper),
            slidesField=document.querySelector(field),
            width=window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset=0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent=`0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent=slideIndex;
    }

    slidesField.style.width=100*slides.length+'%';
    slidesField.style.display='flex';
    slidesField.style.transition='0.5s all';

    slidesWrapper.style.overflow='hidden';

    slides.forEach(slide=>{
        slide.style.width=width;
    })

    slider.style.position='relative';

    const indicators=document.createElement('ol'),
          dots=[];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    for(let i=0; i<slides.length; i++){
        const dot=document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);  
        dot.classList.add('dot');
        if (i==0){
            dot.style.opacity=1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    dots.forEach(dot=>{
        dot.addEventListener('click',(e)=>{
           const slideTo=e.target.getAttribute('data-slide-to');
           slideIndex=slideTo;
           offset=+width.replace(/\D/g,'')*(slideTo-1);
           slidesField.style.transform=`translateX(-${offset}px)`;
           if(slides.length<10){
                current.textContent=`0${slideIndex}`;
            }else{
                current.textContent=slideIndex;
            }
            dots.forEach(dot=>dot.style.opacity='.5')
            dots[slideIndex-1].style.opacity=1;
        })
    })

    function deleteNotDigits(str){
        return +str.replace(/\D/g,'');
    }

    next.addEventListener('click',()=>{
        if(offset==deleteNotDigits(width)*(slides.length-1)){
            offset=0; 
        }else{
            offset+=deleteNotDigits(width);
        }
        slidesField.style.transform=`translateX(-${offset}px)`;

        if(slideIndex==slides.length){
            slideIndex=1;
        }else{
            slideIndex++;
        }
        if(slides.length<10){
            current.textContent=`0${slideIndex}`;
        }else{
            current.textContent=slideIndex;
        }

        dots.forEach(dot=>dot.style.opacity='.5')
        dots[slideIndex-1].style.opacity=1;
    })
    prev.addEventListener('click',()=>{
        if(offset==0){
            offset=deleteNotDigits(width)*(slides.length-1) 
        }else{
            offset-=deleteNotDigits(width);
        }
        slidesField.style.transform=`translateX(-${offset}px)`;

        if(slideIndex==1){
            slideIndex=slides.length;
        }else{
            slideIndex--;
        }
        if(slides.length<10){
            current.textContent=`0${slideIndex}`;
        }else{
            current.textContent=slideIndex;
        }
        dots.forEach(dot=>dot.style.opacity='.5')
        dots[slideIndex-1].style.opacity=1;
    })
}

export default slider;