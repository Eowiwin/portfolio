document.addEventListener('DOMContentLoaded', function () {
    var leftImage = document.querySelector('.left-img');
    var rightImage = document.querySelector('.right-img');

    function checkScroll() {
        var windowHeight = window.innerHeight;
        var leftImageTop = leftImage.getBoundingClientRect().top;
        var rightImageTop = rightImage.getBoundingClientRect().top;
        if (leftImageTop < windowHeight * 0.5) {
            leftImage.classList.add('show-on-scroll');
        } else {
            leftImage.classList.remove('show-on-scroll');
        }
        if (rightImageTop < windowHeight * 0.5) {
            rightImage.classList.add('show-on-scroll');
        } else {
            rightImage.classList.remove('show-on-scroll');
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

