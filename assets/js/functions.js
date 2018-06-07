window.sr = new ScrollReveal();
(function($) {
    $( document ).ready(function() {
        "use strict"; // Start of use strict
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
        $('#primary-menu ul li.menu-item-has-children').hover(function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
        });

        $(".sidenav-open").click(function (ev) {
            document.getElementById("mySidenav").style.width = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
            $(".sidenav-bg").fadeIn();
            $(".sidenav-bg").fadeIn();
        });
        $(".sidenav-close").click(function (ev) {
            document.getElementById("mySidenav").style.width = "0";
            $(".sidenav-bg").fadeOut();
        });

        $(".sidenav-bg").click(function (ev) {
            document.getElementById("mySidenav").style.width = "0";
            $(".sidenav-bg").fadeOut();
        });
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