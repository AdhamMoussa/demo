import $ from "jquery";

$(function() {
  // left pane toggle
  const pageRow = $('.page-layout__row');
  const leftPane = $('.page-layout__left-pane');
  const toggleIcon = $('.left-pane__toggle');
  const leftPaneLinks = $('.left-pane__link-wrapper');
  const leftPaneNestedLinks = $('.left-pane__nested-links');
  const menuIcon = $('#menu-icon');
  const pageOverlay = $('#page-overlay');

  //dashboard link arrow
  const dashboardArrowLinks = $('[data-toggle=collapse]');

  // form file-input
  // const fileInputWrapper = $(".file-input");
  const fileInput = $(".file-input");

  // left pane toggle
  toggleIcon.click(() => {
    pageRow.toggleClass("hide-left");
    leftPaneNestedLinks.each(function (_, el) {
      $(el).removeClass("show").parent().find('.left-pane__link-text span').removeClass('on');
    });

  });
  leftPaneLinks.each(function (_, el) {
    $(el).click(function () {
      pageRow.removeClass("hide-left");
    });
  });
  const toggleFunc = () => {
    if (leftPane.hasClass("page-layout__left-pane--show")) {
      pageOverlay.fadeOut();
    } else {
      pageOverlay.fadeIn();
    }
    leftPane.toggleClass("page-layout__left-pane--show");
  };
  menuIcon.click(toggleFunc);
  pageOverlay.click(toggleFunc);
  $('.left-pane__close').click(toggleFunc);


  // toggle arrow link on click
  dashboardArrowLinks.each(function (_, link) {
    $(link).click(function () {
      $(this).find('.left-pane__link-text span').toggleClass('on');
    });
  });

  // form file-input functionality
  if (fileInput.length > 0) {
    const fileInputFunc = (el)  => {
      $(el).find("input").change(e => {
        if (e.target.files.length > 0) {
          const fileName = e.target.files[0].name;
          $(e.target).siblings("span").html(fileName);
        } else {
          const placeholder = $(el).children("input").attr("data-placeholder");
          $(e.target).siblings("span").html(placeholder);
        }
      });
      $(el).find("span").click(e => {
        $(e.target).siblings("label").click();
      });
    };
    fileInput.each((_, el) => fileInputFunc(el));
  }
});
