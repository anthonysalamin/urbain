/*
 * 🟠 URBAIN | thumbnail info V.5
 * build: 25.09.2021 00:19 | anthonysalamin.ch
 * dependencies: gsap@3.7.1
 * TO DO:
 * 1) dynamic lightbox json script + dynamic items into the jason
 */

document.addEventListener("DOMContentLoaded", () => {
  imageManagement();
}); // end DOM loaded

// 🍏 imageManagement definition
function imageManagement() {
  // globals
  const log = console.log,
    ROOT_URL = "uploads-ssl.webflow.com",
    SITE_ID = "6141f41868c3e33a265cbfe7", // 👈🏻 replace by production site_id
    START_IMAGE = "61422529bd2258423c3f26ad_042", // 👈🏻 replace by the start image
    FORMAT = "jpg";
  const BREAKPOINTS = {
    mobilePortrait: { min: 240, max: 479 },
    mobileLandscape: { min: 480, max: 767 },
    tablet: { min: 768, max: 991 },
    desktop: { min: 992, max: 4000 }
  };
  const thumbnails = document.querySelectorAll(".link-thumb"),
    wrapSticky = document.querySelector(".wrap-sticky"),
    crossClose = document.querySelector(".wrap-ctn-close"),
    overlayMobile = document.querySelector(".overlay-mobile"),
    wrapperImage = document.querySelector(".wrap-img-big");
  let stickyNumber = document.getElementById("infonumber"),
    stickyWidth = document.getElementById("infowidth"),
    stickyHeight = document.getElementById("infoheight"),
    imageInfo = document.getElementById("infoimage");

  // 🥝 dynamic image definition
  function createImage(id, className, src, alt) {
    const IMAGE = document.createElement("img");
    IMAGE.id = id;
    IMAGE.class = className;
    IMAGE.src = src;
    IMAGE.alt = alt;
    return IMAGE;
  } // end createImage()

  // 🥝 dynamic image expression
  let stickyImage = createImage(
    "infoimage",
    "img",
    `https://${ROOT_URL}/${SITE_ID}/${START_IMAGE}.${FORMAT}`,
    "© Urbain Salamin"
  );

  // 🥝 append dynamic image into its wrapper
  wrapperImage.append(stickyImage);

  // 🍊 dynamicInfoInjection() definition
  function dynamicInfoInjection() {
    // for every thumbnail
    Array.from(thumbnails).forEach((thumbnail) => {
      // listen on click
      thumbnail.addEventListener("click", () => {
        // get thumbnail image info
        const thumbImage = thumbnail
            .querySelector(".img")
            .src.split("/")[4]
            .split(".")[0],
          thumbNumber = thumbnail.querySelector(".number").textContent,
          thumbWidth = thumbnail.querySelector(".width").textContent,
          thumbHeight = thumbnail.querySelector(".height").textContent;

        // inject thumbnail image info into sticky wrapper section
        stickyImage.src = `https://${ROOT_URL}/${SITE_ID}/${thumbImage}.${FORMAT}`;
        stickyNumber.textContent = thumbNumber;
        stickyWidth.textContent = thumbWidth;
        stickyHeight.textContent = thumbHeight;
      }); // end click listener
    }); // end for each thumbnails
  } // end dynamicInfoInjection()

  // 🥬 mobileHandling() definition
  function mobileHandling() {
    // globals
    const duration = 0.45, // 👈🏻 in seconds
      easing = Expo.easeOut;

    // ⚙️ open sticky on thumb click
    Array.from(thumbnails).forEach((thumb) => {
      thumb.addEventListener("click", () => {
        
        // 🍇 animate cross rotation on open
        TweenMax.to(crossClose, duration / 2, {
          ease: easing,
          transform: "rotateZ(0deg)"
        });

        // 🍇 animate overlay on open
        TweenMax.to(overlayMobile, duration, {
          ease: easing,
          display: "block",
          opacity: "1"
        });

        // 🍇 animate sticky wrapper on open
        TweenMax.to(wrapSticky, duration, {
          ease: easing,
          transform: "translateY(0%)",
          opacity: "1"
        }).delay(0.2);
      }); // end click listener
    }); // end for each thumbnails

    // ⚙️close sticky panel on cross click
    crossClose.addEventListener("click", () => {
      log("closed");

      // 🍈 animate cross rotation on close
      TweenMax.to(crossClose, duration / 2, {
        ease: easing,
        transform: "rotateZ(45deg)"
      });

      // 🍈 animate sticky wrapper on close
      TweenMax.to(wrapSticky, duration, {
        ease: easing,
        transform: "translateY(110%)",
        opacity: "0"
      });

      // 🍈 animate overlay on close
      TweenMax.to(overlayMobile, duration, {
        ease: easing,
        opacity: "0",
        display: "none"
      });
    });
  } // end mobileHandling()

  // 🥕 calculate window's width
  function reportWindowSize() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return width;
  } // end browserWidth()

  // 🥒 debounce function
  function debounce(func, wait) {
    let timeout;
    return () => {
      let context = this; // arguments "func" and "wait"
      let later = () => {
        func.apply(context);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }; // end return
  } // end debounce()

  // 🍋 decide which breakpoint to use
  function breakpointChoice() {
    if (reportWindowSize() >= BREAKPOINTS.mobileLandscape.min) {
      log("desktop breakpoint");
      dynamicInfoInjection();
    } else {
      log("mobile breakpoint");
      dynamicInfoInjection();
      mobileHandling();
    }
  } // end breakpointChoice()

  // 🥥 run breakpointChoice() on loaded and on resize events
  breakpointChoice();
  window.addEventListener("resize", debounce(breakpointChoice, 150));
} // end imageManagement()

// go get a 🍹