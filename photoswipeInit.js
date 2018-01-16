var galleryInit = function(galleryElem) {
	// add PhotoSwipe (.pswp) element to DOM (minified)
	var pswpElement = $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>')
		.appendTo($('body'))[0];
	
	var items = []
	var images = galleryElem.find('figure[itemtype="http://schema.org/ImageObject"]');

	var galleryUid = galleryElem.attr("data-uid");
	if (!galleryUid) {
		galleryUid = 1;
	}
	images.each(function(index, item){
		var itemElem = $(item);

		var fullSizeElem = $(itemElem.find('a[itemprop="contentUrl"]')[0]);
		var fullSizeSrc = fullSizeElem.attr("href");
		var fullSize = fullSizeElem.attr("data-size").split('x');;
		var fullSizeWidth = fullSize[0];
		var fullSizeHeight = fullSize[1];

		var smallSizeElem = $(itemElem.find('img[itemprop="thumbnail"]')[0]);
		var smallSizeSrc = smallSizeElem.attr("src");
		var smallSizeWidth = parseInt($(itemElem.find('meta[itemprop="width"]')[0]).attr("content"));
		var smallSizeHeight = parseInt($(itemElem.find('meta[itemprop="height"]')[0]).attr("content"));

		var imgPid = smallSizeElem.attr("data-pid");

		var caption = $(itemElem.find('p[itemprop="caption"]')[0]).text();
		var description = $(itemElem.find('p[itemprop="description"]')[0]).text();

		items.push({
			pid: imgPid,
			src: fullSizeSrc,
			w: fullSizeWidth,
			h: fullSizeHeight,
			msrc: smallSizeSrc,
			title: caption,
			imgElem: smallSizeElem[0]
		});
	});

	$.each(items, function(idx, item) {
		$(item.imgElem).click(function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			var options = {
				getThumbBoundsFn: function(index) {
					var thumbnail = items[index].imgElem,
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect(); 
					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				},
				index: idx,
				galleryUID: galleryUid,
				history: true,
				preload: [0, 0],
				shareButtons: [
					{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
					{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
					{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
					{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
				],
				getImageURLForShare: function( shareButtonData ) {
					return item.src;
				},
				getPageURLForShare: function( shareButtonData ) {
					return window.location.href;
				},
				getTextForShare: function( shareButtonData ) {
					return item.title || '';
				}
			};
			var photoSwipeGallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			photoSwipeGallery.init();
		});
	});
}
$(window).on('load', function() {
	$.each($.find(".photoSwipeGallery"), function(idx, el) {
		galleryInit($(el))
	})
});