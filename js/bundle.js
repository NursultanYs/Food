/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    const result = document.querySelector('.calculating__result span');

    let sex,height,weight,age,ratio;

    if(localStorage.getItem('sex')){
        sex=localStorage.getItem('sex');
    }else{
        sex='female';
        localStorage.setItem('sex','female');
    }

    if(localStorage.getItem('ratio')){
        ratio=localStorage.getItem('ratio');
    }else{
        ratio='female';
        localStorage.setItem('ratio',1.375);
    }

    function initLocalSettings(selector,activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem=>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id')===localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');
    

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent='____'; 
            return;
        }
        if(sex==='female'){
            result.textContent=Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio);
        }else{
            result.textContent=Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*ratio);
        }
    }

    calcTotal();

    function getStaticInformation (selector,activeClass){
        const elements=document.querySelectorAll(selector);
        
        elements.forEach(elem=>{
            elem.addEventListener('click',(e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio=+e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                }else{
                    sex=e.target.getAttribute('id');
                    localStorage.setItem('sex',e.target.getAttribute('id'));
                }
    
                console.log(ratio,sex);
    
                elements.forEach(e=>{
                    e.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass);
                calcTotal();
    
            });
        })
    }

    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input=document.querySelector(selector);

        input.addEventListener('input',()=>{

            if(input.value.match(/\D/g)){
                input.style.border='1px solid red';
            }else{
                input.style.border='none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height=+input.value;
                    break;
                case 'weight':
                    weight=+input.value;
                    break;
                case 'age':
                    age=+input.value;
                    break;
            }
            calcTotal();
        })
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports=calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    // const menucontainer=document.querySelector('[data-menu]')

    // class Menuitem{
    //     constructor(img,subtitle,descr,total){
    //         this.img=img;
    //         this.subtitle=subtitle;
    //         this.descr=descr;
    //         this.total=total;
    //         this.transfer=27;
    //         // this.changetoUAH();
    //     }
    //     changetoUAH(){
    //         this.total=+this.total*this.transfer;
    //     }
    //     put(){
    //         menucontainer.innerHTML+=`<div class="menu__item">
    //         <img src=${this.img} alt="vegy">
    //         <h3 class="menu__item-subtitle">${this.subtitle}</h3>
    //         <div class="menu__item-descr">${this.descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
    //         </div>
    //         </div>`
    //     }
    // }
    // const firstMenuItem=new Menuitem('img/tabs/vegy.jpg','Меню "Фитнес"',
    // 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',229);
    // const secontMenuItem=new Menuitem("img/tabs/elite.jpg",'Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',550)
    // const thirdMenuItem=new Menuitem("img/tabs/post.jpg",'Меню "Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',430)

    // firstMenuItem.put();
    // secontMenuItem.put();
    // thirdMenuItem.put();
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getCard= async (url)=>{
        const res= await fetch(url)

        if(!res.ok){
           throw new Error(`Could not fetch ${url},status:${res.status}`)
        }

        return await res.json();
    }

    // getCard('http://localhost:3000/menu')
    //     .then(data=>{
    //         data.forEach(({img,altimg,title,descr,price})=>{
    //             new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data=>{
                    data.data.forEach(({img,altimg,title,descr,price})=>{
                        new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
                    })});

    // getCard('http://localhost:3000/menu')
    // .then(data=>createCard(data));
     
    // function createCard(data){
    //     data.forEach(({img,altimg,title,descr,price})=>{
    //         const element=document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML=`
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `
    //         document.querySelector('.menu .container').append(element);
    //     })
    // }
    
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item"
    // ).render();

}

module.exports=cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms(){
    
    const forms = document.querySelectorAll('form');

    const messages = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(form => {
        bindPostData(form);
    })

    const postData= async (url,data)=>{
        const res= await fetch(url,{
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src=messages.loading;
            statusMessage.style.cssText=`
                display:block;
                margin:0 auto;
            `;
            form.insertAdjacentElement('afterend',statusMessage);



            const formData = new FormData(form);

            // const object={};
            // formData.forEach(function(value,key){
            //     object[key]=value;
            // })
             const json=JSON.stringify(Object.fromEntries(formData.entries()));



            postData('http://localhost:3000/requests',json) //JSON.stringify(object))
            .then(data=>{
                console.log(data)
                showThanksModal(messages.succes);
                form.reset ();
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(messages.failure);
                statusMessage.remove(); 
            })

        });
    }
    const thanksModal=document.createElement('div');

    function showThanksModal(messages){
        const previousMidalDialog=document.querySelector('.modal__dialog');

        previousMidalDialog.classList.add('hide');
        openModal();

        
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${messages}</div>
            </div>
        `;

        modal.append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            previousMidalDialog.classList.add('show');
            previousMidalDialog.classList.remove('hide');
            closeModal();
        },4000)
    }
    
    // fetch('http://localhost:3000/menu').then(data=>data.json()).then(res=>console.log(res));
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method:"POST",
    //     body: JSON.stringify({name:'Alex'}),
    //     headers:{
    //         'Content-type':'application/json'
    //     }  
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));
}

module.exports=forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
    const openBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal')

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
    window.removeEventListener('scroll', openByScroll);
}


function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

openBtn.forEach(btn => {
    btn.addEventListener('click', openModal)
})

const modalTimerId = setTimeout(openModal, 180000);


modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close')=='') {
        closeModal()
    }
})

document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal()
    }
})

function openByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
    }
}

window.addEventListener('scroll', openByScroll);
}


module.exports=modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
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

    const   slides = document.querySelectorAll('.offer__slide'),
            slider=document.querySelector('.offer__slider'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper=document.querySelector('.offer__slider-wrapper'),
            slidesField=document.querySelector('.offer__slider-inner'),
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

module.exports=slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

module.exports=tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    const deadline = '2023-06-01';

    function getTimeRemaining(endtime) {
        let days, seconds, minutes, hours;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
        } else {
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60) % 24));
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports=timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

// window.addEventListener('DOMContentLoaded',()=>{
//     const taBBtns=document.querySelectorAll('.tabheader__item'),
//           tabs=document.querySelectorAll('.tabcontent'),
//           tabBtns=Array.from(taBBtns);
//     hideTab();
//     showTab(0)
//     function pressBtn(){
//         tabBtns.forEach(e=>{
//             e.addEventListener('click',tab=>{
//                 if(!tab.target.classList.contains('tabheader__item_active')){
//                     tabBtns.forEach(e=>{
//                         e.classList.remove('tabheader__item_active');
//                     })
//                     hideTab()
//                     tab.target.classList.add('tabheader__item_active')
//                     tab.target.classList.add('show', 'fade');
//                     tab.target.classList.remove('hide');
//                     showTab(tabBtns.indexOf(e));
//                 }
//             })
//         })
//     }

//     function hideTab(){
//         tabs.forEach(e=>{
//             e.style.display='none';
//         })
//     }
//     function showTab(i){
//         tabs[i].style.display='block';
//     }  
//     pressBtn(); 
// })
window.addEventListener('DOMContentLoaded', function () {

    const tabs=__webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal=__webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer=__webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider=__webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          forms=__webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          cards=__webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc=__webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    modal();
    timer();
    slider();
    forms();
    cards();
    calc();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map