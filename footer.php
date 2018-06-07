<?php

$f1 = wp_get_nav_menu_object( 24 );
$f2 = wp_get_nav_menu_object( 25 );
$f3 = wp_get_nav_menu_object( 26 );
// then echo the name of the menu

?>
</div>
<footer id="footer-area">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row footer-links">
                    <div class="hosing-pakages col-md-3 hideme-footer">
                        <div class="widget widget_nav_menu">
                            <h4 class="widget-title-w"><?php echo $f1->name; ?></h4>
                            <div class="menu-hosting-pakages-container">
                                <?php /* Primary navigation */
                                wp_nav_menu( array(
                                    'menu' => 'footer_menu_1',
                                    'theme_location' => 'footer_menu_1',
                                    'depth' => 2,
                                    'container' => false,
                                    'menu_class' => 'menu',
                                    //Process nav menu using our custom nav walker
                                    //'walker' => new My_Walker_Nav_Menu()
                                ));
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="services-pakages col-md-3 hideme-footer">
                        <div class="widget widget_nav_menu">
                            <h4 class="widget-title-w"><?php echo $f2->name; ?></h4>
                            <div class="menu-our-services-container"> <?php /* Primary navigation */
                                wp_nav_menu( array(
                                    'menu' => 'footer_menu_2',
                                    'theme_location' => 'footer_menu_2',
                                    'depth' => 2,
                                    'container' => false,
                                    'menu_class' => 'menu',
                                    //Process nav menu using our custom nav walker
                                    //'walker' => new My_Walker_Nav_Menu()
                                ));
                                ?></div></div>                          </div>
                    <div class="company-pakages col-md-3 hideme-footer">
                        <div class="widget widget_nav_menu">
                            <h4 class="widget-title-w"><?php echo $f3->name; ?></h4>
                            <div class="menu-company-container"> <?php /* Primary navigation */
                                wp_nav_menu( array(
                                    'menu' => 'footer_menu_3',
                                    'theme_location' => 'footer_menu_3',
                                    'depth' => 2,
                                    'container' => false,
                                    'menu_class' => 'menu',
                                    //Process nav menu using our custom nav walker
                                    //'walker' => new My_Walker_Nav_Menu()
                                ));
                                ?></div></div>                          </div>
                    <div class="col-md-3 footer-cntct-info hideme-footer">
                        <a class="footer-logo" href="#"><img style="max-width: 160px;" src="https://techgorilla.io/wp-content/uploads/2018/05/logo-white.png" alt="footer_logo"></a>
                        <div class="address">
                            Web Design, Search Engine Optimisation, Server Hosting, Mail Setup
                        </div>
                        <div class="mobandmail">
                            <span><b>phone:</b> <a href="tel:61416723376">(61) 416 723 376</a></span>
                            <span><b>mail:</b> <a href="mailto:sales@techgorilla.io">sales@techgorilla.io</a></span>
                        </div>
                        <a href="#"><img style="max-width: 250px;" src="<?php bloginfo('stylesheet_directory'); ?>/images/payments.png" alt="payment"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<div class="modal fade" id="enquireModal" tabindex="-1" role="dialog" aria-labelledby="enquireModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="enquireModalLabel">Enquire</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <?php echo do_shortcode("[contact-form-7 id=\"464\" title=\"Untitled\"]"); ?>
            </div>
        </div>
    </div>
</div>
    <!-- div wrap
    <div class="dark" style="background-color:#131313;">
        <div id="copyrights">

            <div class="container clearfix">

                <div class="col_two_third">

                    <div class="copyrights-menu copyright-links clearfix">
                        <a href="/cart.php?gid=1">Web Hosting</a>
                        <a href="mailto:sales@techgorilla.io">sales@techgorilla.io</a>
                        <a href="tel:+61-416-723-376">+61 416 723 376</a>
                        <a href="/affiliates.phps">Affiliates</a>
                        <a href="/clientarea.php">Login</a>
                        <a href="/register.php">Register</a>
                    </div>

                    Copyrights © 2017 by TechGorilla<br>
                    <div class="copyright-links"><a href="https://techgorilla.io/terms-of-service">Terms of Service</a></div>
                </div>

                <div class="col_one_third col_last tright">
                    <div class="widget subscribe-widget clearfix">
                        <form class="nobottommargin" action="https://www.mivocloud.com/plugins/cama_subscriber/subscribe" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="3kkWGMXPiaATPQc9yFTJEfUOp2vu1bmf+mN4tB+J0XgoNaxM5MbvxsMtg2i4XbyI2Y43ycTROAapg1Vq10fiiw==">
                            <input type="hidden" name="group_id" value="1">
                            <div class="input-group divcenter">
                                <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                                <input type="email" id="widget-subscribe-form-email" name="email" class="form-control required email" placeholder="E-mail">
                                <span class="input-group-btn">
                                        <button class="btn btn-success" style="background-color: #3EC303;" type="submit">Subscribe</button>
                                    </span>
                            </div>
                        </form>                        </div>
                </div>

            </div>

        </div>
    </div>-->

<!-- END Footer -->

</div>
<!-- END Document Wrapper -->

<!-- Go To Top
<div id="gotoTop" class="icon-angle-up"></div>-->

<!-- Footer Scripts -->
<!-- </script>
        <script type="text/javascript" src="<?php echo get_bloginfo('template_directory'); ?>/assets/themes/mivocloud/assets/js/functions.js">
        <script src="<?php echo get_bloginfo('template_directory'); ?>/assets/themes/mivocloud/assets/js/functions.js"></script>
         -->
<?php wp_footer(); ?>
</div>
<!-- end #main wrapper -->
</body>

</html>