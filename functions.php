<?php
/**
 * Style and script setup
 */
require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
//Include styles
function techgorilla_styles() {
    wp_enqueue_style( 'misc', get_template_directory_uri() . '/assets/css/misc.min.css' );
    wp_enqueue_style( 'techgorilla', get_template_directory_uri() . '/assets/css/techgorilla.min.css' );
    wp_enqueue_style( 'custom', get_template_directory_uri() . '/assets/css/custom.min.css' );
    wp_enqueue_style( 'sidenav', get_template_directory_uri() . '/assets/css/sidenav.min.css' );

}
add_action( 'wp_enqueue_scripts', 'techgorilla_styles' );
function techgorilla_scripts() {

    if(!is_admin()) {
        wp_deregister_script( 'jquery' );
        wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
    }
    wp_enqueue_script( 'scrollreveal', '//unpkg.com/scrollreveal/dist/scrollreveal.min.js',null,null,false  );

    wp_enqueue_script('jquery','//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', null, '1.12.9', true);
    wp_enqueue_script( 'popper', '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' , array( 'jquery' ), '1.12.9', true);
    wp_enqueue_script( 'bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' , array( 'jquery','popper' ), '4.0.0', true);
    wp_enqueue_script( 'functions', get_template_directory_uri() . '/assets/js/functions.min.js',array( 'jquery','scrollreveal' ),null,true  );
    wp_enqueue_script( 'footer', get_template_directory_uri() . '/assets/js/footer.min.js',null,null,true  );

}
add_action( 'wp_enqueue_scripts', 'techgorilla_scripts' );
function techgorilla_google_fonts() {
    wp_register_style('Fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,400,600italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic');
    wp_enqueue_style( 'Fonts');
}
//add_action('wp_print_styles', 'techgorilla_google_fonts');
/**
 * Theme support
 */
function get_menu_name( $location ) {
    if( empty($location) ) return false;

    $locations = get_nav_menu_locations();
    if( ! isset( $locations[$location] ) ) return false;

    $menu_obj = get_term( $locations[$location], 'nav_menu' );

    return $menu_obj;
}
function register_my_menu() {
    register_nav_menus( array(
        'header_menu' => 'Header Menu',
        'footer_menu_1' => 'Footer Menu 1',
        'footer_menu_2' => 'Footer Menu 2',
        'footer_menu_3' => 'Footer Menu 3',
    ) );
}
add_action( 'init', 'register_my_menu' );
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class ($classes, $item) {
    if (in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}
function comment_submit($args ) {

    $args['class_submit'] = 'btn btn-primary'; // since WP 4.1

    return $args;

}
add_filter( 'comment_form_defaults', 'comment_submit' );
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'customize-selective-refresh-widgets' );
add_theme_support( 'menus' );
add_theme_support( 'widgets' );
add_theme_support( 'post-formats', array(
    'aside',
    'image',
    'video',
    'quote',
    'link',
    'gallery',
    'audio',
) );

/**
 * Widgets
 */
function techgorilla_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Blog Sidebar', 'techgorilla' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here to appear in your sidebar on blog posts and archive pages.', 'techgorilla' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer 1', 'techgorilla' ),
        'id'            => 'sidebar-2',
        'description'   => __( 'Add widgets here to appear in your footer.', 'techgorilla' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer 2', 'techgorilla' ),
        'id'            => 'sidebar-3',
        'description'   => __( 'Add widgets here to appear in your footer.', 'techgorilla' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'techgorilla_widgets_init' );

/**
 * Custom admin theme functions
 */
// Custom settings
function custom_settings_add_menu() {
    add_menu_page( 'TechGorilla Settings', 'TechGorilla Settings', 'manage_options', 'custom-settings', 'custom_settings_page', null, 99 );
}
add_action( 'admin_menu', 'custom_settings_add_menu' );

//Actual display page for above settings
function custom_settings_page() { ?>
    <div class="wrap">
        <h1>TechGorilla Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'section' );
            do_settings_sections( 'theme-options' );
            submit_button();
            ?>
        </form>
    </div>
<?php }

//Twitter
function setting_twitter() { ?>
    <input type="text" name="twitter" id="twitter" value="<?php echo get_option( 'twitter' ); ?>" />
<?php }

//Site IMG
function setting_siteimage() { ?>
    <input type="text" name="siteimage" id="siteimage" value="<?php echo get_option( 'siteimage' ); ?>" />
<?php }

//front page IMG
function setting_frontimage() { ?>
    <input type="text" name="frontimage" id="frontimage" value="<?php echo get_option( 'frontimage' ); ?>" />
<?php }

