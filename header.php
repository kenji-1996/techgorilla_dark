<!DOCTYPE html>
<html dir="ltr" lang="en-US" style="/*overflow-x: hidden;*/">
<meta http-equiv="content-type" content="text/html;charset=utf-8" />

<!-- HEADER -->
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400,600italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css">
    <?php
    $header = get_post_meta( get_the_ID(), '_techgorilla_header', TRUE );
    ?>

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
    <![endif]-->

    <?php wp_head(); ?>
</head>
<!-- HEADER END -->

<!-- SIDENAV -->
<div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="sidenav-close">&times;</a>
    <nav id="primary-menu" class="style-4">
        <?php /* Primary navigation */
        wp_nav_menu( array(
            'menu' => 'header_menu',
            'theme_location' => 'header_menu',
            'depth' => 2,
            'container' => false,
            'menu_class' => 'nav show',
            //Process nav menu using our custom nav walker
            //'walker' => new My_Walker_Nav_Menu()
        ));
        ?>
    </nav>
</div>
<div class="sidenav-bg"></div>
<!-- SIDENAV END -->

<body data-phone-cc-input="1">
<div id="main">
    <header id="header" class="header dark <?php if (is_front_page()) { echo 'header-front-page'; }else{ echo 'header-other'; } ?>">
        <div id="header-wrap">
            <div class="container clearfix">
                <div class="sidenav-open"><i class="fa fa-bars" id="primary-menu-trigger"></i></div>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#primary-nav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <div id="logo">
                    <a href="<?php echo get_bloginfo( 'wpurl' );?>" class="standard-logo" data-dark-logo="https://techgorilla.io/wp-content/uploads/2018/05/logo-white.png">
                        <img alt="MivoCloud" src="https://techgorilla.io/wp-content/uploads/2018/05/logo-white.png" />
                    </a>
                    <a href="<?php echo get_bloginfo( 'wpurl' );?>" class="retina-logo" data-dark-logo="https://techgorilla.io/wp-content/uploads/2018/05/logo-white.png">
                        <img alt="MivoCloud" src="https://techgorilla.io/wp-content/uploads/2018/05/logo-white.png" />
                    </a>
                </div>

                <nav id="primary-menu" class="style-4">
                    <?php /* Primary navigation */
                    wp_nav_menu( array(
                            'menu' => 'header_menu',
                            'theme_location' => 'header_menu',
                            'depth' => 2,
                            'container' => false,
                            'menu_class' => 'nav',
                            //Process nav menu using our custom nav walker
                            //'walker' => new My_Walker_Nav_Menu()
                    ));
                    ?>
                </nav>
            </div>
        </div>
    </header>
    <div id="wrap">
        <?php if (!is_front_page()) { ?>
        <div class="header-bg">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div id='header-stars' >
                <div class="container clearfix">
                    <?php if (have_posts() && is_archive()) { ?>
                        <span class="title hover hover-3">
                            <?php the_archive_title(); ?>
                        </span>
                    <?php } else if (is_search()) { ?>
                        <span class="title">
                            <?php if (have_posts()) { ?>
                                Results: <?php the_search_query(); ?>
                            <?php } else { ?>
                                <?php _e('Nothing Found', 'techgorilla'); ?>
                            <?php } ?>
                        </span>
                    <?php } else if (!empty($post->post_title)) { ?>
                        <span class="title hover hover-3">
                            <?php the_title(); ?>
                        </span>
                    <?php } ?>
                    <small style="margin-right:10px;">
                        <ol class="breadcrumb" typeof="BreadcrumbList" vocab="http://schema.org/">
                            <?php if (function_exists('bcn_display')) {
                                bcn_display();
                            } ?>
                        </ol>
                    </small>
                    <span></span>
                </div>
            </div>
        </div>
        <?php } ?>
    <?php if(!$header && is_page()) { ?>
    <?php }else{ ?>
    <?php if (!is_front_page()) { ?>

<?php }
}
