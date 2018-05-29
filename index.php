<?php get_header(); ?>

    <div class="">
        <div class="row">

            <div class="col-sm-8">

                <?php
                if ( have_posts() ) : while ( have_posts() ) : the_post();

                    get_template_part( 'content', get_post_format() );

                endwhile;

                    $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1; // setup pagination

                    $the_query = new WP_Query( array(
                            'post_type' => 'clients',
                            'paged' => $paged,
                            'posts_per_page' => 5)
                    );

                    while ( $the_query->have_posts() ) : $the_query->the_post();
                        echo '<div>' . get_the_title() . '</div>';
                        the_content();
                    endwhile;

                    ?>
                    <nav class="navbar">
                        <ul class='navbar-nav mr-auto'>
                            <li class='nav-item'>
                                <?php next_posts_link( '<span class="btn btn-primary">Older posts</span>' ); ?>
                            </li>

                        </ul>
                        <ul class="navbar-nav">
                            <li class='nav-item'>
                                <?php previous_posts_link( '<span class="btn btn-primary">Newer posts</span>' ); ?>
                            </li>
                        </ul>
                    </nav>




                    <?php
                    wp_reset_postdata(); // Rest Data
                endif;
                ?>


            </div>
            <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
                <?php get_sidebar(); ?>
            </div>

        </div>
    </div>



<?php get_footer(); ?>