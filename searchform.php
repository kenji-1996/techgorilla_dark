<?php
/**
 * Template for displaying search forms in Twenty Seventeen
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
<form action="<?php echo esc_url( home_url( '/' ) ); ?>"  method="get" id="domain-search" class="wow fadeIn domain-search" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;">
    <input id="domain-text" type="text" value="<?php echo get_search_query(); ?>" name="s" placeholder="Search..">
    <!--<button id="search-btn" type="submit" name="submit" value="Search"> <img src="http://demo.nrgthemes.com/projects/valence/wp-content/themes/valence/assets/img/search.svg" alt="search icon"> </button>-->
    <input type="submit"
           style="position: absolute; left: -9999px; width: 1px; height: 1px;"
           tabindex="-1" />
</form>