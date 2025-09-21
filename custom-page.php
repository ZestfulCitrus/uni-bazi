<?php
/*
Template Name: 完全自定义页面
Template Post Type: page
*/
get_header();
?>
<html>
  <head>
    <link rel="stylesheet" href="/assets/uni.c44f1cf6.css">

    <meta charset="UTF-8" />
    <script>
      var coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') ||
        CSS.supports('top: constant(a)'))
      document.write(
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
        (coverSupport ? ', viewport-fit=cover' : '') + '" />')
    </script>
    <title></title>
    <!--preload-links-->
    <!--app-context-->
    <script type="module" crossorigin src="/assets/index-B_1x74E5.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CH07yiPe.css">
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <?php get_sidebar(); ?>
  </body>
</html>
<?php
get_footer();