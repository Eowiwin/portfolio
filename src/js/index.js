document.addEventListener('DOMContentLoaded', function () {
    var leftImage = document.querySelector('.left-img');
    var rightImage = document.querySelector('.right-img');
    var leftGif = document.querySelector('.left-gif');
    var rightGif = document.querySelector('.right-gif');

    function checkScroll() {
        var windowHeight = window.innerHeight;
        var leftImageTop = leftImage.getBoundingClientRect().top;
        var rightImageTop = rightImage.getBoundingClientRect().top;
        var leftGifTop = leftGif.getBoundingClientRect().top;
        var rightGifTop = rightGif.getBoundingClientRect().top;
        if (leftImageTop < windowHeight * 0.7) {
            leftImage.classList.add('show-on-scroll');
        } else {
            leftImage.classList.remove('show-on-scroll');
        }
        if (rightImageTop < windowHeight * 0.7) {
            rightImage.classList.add('show-on-scroll');
        } else {
            rightImage.classList.remove('show-on-scroll');
        }
        if (leftGifTop < windowHeight * 0.7) {
            leftGif.classList.add('show-on-scroll');
        } else {
            leftGif.classList.remove('show-on-scroll');
        }
        if (rightGifTop < windowHeight * 0.7) {
            rightGif.classList.add('show-on-scroll');
        } else {
            rightGif.classList.remove('show-on-scroll');
        }
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

