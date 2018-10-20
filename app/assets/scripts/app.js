import $ from "jquery";

$(function() {
  // left pane toggle
  const pageRow = $('.page-layout__row');
  const toggleIcon = $('.left-pane__toggle');
  const leftPaneLinks = $('.left-pane__link-wrapper');
  const leftPaneNestedLinks = $('.left-pane__nested-links');

  //dashboard link arrow
  const dashboardArrowLinks = $('[data-toggle=collapse]');

  // form file-input
  const fileInput = $("#pdf-input");
  const fileInputLabel = $("#pdf-input ~ label");
  const fileInputPlaceholder = $("#pdf-input-placeholder");

  // left pane toggle
  toggleIcon.click(() => {
    pageRow.toggleClass("hide-left");
    leftPaneNestedLinks.each(function (_, el) {
      $(el).removeClass("show");
    });

  });
  leftPaneLinks.each(function (_, el) {
    $(el).click(function () {
      pageRow.removeClass("hide-left");
    });
  });

  // toggle arrow link on click
  dashboardArrowLinks.each(function (_, link) {
    $(link).click(function () {
      $(this).find('.left-pane__link-text span').toggleClass('on');
    });
  });

  // form file-input functionality
  if (fileInput.length > 0) {
    fileInput.change(e => {
      if (fileInput[0].files.length > 0) {
        const fileName = fileInput[0].files[0].name;
        fileInputPlaceholder.html(fileName);
      } else {
        fileInputPlaceholder.html("PDF *");
      }
    });
    fileInputPlaceholder.click(() => {
      fileInputLabel.click();
    });
  }
});
