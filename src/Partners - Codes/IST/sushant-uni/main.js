  // its--------------------------//
  
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.ist-tab-content');
  
  tabs.forEach(btn => {
	btn.addEventListener('click', () => {
	  
	  // remove active from all
	  tabs.forEach(b => b.classList.remove('active'));
	  contents.forEach(c => c.classList.remove('active'));
  
	  // activate current
	  btn.classList.add('active');
	  document.getElementById(btn.dataset.tab).classList.add('active');
	});
  });
  // its--------------------------//

  if(jQuery('.industry-expert-carousel').length > 0){
	if(jQuery(window).width() < 768){
		if(jQuery('.industry-expert-carousel > .industry-expert-carousel-item').length > 1){
			ip_cr_val2 = true;
		}
		else{
			ip_cr_val2 = false;
		}
	}else {
		if(jQuery('.industry-expert-carousel > .industry-expert-carousel-item').length > 4){
			ip_cr_val2 = true;
		}
		else{
			ip_cr_val2 = false;
		}
	}
	  
      jQuery('.industry-expert-carousel').slick({
          dots:ip_cr_val2,	
		  arrows: ip_cr_val2,	
		  infinite: false,	
		  fade: false,	
		  prevArrow:"<button type='button' class='slick-line-prev' aria-label='lineprev'><span class='vid-angle-left'></span></button>",	
		  nextArrow:"<button type='button' class='slick-line-next' aria-label='linenext'><span class='vid-angle-right'></span></button>",	
		  infinite: true, 	
		  speed: 1000,
          slidesToShow:4,
          slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 1000,
		  arrows:true,
          responsive: [
          {
            breakpoint: 1200,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1
            }
          },
          {
            breakpoint: 991,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1
            }
          },
		  {
            breakpoint: 767,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
          },
          {
            breakpoint:480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
          }
          ]
      });
}

if(jQuery('.industry-expert-carousel1').length > 0){
	if(jQuery(window).width() < 768){
		if(jQuery('.industry-expert-carousel1 > .industry-expert-carousel-item').length > 1){
			ip_cr_val2 = true;
		}
		else{
			ip_cr_val2 = false;
		}
	}else {
		if(jQuery('.industry-expert-carousel1 > .industry-expert-carousel-item').length > 4){
			ip_cr_val2 = true;
		}
		else{
			ip_cr_val2 = false;
		}
	}
	  
      jQuery('.industry-expert-carousel1').slick({
          dots:false,	
		  arrows: true,	
		  infinite: false,	
		  fade: false,	
		  prevArrow:"<button type='button' class='slick-line-prev' aria-label='lineprev'><span class='vid-angle-left'></span></button>",	
		  nextArrow:"<button type='button' class='slick-line-next' aria-label='linenext'><span class='vid-angle-right'></span></button>",	
		  infinite: true, 	
		  speed: 1000,
          slidesToShow:4,
          slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 1000,
          responsive: [
          {
            breakpoint: 1200,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1
            }
          },
          {
            breakpoint: 991,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1
            }
          },
		  {
            breakpoint: 767,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
          },
          {
            breakpoint:480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
          }
          ]
      });
}

jQuery('.single-alumini-image-carousel-wrapper1').slick({
	dots: false,
	arrows: false,
	autoplay: true,
	autoplaySpeed:0,			
	infinite: true,
	speed:2000,
	slidesToShow:8,
	slidesToScroll: 1,
	draggable: false,
	swipe: false,
	touchMove:false,
	responsive: [
	  {
		breakpoint: 2200,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1900,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1600,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1200,
		settings: {
		slidesToShow: 4,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint:767,
		settings: {
		slidesToShow:3,
		slidesToScroll: 1,
		centerMode:false
		}
	  },
	  {
		breakpoint:575,
		settings: {
		slidesToShow:2,
		slidesToScroll: 1,
		centerMode:false
		}
	  }
	  ]
});
jQuery('.single-alumini-image-carousel-wrapper2').slick({
	dots:false,	
	  arrows:false,
	  autoplay: true,
	  autoplaySpeed:0,
	  infinite: true,	
	  speed:2000,
	  slidesToShow:8,
	  slidesToScroll: 1,
	  
	  rtl: true,
	  responsive: [
	  {
		breakpoint: 2200,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1900,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1600,
		settings: {
		slidesToShow:8,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint: 1200,
		settings: {
		slidesToShow: 4,
		slidesToScroll: 1
		}
	  },
	  {
		breakpoint:767,
		settings: {
		slidesToShow:3,
		slidesToScroll: 1,
		centerMode:false
		}
	  },
	  {
		breakpoint:575,
		settings: {
		slidesToShow:2,
		slidesToScroll: 1,
		centerMode:false
		}
	  }
	  ]
});


jQuery(document).on('click','.faq-tab',function () {
	var iddisplay =  jQuery(this).attr('data');
	jQuery('.faq-tab').removeClass('active');
	jQuery('#faq-tab-accordian .faq-tab-accordian-content').hide();
	
	jQuery('#faq-tab-accordian .faq-tab-accordian-content#'+iddisplay).show();
	jQuery(this).addClass('active');	
});
const faqContainers = document.querySelectorAll('.faq-tab-accordian-content');

faqContainers.forEach(container => {
	const faqItems = container.querySelectorAll('.ip-faq-item');
	const faqviewMoreBtn = container.querySelector('.master-faq-view-more-btn');

	function faq_initializeView() {
		if (faqItems.length > 4) {
			for (let i = 4; i < faqItems.length; i++) {
				faqItems[i].style.display = 'none';
			}
		} else {
			if (faqviewMoreBtn) faqviewMoreBtn.style.display = 'none'; 
		}
	}

	if (faqviewMoreBtn) {
		faqviewMoreBtn.addEventListener('click', function () {
			const isViewMore = faqviewMoreBtn.textContent.trim() === 'View More';
			if (isViewMore) {
				faqItems.forEach(item => (item.style.display = 'block'));
				faqviewMoreBtn.textContent = 'View Less';
				faqviewMoreBtn.classList.add('opened');
			} else {
				for (let i = 4; i < faqItems.length; i++) {
					faqItems[i].style.display = 'none';
				}
				faqviewMoreBtn.textContent = 'View More';
				faqviewMoreBtn.classList.remove('opened');
			}
		});
	}

	faq_initializeView();
});


// jQuery(window).scroll(function(){
//     if (jQuery(this).scrollTop() > 50) {
//        jQuery('#main-header').addClass('header-color');
//        jQuery('#main-header').removeClass('header-fixed');
//     } else {
//        jQuery('#main-header').removeClass('header-color');
//        jQuery('#main-header').addClass('header-fixed');
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("main-header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("header-color");
    header.classList.remove("header-fixed");
  } else {
    header.classList.remove("header-color");
    header.classList.add("header-fixed");
  }
});
})