function setting_fronttitle() { ?>
    <input type="text" name="fronttitle" id="fronttitle" value="<?php echo get_option( 'fronttitle' ); ?>" />
<?php }

function setting_frontdesc() { ?>
    <input type="text" name="frontdesc" id="frontdesc" value="<?php echo get_option( 'frontdesc' ); ?>" />
<?php }


//Github
function setting_github() { ?>
    <input type="text" name="github" id="github" value="<?php echo get_option('github'); ?>" />
<?php }

//Building the sections
function custom_settings_page_setup() {
    add_settings_section( 'section', 'All Settings', null, 'theme-options' );

    add_settings_field( 'twitter', 'Twitter URL', 'setting_twitter', 'theme-options', 'section' );
    add_settings_field( 'siteimage', 'Default featured site image', 'setting_siteimage', 'theme-options', 'section' );
    add_settings_field( 'frontimage', 'Front page image', 'setting_frontimage', 'theme-options', 'section' );
    add_settings_field( 'fronttitle', 'Front page title', 'setting_fronttitle', 'theme-options', 'section' );
    add_settings_field( 'frontdesc', 'Front page tag', 'setting_frontdesc', 'theme-options', 'section' );
    add_settings_field( 'github', 'GitHub URL', 'setting_github', 'theme-options', 'section' );

    register_setting( 'section', 'twitter' );
    register_setting( 'section', 'siteimage' );
    register_setting( 'section', 'frontimage' );
    register_setting( 'section', 'fronttitle' );
    register_setting( 'section', 'frontdesc' );
    register_setting( 'section', 'github' );
}
add_action( 'admin_init', 'custom_settings_page_setup' );


/**
 * Metabox
 */
/* Fire our meta box setup function on the post editor screen. */
add_action( 'load-post.php', 'techgorilla_post_meta_boxes_setup' );
add_action( 'load-post-new.php', 'techgorilla_post_meta_boxes_setup' );

/* Meta box setup function. */
function techgorilla_post_meta_boxes_setup() {
    /* Add meta boxes on the 'add_meta_boxes' hook. */
    add_action( 'add_meta_boxes', 'techgorilla_add_post_meta_boxes' );

    /* Save post meta on the 'save_post' hook. */
    add_action( 'save_post', 'techgorilla_save_post_class_meta', 10, 2 );
}
function techgorilla_add_post_meta_boxes() {

    $screens = ['post','page','product'];
    foreach ($screens as $screen) {
        add_meta_box(
            'techgorilla-post-class',      // Unique ID
            esc_html__( 'TechGorilla Page settings', 'example' ),    // Title
            'contenthead_meta_box',   // Callback function
            $screen,         // Admin page (or post type)
            'side',         // Context
            'default'         // Priority
        );
    }
}
/* Display the post meta box. */
function contenthead_meta_box( $post ) { ?>

    <?php
    wp_nonce_field( basename( __FILE__ ), 'contenthead_nonce' );
    $techgorilla_sidebar = get_post_meta( $post->ID, '_techgorilla_sidebar', true );
    $techgorilla_meta_data = get_post_meta( $post->ID, '_techgorilla_meta_data', true );
    $techgorilla_header = get_post_meta( $post->ID, '_techgorilla_header', true );
    $techgorilla_post_border = get_post_meta( $post->ID, '_techgorilla_post_border', true );
    $techgorilla_layout = get_post_meta( $post->ID, '_techgorilla_layout', true );

    if ($techgorilla_header == null) {$techgorilla_header = 1;}
    ?>

    <p>
        <label for="techgorilla-post-class"><?php _e( "Add a custom CSS class, which will be applied to WordPress' post class.", 'example' ); ?></label>
        <br />
        <input class="widefat" type="text" name="techgorilla-post-class" id="techgorilla-post-class" value="<?php echo esc_attr( get_post_meta( $post->ID, 'contenthead', true ) ); ?>" size="30" />
    </p>
    <hr>
    <p>
        <label for="techgorilla-post-class"><?php _e( "Show Header", 'example' ); ?></label>
        <input class="widefat" type="checkbox" name="techgorilla-header" value="<?php echo $techgorilla_header ?>" <?php if($techgorilla_header == 1) { echo 'checked'; } ?> size="30"/>
    </p>
    <p>
        <label for="techgorilla-post-class"><?php _e( "Sidebar", 'example' ); ?></label>
        <input class="widefat" type="checkbox" name="techgorilla-sidebar" value="<?php echo $techgorilla_sidebar ?>" <?php if($techgorilla_sidebar == 1) { echo 'checked'; } ?> size="30"/>
    </p>
    <p>
        <label for="techgorilla-post-class"><?php _e( "Meta data", 'example' ); ?></label>
        <input class="widefat" type="checkbox" name="techgorilla-meta-data" value="<?php echo $techgorilla_meta_data ?>" <?php if($techgorilla_meta_data == 1) { echo 'checked'; } ?> size="30"/>
    </p>
    <p>
        <label for="techgorilla-post-class"><?php _e( "Post Border", 'example' ); ?></label>
        <input class="widefat" type="checkbox" name="techgorilla-post-border" value="<?php echo $techgorilla_post_border ?>" <?php if($techgorilla_post_border == 1) { echo 'checked'; } ?> size="30"/>
    </p>
    <p>
        <label for="techgorilla-post-class"><?php _e( "Layout", 'example' ); ?></label>
        <select name="techgorilla-layout" id="techgorilla-layout">
            <option value="container" <?php selected($techgorilla_layout, 'container'); ?>>Container</option>
            <option value="fullwidth" <?php selected($techgorilla_layout, 'fullwidth'); ?>>Full Width</option>
            <option value="none" <?php selected($techgorilla_layout, 'none'); ?>>No formatting</option>
        </select>
    </p>
<?php }

