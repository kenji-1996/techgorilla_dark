<?php //removed from header.php ?>
<!-- BEGIN Analytics
<script type="text/javascript">
    var _paq = _paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u="http://analytics.mivocloud.com/";
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
</script>
<noscript><p><img src="http://analytics.mivocloud.com/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>
<!-- END Analytics -->

<!-- BEGIN Facebook JavaScript SDK -->
<!-- <div id="fb-root"></div>
<script>
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "../connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>  -->
<!-- END Facebook JavaScript SDK -->

<!--
<script>
    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "../platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
</script>
<!-- END Twitter for Websites Widget -->

<?php //removed from header.php ?>
<!--
<script type="application/ld+json">
                {
                  "@context": "http://schema.org",
                  "@type": "Organization",
                  "url": "https://www.mivocloud.com",
                  "logo": "https://www.mivocloud.com/images/logo_big.png",
                  "name" : "MivoCloud",
                  "contactPoint" : [{
                      "@type" : "ContactPoint",
                      "telephone" : "+373 795 10001",
                      "contactType" : "customer support"
                  }],
                  "sameAs" : [
                      "https://www.facebook.com/MivoCloud/",
                      "https://twitter.com/mivocloud"
                  ]
                }
            </script>
<script type="application/ld+json">
                {
              "@context" : "http://schema.org",
              "@type" : "WebSite",
              "name" : "MivoCloud",
              "url" : "https://www.mivocloud.com"
            }
            </script>
-->

<?php //removed from content.php ?>
<!--
<section id="slider" class="slider dark" style="background: url('media/1/theme/slider_bg.png') center; background-size: cover;" data-height-xxs="550" data-height-xs="450" data-height-sm="400" data-height-md="430" data-height-lg="450">
    <div class="row clearfix">
        <div class="heading-block title-center topmargin">
            <h1 data-style-xxs="font-size: 21px; font-weight: 300;" data-style-xs="font-size: 23px; font-weight: 300;" data-style-sm="font-size: 30px; font-weight: 300;" data-style-md="font-size: 36px; font-weight: 300;" data-style-lg="font-size: 39px; font-weight: 300;">It's time for <strong>Truly Cloud Servers</strong>.<br /><strong>SSD Cloud Hosting</strong> made simple for you.<br /><strong>IaaS Platform</strong> that saves your costs.<br /><strong>KVM</strong> Virtualization and <strong>SSD</strong> Storage.</h1>
        </div>
    </div>
</section>
<section id="content">
    <div class="col-md-3 dark ohidden nobottommargin" style="height: 320px; background-color: #168a8f;">
        <div>
            <h3 class="center topmargin nobottommargin" style="font-size: 39px; font-weight: 300;">VPS</h3>
            <div class="pricing-price center"><span class="price-unit">&euro;</span>5<span class="price-tenure">/mo</span></div>
            <div class="center"><a href="vps.html" class="button button-border button-light button-rounded uppercase nomargin"><i class="icon-center"></i><span>See More</span></a></div>
        </div>
    </div>
    <div class="col-md-3 dark  ohidden nobottommargin" style="height: 320px; background-color: #063e53;">
        <div>
            <h3 class="center topmargin nobottommargin" style="font-size: 39px; font-weight: 300;">Dedicated</h3>
            <div class="pricing-price center"><span class="price-unit">&euro;</span>49<span class="price-tenure">/mo</span></div>
            <div class="center"><a href="dedicated-servers.html" class="button button-border button-light button-rounded uppercase nomargin"><i class="icon-center"></i><span>See More</span></a></div>
        </div>
    </div>
    <div class="col-md-3 dark  ohidden nobottommargin" style="height: 320px; background-color: #e74c3c;">
        <div>
            <h3 class="center topmargin nobottommargin" style="font-size: 39px; font-weight: 300;">IaaS</h3>
            <div class="pricing-price center"><span class="price-unit">&euro;</span>0,007<span class="price-tenure">/hour</span></div>
            <div class="center"><a href="features.html" class="button button-border button-light button-rounded uppercase nomargin"><i class="icon-center"></i><span>See More</span></a></div>
        </div>
    </div>
    <div class="col-md-3 dark  ohidden bottommargin-lg" style="height: 320px; background-color: #253939;">
        <div>
            <h3 class="center topmargin nobottommargin" style="font-size: 39px; font-weight: 300;">Web</h3>
            <div class="pricing-price center"><span class="price-unit">&euro;</span>25<span class="price-tenure">/year</span></div>
            <div class="center"><a href="web-hosting.html" class="button button-border button-light button-rounded uppercase nomargin"><i class="icon-center"></i><span>See More</span></a></div>
        </div>
        <div class="clear"></div>
    </div>
</section>
<div id="contact">
    <div class="promo promo-light promo-full nobottommargin" style="background-color: #efefef;">
        <div class="container clearfix">
            <h3 data-style-lg="font-size: 27px; font-weight: 500;">Want a <span>Consultation</span> or an <span>Advice</span>? Ask a MivoCloud <span>Expert</span>. It's <span>Free</span>.</h3>
            <span data-style-lg="font-size: 19px; font-weight: 300;">Our customer support is ready 24/7/365 to help you. Don't guess, just ask now.</span>
            <a href="contact-us.html" class="button button-xlarge button-rounded" style="background-color: #0193b7;">Contact Us</a>
        </div>
    </div>
</div>
-->
