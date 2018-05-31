(function($) {
    $( document ).ready(function() {
        //Old creative
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
            $('.hideme').each( function(i){
                var bottom_of_object = $(this).position().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                /* If the object is completely visible in the window, fade it it */
                if( bottom_of_window > bottom_of_object ){
                    $(this).css("opacity", "1");//.animate({'opacity':'1'});
                }
            });
        });
        $('#fancy-feature').css("opacity", "1");//.animate({'opacity':'1'},500);
        $('#footer-area').css("opacity", "1");//.animate({'opacity':'1'});
        $('#title').css("opacity", "1");//.animate({'opacity':'1'});


        $('#primary-menu ul li.menu-item-has-children').hover(function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
        }, function() {
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
        });

        $(".sidenav-open").click(function (ev) {
            document.getElementById("mySidenav").style.width = "250px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
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
            console.log(i);
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

        // END SIDENAV

        // CAROUSEL CLASS DEFINITION
        // =========================

        var Carousel = function (element, options) {
            this.$element    = $(element)
            this.$indicators = this.$element.find('.carousel-indicators')
            this.options     = options
            this.paused      =
                this.sliding     =
                    this.interval    =
                        this.$active     =
                            this.$items      = null

            this.options.pause == 'hover' && this.$element
                .on('mouseenter', $.proxy(this.pause, this))
                .on('mouseleave', $.proxy(this.cycle, this))
        }

        Carousel.DEFAULTS = {
            interval: 5000
            , pause: 'hover'
            , wrap: true
        }

        Carousel.prototype.cycle =  function (e) {
            e || (this.paused = false)

            this.interval && clearInterval(this.interval)

            this.options.interval
            && !this.paused
            && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

            return this
        }

        Carousel.prototype.getActiveIndex = function () {
            this.$active = this.$element.find('.item.active')
            this.$items  = this.$active.parent().children()

            return this.$items.index(this.$active)
        }

        Carousel.prototype.to = function (pos) {
            var that        = this
            var activeIndex = this.getActiveIndex()

            if (pos > (this.$items.length - 1) || pos < 0) return

            if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
            if (activeIndex == pos) return this.pause().cycle()

            return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
        }

        Carousel.prototype.pause = function (e) {
            e || (this.paused = true)

            if (this.$element.find('.next, .prev').length && $.support.transition.end) {
                this.$element.trigger($.support.transition.end)
                this.cycle(true)
            }

            this.interval = clearInterval(this.interval)

            return this
        }

        Carousel.prototype.next = function () {
            if (this.sliding) return
            return this.slide('next')
        }

        Carousel.prototype.prev = function () {
            if (this.sliding) return
            return this.slide('prev')
        }

        Carousel.prototype.slide = function (type, next) {
            var $active   = this.$element.find('.item.active')
            var $next     = next || $active[type]()
            var isCycling = this.interval
            var direction = type == 'next' ? 'left' : 'right'
            var fallback  = type == 'next' ? 'first' : 'last'
            var that      = this

            if (!$next.length) {
                if (!this.options.wrap) return
                $next = this.$element.find('.item')[fallback]()
            }

            this.sliding = true

            isCycling && this.pause()

            var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

            if ($next.hasClass('active')) return

            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active')
                this.$element.one('slid', function () {
                    var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                    $nextIndicator && $nextIndicator.addClass('active')
                })
            }

            if ($.support.transition && this.$element.hasClass('slide')) {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $next.addClass(type)
                $next[0].offsetWidth // force reflow
                $active.addClass(direction)
                $next.addClass(direction)
                $active
                    .one($.support.transition.end, function () {
                        $next.removeClass([type, direction].join(' ')).addClass('active')
                        $active.removeClass(['active', direction].join(' '))
                        that.sliding = false
                        setTimeout(function () { that.$element.trigger('slid') }, 0)
                    })
                    .emulateTransitionEnd(600)
            } else if(this.$element.hasClass('slide')) {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $active.animate({left: (direction == 'right' ? '100%' : '-100%')}, 600, function(){
                    $active.removeClass('active')
                    that.sliding = false
                    setTimeout(function () { that.$element.trigger('slid') }, 0)
                })
                $next.addClass(type).css({left: (direction == 'right' ? '-100%' : '100%')}).animate({left: 0}, 600,  function(){
                    $next.removeClass(type).addClass('active')
                })
            } else {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $active.removeClass('active')
                $next.addClass('active')
                this.sliding = false
                this.$element.trigger('slid')
            }

            isCycling && this.cycle()

            return this
        }


        // CAROUSEL PLUGIN DEFINITION
        // ==========================

        var old = $.fn.carousel

        $.fn.carousel = function (option) {
            return this.each(function () {
                var $this   = $(this)
                var data    = $this.data('bs.carousel')
                var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var action  = typeof option == 'string' ? option : options.slide

                if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
                if (typeof option == 'number') data.to(option)
                else if (action) data[action]()
                else if (options.interval) data.pause().cycle()
            })
        }

        $.fn.carousel.Constructor = Carousel


        // CAROUSEL NO CONFLICT
        // ====================

        $.fn.carousel.noConflict = function () {
            $.fn.carousel = old
            return this
        }


        // CAROUSEL DATA-API
        // =================

        $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
            var $this   = $(this), href
            var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
            var options = $.extend({}, $target.data(), $this.data())
            var slideIndex = $this.attr('data-slide-to')
            if (slideIndex) options.interval = false

            $target.carousel(options)

            if (slideIndex = $this.attr('data-slide-to')) {
                $target.data('bs.carousel').to(slideIndex)
            }

            e.preventDefault()
        })

        $(window).on('load', function () {
            $('[data-ride="carousel"]').each(function () {
                var $carousel = $(this)
                $carousel.carousel($carousel.data())
            })
        })
    });
})(jQuery); // End of use strict