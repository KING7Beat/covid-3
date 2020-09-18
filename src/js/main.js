import LazyLoad from "vanilla-lazyload";
import * as $ from 'jQuery';
import Swiper, { Navigation } from 'swiper';
// Swiper.use([Navigation]);

let paramPerView = 4;
let paramSpaveBetween = 40;

if (document.documentElement.clientWidth > 1900) {
    paramPerView = 4;
}
else if (document.documentElement.clientWidth > 1500 && document.documentElement.clientWidth <= 1900) {
    paramPerView = 3;
}
else if (document.documentElement.clientWidth > 991 && document.documentElement.clientWidth <= 1500) {
    paramPerView = 2;
}
else if (document.documentElement.clientWidth <= 991) {
    paramPerView = 1;
}

const swiper = new Swiper('.section-reviews-slider', {
    on: {
        resize: function (e) {
            if (e.width > 1900) {
                this.params.slidesPerView = 4;
                this.params.spaceBetween = 40;
            }
            else if (e.width > 1500 && e.width <= 1900) {
                this.params.slidesPerView = 3;
            }
            else if (e.width > 991 && e.width <= 1500) {
                this.params.slidesPerView = 2;
            }
            else if (e.width <= 991) {
                this.params.slidesPerView = 1;
            }
        }
    },
    slidesPerView: paramPerView,
    spaceBetween: paramSpaveBetween,
    allowTouchMove: false
});

const lazy = new LazyLoad({
    elements_selector: '.lazy'
});

const $stepBtns = $('.button_step');
const $stepParrents = $('.section-header-step');
const $stepForm = $('.section-header-form');
const stepNextArr = [];
const stepPrevArr = [];
let tempIndex=0;

const $dropItems = $('.dropdown-item');

$dropItems.click(function(){
    for (let i=0; i<document.querySelectorAll('.dropdown-info').length; i++)
    {
        if ($(this).data('type') === document.querySelectorAll('.dropdown-info')[i].getAttribute('data-type'))
        {
            document.querySelectorAll('.dropdown-info')[i].textContent=$(this).text();
        }
    }
})


$stepBtns.each(function (index) {

    if ($(this).data('btn') === 'next') {
        stepNextArr.push(index);
    };

    if ($(this).data('btn') === 'prev') {
        stepPrevArr.push(index);
    };

    $(this).click(function () {
        if (tempIndex !== stepNextArr.length && $(this).data('btn') === 'next') {
            $stepForm.animate({left: '-10000px'}, 700, function () {
                $stepParrents.eq(tempIndex).css({display: 'none'});
                console.log($stepParrents.eq(tempIndex))
                tempIndex++;
                console.log($stepParrents.eq(tempIndex))
                $stepParrents.eq(tempIndex).css({display: 'block', left: 0});
                $stepForm.animate({left: 0});
            });
        }

        else if (tempIndex !== -1 && $(this).data('btn') === 'prev') {
            $stepForm.animate({left: '-10000px'}, 700, function () {
                // console.log(tempIndex);
                $stepParrents.eq(tempIndex).css({display: 'none'});
                tempIndex--;
                $stepParrents.eq(tempIndex).css({display: 'block', left: 0});
                $stepForm.animate({left: 0});
            });
        }
    })
});

const prevBtn=document.querySelector('.section-reviews-slider_prev');
const nextBtn=document.querySelector('.section-reviews-slider_next');

nextBtn.addEventListener('click', ()=>{
    if (swiper.activeIndex >= 0)
    {
        prevBtn.classList.remove('section-reviews-slider_disabled');
    }
    else {
        prevBtn.classList.add('section-reviews-slider_disabled');
    }

    if (swiper.activeIndex >= swiper.slides.length-(paramPerView+1)) {
        nextBtn.classList.add('section-reviews-slider_disabled');
    }
    else {
        nextBtn.classList.remove('section-reviews-slider_disabled');
    }
    swiper.slideNext();
});

prevBtn.addEventListener('click', ()=>{
    if (swiper.activeIndex > 1)
    {
        prevBtn.classList.remove('section-reviews-slider_disabled');
    }
    else {
        prevBtn.classList.add('section-reviews-slider_disabled');
    }

    if (swiper.activeIndex >= swiper.slides.length) {
        nextBtn.classList.add('section-reviews-slider_disabled');
    }
    else {
        nextBtn.classList.remove('section-reviews-slider_disabled');
    }
    swiper.slidePrev();
});