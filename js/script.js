'use strict'
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
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import { openModal} from './modules/modal';
window.addEventListener('DOMContentLoaded', function () {

    const modalTimerId=setTimeout(()=>openModal('.modal',modalTimerId),300000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal',modalTimerId);
    timer('.timer');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms('form',modalTimerId);
    cards();
    calc();
});


