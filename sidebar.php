<!--<div class="col-sm-3 col-sm-offset-1 blog-sidebar">-->
<div id='content-outer' style='padding: 50px 10px 10px 10px;'>
    <div class="sidebar-module">
        <?php get_search_form(); ?>
    </div>
    <div class="sidebar-module sidebar-module-inset">
        <div class="sidebar-form-title">Get a quote</div>
        <?php echo do_shortcode( '[contact-form-7 id="444" title="Quote"]' );?>

    </div>
    <!--<div class="sidebar-module">
        <h4>Archives</h4>

        <ol class="list-unstyled">
            <?php wp_get_archives( 'type=monthly' ); ?>
        </ol>
    </div>
    <div class="sidebar-module">
        <h4>Elsewhere</h4>
        <ol class="list-unstyled">
            <li><a href="<?php echo get_option('github'); ?>">GitHub</a></li>
            <li><a href="<?php echo get_option('twitter'); ?>">Twitter</a></li>
        </ol>
    </div>-->
</div>
<!--</div>--><!-- /.blog-sidebar -->