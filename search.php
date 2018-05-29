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

<?php if ( have_posts() ) : ?>

    <header class="page-header">
        <span class="search-page-title"><?php printf( esc_html__( 'Search Results for: %s', get_search_query() ), '<span>' . get_search_query() . '</span>' ); ?></span>
    </header><!-- .page-header -->

    <?php /* Start the Loop */ ?>
    <?php while ( have_posts() ) : the_post(); ?>
        <a href="<?php the_permalink(); ?>">
            <h1 class="search-post-title"><?php the_title(); ?></h1>
            <p class="search-post-excerpt"><?php the_excerpt(); ?></p>
            <p class="search-post-link"><?php the_permalink(); ?></p>
        </a>

    <?php endwhile; ?>

    <?php //the_posts_navigation(); ?>

<?php else : ?>

    <?php //get_template_part( 'template-parts/content', 'none' ); ?>

<?php endif; ?>

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