/* Save the meta box's post metadata. */
function techgorilla_save_post_class_meta( $post_id, $post ) {

    /* Verify the nonce before proceeding. */
    if ( !isset( $_POST['contenthead_nonce'] ) || !wp_verify_nonce( $_POST['contenthead_nonce'], basename( __FILE__ ) ) )
        return $post_id;

    /* Get the post type object. */
    $post_type = get_post_type_object( $post->post_type );

    /* Check if the current user has permission to edit the post. */
    if ( !current_user_can( $post_type->cap->edit_post, $post_id ) )
        return $post_id;

    /* Get the posted data and sanitize it for use as an HTML class. */
    $new_meta_value = ( isset( $_POST['techgorilla-post-class'] ) ? sanitize_html_class( $_POST['techgorilla-post-class'] ) : '' );

    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE )
        return $post_id;

    /* Get the meta key. */
    $meta_key = 'contenthead';

    /* Get the meta value of the custom field key. */
    $meta_value = get_post_meta( $post_id, $meta_key, true );
    /**
     * Saving custom values
     */
    $techgorilla_sidebar = isset($_POST['techgorilla-sidebar']) ? '1' : '0';
    update_post_meta($post_id, '_techgorilla_sidebar', $techgorilla_sidebar);

    $techgorilla_header = isset($_POST['techgorilla-header']) ? '1' : '0';
    update_post_meta($post_id, '_techgorilla_header', $techgorilla_header);

    $techgorilla_meta_data = isset($_POST['techgorilla-meta-data']) ? '1' : '0';
    update_post_meta($post_id, '_techgorilla_meta_data', $techgorilla_meta_data);

    $techgorilla_post_border = isset($_POST['techgorilla-post-border']) ? '1' : '0';
    update_post_meta($post_id, '_techgorilla_post_border', $techgorilla_post_border);

    $techgorilla_layout = $_POST['techgorilla-layout'];
    update_post_meta($post_id, '_techgorilla_layout', $techgorilla_layout);

    /* If a new meta value was added and there was no previous value, add it. */
    if ( $new_meta_value && '' == $meta_value )
        add_post_meta( $post_id, $meta_key, $new_meta_value, true );

    /* If the new meta value does not match the old value, update it. */
    elseif ( $new_meta_value && $new_meta_value != $meta_value )
        update_post_meta( $post_id, $meta_key, $new_meta_value );

    /* If there is no new meta value but an old value exists, delete it. */
    elseif ( '' == $new_meta_value && $meta_value )
        delete_post_meta( $post_id, $meta_key, $meta_value );
}
/* Filter the post class hook with our custom post class function. */
add_filter( 'post_class', 'contenthead' );
function contenthead( $classes ) {
    /* Get the current post ID. */
    $post_id = get_the_ID();
    /* If we have a post ID, proceed. */
    if ( !empty( $post_id ) ) {
        /* Get the custom post class. */
        $post_class = get_post_meta( $post_id, 'contenthead', true );

        /* If a post class was input, sanitize it and add it to the post class array. */
        if ( !empty( $post_class ) )
            $classes[] = sanitize_html_class( $post_class );
    }
    return $classes;
}
function my_nav_menu_submenu_css_class( $classes ) {
    $classes[] = 'dropdown-menu';
    return $classes;
}
add_filter( 'nav_menu_submenu_css_class', 'my_nav_menu_submenu_css_class' );
