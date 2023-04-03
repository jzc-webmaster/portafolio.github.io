document.addEventListener('DOMContentLoaded', function () {
    // Inicializar parallax de Materialize
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
    // Animación parallax personalizada con anime.js
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        
        var parallaxContainers = document.querySelectorAll('.parallax-container');
        parallaxContainers.forEach(function (container) {
            var containerTop = container.offsetTop;
            var containerHeight = container.offsetHeight;
            var containerBottom = containerTop + containerHeight;

            if (scrollTop + windowHeight >= containerTop && scrollTop <= containerBottom) {
                var scrollProgress = (scrollTop + windowHeight - containerTop) / (windowHeight + containerHeight);
                var translateY = scrollProgress * 100;
                
                anime({
                    targets: container.querySelector('.parallax img'),
                    translateY: [translateY / 2, translateY],
                    duration: 0,
                    easing: 'linear'
                });

                // Agregar efecto de zoom y desplazamiento para la sección "Sobre mí"
                if (container.id === 'sobre-mi' || container.id === 'proyectos') {

                    var scale = 1 + scrollProgress * 2;
                    var opacity = 1 - scrollProgress * 2;
                    var contentTranslateY = -scrollProgress * containerHeight;

                    anime({
                        targets: container.querySelector('.parallax img'),
                        scale: scale,
                        opacity: opacity,
                        duration: 0,
                        easing: 'linear'
                    });

                    anime({
                        targets: container.nextElementSibling,
                        translateY: [0, contentTranslateY],
                        duration: 0,
                        easing: 'linear'
                    });
                }
            }
        });
    });
});
