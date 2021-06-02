"use strict";

const menuIcon = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".header__nav");

menuIcon.addEventListener("click", function(){
    menuIcon.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    document.body.classList.toggle("_lock");
});

new Swiper('.slider__container', {
    speed: 600,
    spaceBetween: 15,
    slidesPerGroup: 1,
    slidesPerView: 1,

    pagination: {
      el: '.slider__pagination',
      clickable: true,
    },
    breakpoints:{
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 15,
        },
        635: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        820: {
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        1300: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        1600: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
    },
});

let selects = document.getElementsByTagName("select");
function selects_init() {
    for (let e = 0; e < selects.length; e++) {
        select_init(selects[e])
    }
    document.addEventListener("click", (function(e) {
        selects_close(e)
    }
    )),
    document.addEventListener("keydown", (function(e) {
        27 == e.which && selects_close(e)
    }
    ))
}
function selects_close(e) {
    const t = document.querySelectorAll(".select");
    if (!e.target.closest(".select"))
        for (let e = 0; e < t.length; e++) {
            const l = t[e]
              , o = l.querySelector(".select__options");
            l.classList.remove("_active"),
            _slideUp(o, 100)
        }
}
function select_init(e) {
    const t = e.parentElement
      , l = e.getAttribute("class")
      , o = e.querySelector("option:checked");
    e.setAttribute("data-default", o.value),
    e.style.display = "none",
    t.insertAdjacentHTML("beforeend", '<div class="select select_' + l + '"></div>'),
    e.parentElement.querySelector(".select").appendChild(e),
    select_item(e)
}
function select_item(e) {
    const t = e.parentElement
      , l = t.querySelector(".select__item")
      , o = e.querySelectorAll("option")
      , n = e.querySelector("option:checked").text
      , r = e.getAttribute("data-type");
    l && l.remove();
    let s = "";
    s = "input" == r ? '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + n + '" data-error="Ошибка" data-value="' + n + '" class="select__input"></div>' : '<div class="select__value icon-select-arrow"><span>' + n + "</span></div>",
    t.insertAdjacentHTML("beforeend", '<div class="select__item"><div class="select__title">' + s + '</div><div class="select__options">' + select_get_options(o) + "</div></div></div>"),
    select_actions(e, t)
}
function select_actions(e, t) {
    const l = t.querySelector(".select__item")
      , o = t.querySelector(".select__options")
      , n = t.querySelectorAll(".select__option")
      , r = e.getAttribute("data-type")
      , s = t.querySelector(".select__input");
    l.addEventListener("click", (function() {
        let e = document.querySelectorAll(".select");
        for (let t = 0; t < e.length; t++) {
            const o = e[t]
              , n = o.querySelector(".select__options");
            o != l.closest(".select") && (o.classList.remove("_active"),
            _slideUp(n, 100))
        }
        _slideToggle(o, 100),
        t.classList.toggle("_active")
    }
    ));
    for (let l = 0; l < n.length; l++) {
        const o = n[l]
          , i = o.getAttribute("data-value")
          , c = o.innerHTML;
        "input" == r ? s.addEventListener("keyup", select_search) : o.getAttribute("data-value") == e.value && (o.style.display = "none"),
        o.addEventListener("click", (function() {
            for (let e = 0; e < n.length; e++) {
                n[e].style.display = "block"
            }
            "input" == r ? (s.value = c,
            e.value = i) : (t.querySelector(".select__value").innerHTML = "<span>" + c + "</span>",
            e.value = i,
            o.style.display = "none")
        }
        ))
    }
}
function select_get_options(e) {
    if (e) {
        let t = "";
        for (let l = 0; l < e.length; l++) {
            const o = e[l]
              , n = o.value;
            if ("" != n) {
                t = t + '<div data-value="' + n + '" class="select__option">' + o.text + "</div>"
            }
        }
        return t
    }
}
function select_search(e) {
    e.target.closest(".select ").querySelector(".select__options");
    let t = e.target.closest(".select ").querySelectorAll(".select__option")
      , l = e.target.value.toUpperCase();
    for (let e = 0; e < t.length; e++) {
        let o = t[e];
        (o.textContent || o.innerText).toUpperCase().indexOf(l) > -1 ? o.style.display = "" : o.style.display = "none"
    }
}
function selects_update_all() {
    let e = document.querySelectorAll("select");
    if (e)
        for (let t = 0; t < e.length; t++) {
            select_item(e[t])
        }
}
selects.length > 0 && selects_init();

let slideTimeout;
let slideOpen = false;

let _slideToggle = (element, duration) => {
    window.clearTimeout(slideTimeout);
    if(!slideOpen){
        return _slideDown(element, duration);
    } else {
        return _slideUp(element, duration);
    }
}
let _slideDown = (element, duration = 500) => {
    slideOpen = true;
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') 
        display = 'block';

    element.style.display = display;
    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.offsetHeight;
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.style.height = height + 'px';
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    slideTimeout = window.setTimeout(function () {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}

let _slideUp = (element, duration = 500) => {
    slideOpen = false;
    element.style.height = element.offsetHeight + 'px';
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + 'ms';
    element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    slideTimeout = window.setTimeout(function () {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
    }, duration)
}

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0){
    for(let i = 0; i < popupLinks.length; i++){
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function(e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if(popupCloseIcon.length > 0){
    for(let i = 0; i < popupCloseIcon.length; i++){
        const el = popupCloseIcon[i];
        el.addEventListener("click", function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup){
    if(currentPopup && unlock){
        const popupActive = document.querySelector(".popup.open");
        if(popupActive){
            popupClose(popupActive, false);
        } else{
            bodyLock();
        }
        currentPopup.classList.add("open");
        currentPopup.addEventListener("mousedown", function(e){
            if(!e.target.closest(".popup__content")){
                popupClose(e.target.closest(".popup"));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true){
    if(unlock) {
        popupActive.classList.remove("open");
        if(doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if(lockPadding.length > 0){
        for(let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

function bodyUnLock(){
    setTimeout(function(){
        for(let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

document.addEventListener("keydown", function(e){
    if(e.which === 27){
        const popupActive = document.querySelector(".popup.open");
        popupClose(popupActive);
    }
});

(function (){
    if(!Element.prototype.closest){
        Element.prototype.closest = function(css){
            var node = this;
            while(node){
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function(){
    if(!Element.prototype.matches){
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

const form = document.querySelector(".sign-in__form");

form.addEventListener("submit", function(e){
    formSend(e, this);
})

function formSend(e, form) {
    let errors = formValidate(form);

    if(errors > 0){
        e.preventDefault();
    }
}

function formValidate(form) {
    let errors = 0;
    const reqInputs = form.querySelectorAll("._req");

    for(let reqInput of reqInputs){

        reqInput.classList.remove("_err");

        if(!reqInput.value){
            errors++;
            reqInput.classList.add("_err");
            continue;
        }
        if(reqInput.getAttribute("type") === "email" && emailTest(reqInput)){
            errors++;
            reqInput.classList.add("_err");
        }
        if(reqInput.getAttribute("type") === "tel" && phoneNumberTest(reqInput)){
            errors++;
            reqInput.classList.add("_err");
        }
    }

    return errors;
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // Если e-mail не правильный, то выдает true
}

function phoneNumberTest(input) {
    return !/^([0-9\(\)\/\+ \-]*)$/.test(input.value);
}