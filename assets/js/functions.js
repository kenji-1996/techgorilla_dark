window.sr = new ScrollReveal();
(function($) {
    $( document ).ready(function() {
        "use strict"; // Start of use strict
        var scrollInital = $(window).scrollTop();
        var windowWInitial = $(window).width();
        if (scrollInital >= 2 && windowWInitial >= 960 && $(".sidenav-open").is(":visible")) {

            $("#header").addClass("sticky-header");
        }else{
            $('#primary-menu ul li.menu-item-has-children').hover(function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
            }, function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
            });
            $("#header").removeClass("sticky-header");
        }
        if ($('').find('.submenuClass').length > 0) {
            $(this).toggleClass('sf-js-enabled');
        }
        /*
        $('#primary-menu ul li.menu-item-has-children').click(function () {

        })
        if($('#primary-menu ul li.menu-item-has-children').children()



            && $(".sidenav-open").is(":visible")) {
            $('#menu-item-365').find('a').attr('data-toggle', 'modal');
            $('#menu-item-365').find('a').attr('data-target', '#myModal');
        }*/

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            var windowW = $(window).width();
            //>=, not <=
            if (scroll >= 2 && windowW >= 960 && $(".sidenav-open").is(":visible")) {
                $("#header").addClass("sticky-header");
            }else{
                $("#header").removeClass("sticky-header");
            }
        });



        /**
         * Sidenav menu smooth animation
         */
        var jMenu = $('.menu');
        function toggleClassMenu() {
            myMenu.classList.add("menu--animatable");
            if(!myMenu.classList.contains("menu--visible")) {
                myMenu.classList.add("menu--visible");
            } else {
                myMenu.classList.remove('menu--visible');
            }
        }
        $(document).bind("mouseup touchend", function (e) {
            if(jMenu.is(e.target)) {
                myMenu.classList.remove('menu--visible');
            }
        });
        function OnTransitionEnd() {
            myMenu.classList.remove("menu--animatable");
        }

        var myMenu = document.querySelector(".menu");
        var oppMenu = document.querySelector(".sidenav-open");
        myMenu.addEventListener("transitionend", OnTransitionEnd, false);
        oppMenu.addEventListener("click", toggleClassMenu, false);
        /**
         * Sidenav end
         */


        var TxtType = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function() {
                that.tick();
            }, delta);
        };
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            document.body.style.backgroundColor = "white";
        }
    });
})(jQuery); // End of use strict