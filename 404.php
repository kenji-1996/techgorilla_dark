<?php get_header(); ?>

<?php
$sidebar = true;
$layout = 'container';

if($sidebar) {?>
    <div class="container">
    <div class="row">

    <div class="col-sm-9">
<?php } ?>
<?php if(!$sidebar && $layout == 'container') { ?>
    <div class="container">
<?php } ?>

    <div class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php _e( 'Oops! That page can&rsquo;t be found.', 'twentyseventeen' ); ?></h1>
        </header><!-- .page-header -->
        <div class="page-content">
            <p><?php _e( 'It looks like nothing was found at this location. Maybe try a search?', 'twentyseventeen' ); ?></p>

            <?php get_search_form(); ?>

        </div><!-- .page-content -->
    </div><!-- .error-404 -->

<?php if($sidebar) {?>

    </div>
    <div class="col-sm-3">
        <?php get_sidebar(); ?>
    </div>
    </div>
    </div>

<?php } ?>

<?php if(!$sidebar && $layout == 'container') { ?>
    </div>
<?php } ?>


<?php get_footer(); ?>