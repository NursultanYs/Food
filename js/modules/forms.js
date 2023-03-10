 import{closeModal,openModal} from './modal';
 import { postData } from '../services/services';

function forms(formSelector,modalTimerId){
    
    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(form => {
        bindPostData(form);
    })



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
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
        openModal('.modal',modalTimerId);
        
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${messages}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            previousMidalDialog.classList.add('show');
            previousMidalDialog.classList.remove('hide');
            closeModal('.modal');
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

export default forms;