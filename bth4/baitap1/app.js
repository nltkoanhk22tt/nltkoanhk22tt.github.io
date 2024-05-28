const show = document.querySelector('.show');
const hide = document.querySelector('.hide');
const Hide_details = document.querySelector('.Hide-details');

show.addEventListener('click', () => {
    Hide_details.style.display = 'block';
    show.style.display = 'none';
});

hide.addEventListener('click', () => {
    Hide_details.style.display = 'none';
    show.style.display = 'block';
});

