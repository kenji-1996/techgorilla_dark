<?php
$border = get_post_meta( get_the_ID(), '_techgorilla_post_border', TRUE );
$layout = get_post_meta( get_the_ID(), '_techgorilla_layout', TRUE );
$meta = get_post_meta( get_the_ID(), '_techgorilla_meta_data', TRUE );
?>

<?php if($layout == 'none') { ?>
    <?php the_content(); ?>
<?php }else{ ?>
    <div id='content-outer' style='padding: 10px;'>
        <?php if($border) {?> <div class="card" id='content-inner' ><?php } ?>
            <div class="card-body" id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="<?php if(!$meta) { echo 'padding: 1px;'; } ?>">
                <?php if($meta) { ?>
                    <h5 class="card-title"><?php the_title(); ?></h5>
                    <h6 class="card-subtitle mb-2 text-muted"><?php the_date(); ?> by <a href="#"><?php the_author(); ?></a></h6>
                <?php } ?>
                <p class="card-text"><?php the_content(); ?></p>

            </div>
            <?php if($border) {?> </div><?php } ?>
    </div>
<?php } ?>
