function openModal(modalSelector,modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId);
    }

}


function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector,modalSelector,modalTimerId){
    const openBtn = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector)

openBtn.forEach(btn => {
    btn.addEventListener('click', ()=>openModal(modalSelector,modalTimerId))
})




modal.addEventListener('click', event => {
    if (event.target === modal || event.target.getAttribute('data-close')=='') {
        closeModal(modalSelector)
    }
})

document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector)
    }
})

function openByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal(modalSelector,modalTimerId);
        window.removeEventListener('scroll', openByScroll);
    }
}

window.addEventListener('scroll', openByScroll);
}


export default modal;
export {closeModal};
export {openModal};