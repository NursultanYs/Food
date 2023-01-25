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
window.addEventListener('DOMContentLoaded', function () {

    const tabs=require('./modules/tabs'),
          modal=require('./modules/modal'),
          timer=require('./modules/timer'),
          slider=require('./modules/slider'),
          forms=require('./modules/forms'),
          cards=require('./modules/cards'),
          calc=require('./modules/calc');

    tabs();
    modal();
    timer();
    slider();
    forms();
    cards();
    calc();
});