document.addEventListener("DOMContentLoaded", function () {
	const mainHeader = document.getElementById("main-header");
	const navHeader = document.getElementById("ist-nav-header");
    console.log(navHeader,'navHeader')
  
	if (!mainHeader || !navHeader) return;
  
	const navHeaderOffset = navHeader.offsetTop;
  
	window.addEventListener("scroll", function () {
	  const scrollY = window.scrollY;
  
	  if (scrollY >= navHeaderOffset) {
		// Hide first header
		mainHeader.classList.add("hide");
  
		// Make second header sticky
		navHeader.classList.add("sticky");
	  } else {
		// Show first header
		mainHeader.classList.remove("hide");
  
		// Remove sticky from second header
		navHeader.classList.remove("sticky");
	  }
	});
  });


  document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".ist-nav-menu li a");
  const headerOffset = 60;

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) return;

      e.preventDefault();

      const target = document.querySelector(targetId);
      if (!target) return;

      // remove active class
      document
        .querySelectorAll(".ist-nav-menu li")
        .forEach(li => li.classList.remove("ist-active"));

      // add active to parent li
      link.parentElement.classList.add("ist-active");

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".ist-nav-menu li a");

  const mentorSection = document.getElementById("top-tech-leaders");
  const studentSection = document.getElementById("industry-expert");
  const facultySection = document.getElementById("industry-expert-second");

  const groupedSections = [mentorSection, studentSection, facultySection];

  window.addEventListener("scroll", () => {
    const viewportMiddle = window.innerHeight * 0.4;
   
        const groupTop = mentorSection.getBoundingClientRect().top;
    

   
        const groupBottom = facultySection.getBoundingClientRect().bottom;
    
    
    

    menuLinks.forEach(link => {
      const li = link.parentElement;
      const targetId = link.getAttribute("href").replace("#", "");
      const section = document.getElementById(targetId);

      if (!section) return;

      

      if (targetId === "top-tech-leaders") {
        li.classList.toggle(
          "ist-active",
          groupTop <= viewportMiddle && groupBottom >= viewportMiddle
        );
      } 
      else {
        const rect = section.getBoundingClientRect();
        li.classList.toggle(
          "ist-active",
          rect.top <= viewportMiddle && rect.bottom >= viewportMiddle
        );
      }
   
    });
  });
});





















// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll(".ist-nav-menu li a");
//   const sections = document.querySelectorAll("section[id]");
//   const headerOffset = 80;

//   // CLICK (your existing logic improved slightly)
//   links.forEach(link => {
//     link.addEventListener("click", (e) => {
//       const targetId = link.getAttribute("href");

//       if (!targetId || !targetId.startsWith("#")) return;

//       e.preventDefault();

//       const target = document.querySelector(targetId);
//       if (!target) return;

//       const targetPosition =
//         target.offsetTop - headerOffset;

//       window.scrollTo({
//         top: targetPosition,
//         behavior: "smooth"
//       });
//     });
//   });

//   // SCROLL (this is what you're missing)
//   window.addEventListener("scroll", () => {
//     let currentSection = "";

//     sections.forEach(section => {
//       const sectionTop = section.offsetTop - headerOffset;
//       const sectionHeight = section.offsetHeight;

//       if (
//         window.pageYOffset >= sectionTop &&
//         window.pageYOffset < sectionTop + sectionHeight
//       ) {
//         currentSection = section.getAttribute("id");
//       }
//     });

//     // update active class
//     document
//       .querySelectorAll(".ist-nav-menu li")
//       .forEach(li => li.classList.remove("ist-active"));

//     if (currentSection) {
//       const activeLink = document.querySelector(
//         `.ist-nav-menu li a[href="#${currentSection}"]`
//       );

//       if (activeLink) {
//         activeLink.parentElement.classList.add("ist-active");
//       }
//     }
//   });
// });