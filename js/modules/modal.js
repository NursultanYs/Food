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