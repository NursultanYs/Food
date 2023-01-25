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