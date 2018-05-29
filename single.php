<?php get_header(); ?>

<?php
$sidebar = get_post_meta( get_the_ID(), '_techgorilla_sidebar', TRUE );
$layout = get_post_meta( get_the_ID(), '_techgorilla_layout', TRUE );

if($sidebar) {?>
    <div class="container">
    <div class="row">

    <div class="col-sm-8">
<?php } ?>
<?php if(!$sidebar && $layout == 'container') { ?>
    <div class="container">
<?php } ?>

<?php
if ( have_posts() ) : while ( have_posts() ) : the_post();

    get_template_part( 'content-single', get_post_format() );
    if ( comments_open() || get_comments_number() ) :
        comments_template();
    endif;

endwhile; endif;
?>

<?php if($sidebar) {?>

    </div>
    <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
        <?php get_sidebar(); ?>
    </div>
    </div>
    </div>

<?php } ?>

<?php if(!$sidebar && $layout == 'container') { ?>
    </div>
<?php } ?>


<?php get_footer(); ?>