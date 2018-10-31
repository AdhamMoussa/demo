import $ from "jquery";

$(function() {
  // left pane toggle
  const pageRow = $(".page-layout__row");
  const leftPane = $(".page-layout__left-pane");
  const toggleIcon = $(".left-pane__toggle");
  const leftPaneLinks = $(".left-pane__link-wrapper");
  const leftPaneNestedLinks = $(".left-pane__nested-links");
  const menuIcon = $("#menu-icon");
  const pageOverlay = $("#page-overlay");

  //dashboard link arrow
  const dashboardArrowLinks = $("[data-toggle=collapse]");

  // form file-input
  // const fileInputWrapper = $(".file-input");
  const fileInput = $(".file-input");

  // left pane toggle
  toggleIcon.click(() => {
    pageRow.toggleClass("hide-left");
    leftPaneNestedLinks.each(function(_, el) {
      $(el)
        .removeClass("show")
        .parent()
        .find(".left-pane__link-text span")
        .removeClass("on");
    });
  });
  leftPaneLinks.each(function(_, el) {
    $(el).click(function() {
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
  $(".left-pane__close").click(toggleFunc);

  // toggle arrow link on click
  dashboardArrowLinks.each(function(_, link) {
    $(link).click(function() {
      $(this)
        .find(".left-pane__link-text span")
        .toggleClass("on");
    });
  });

  // form file-input functionality
  if (fileInput.length > 0) {
    const fileInputFunc = el => {
      $(el)
        .find("input")
        .change(e => {
          if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            $(e.target)
              .siblings("span")
              .html(fileName);
          } else {
            const placeholder = $(el)
              .children("input")
              .attr("data-placeholder");
            $(e.target)
              .siblings("span")
              .html(placeholder);
          }
        });
      $(el)
        .find("span")
        .click(e => {
          $(e.target)
            .siblings("label")
            .click();
        });
    };
    fileInput.each((_, el) => fileInputFunc(el));
  }

  // new tender form validation
  const newTenderForm = $("#new-tender-form");
  if (newTenderForm.length > 0) {
    newTenderForm.submit(function(e) {
      const form = $(this)[0];
      if (form.details.value === "") {
        e.preventDefault();
        $(form.details).addClass("invalid-input");
        $(form.details)
          .siblings(".invalid-input-msg")
          .addClass("invalid-input-msg--visible");
        $(form.details).keyup(function() {
          if (form.details.value.length > 0) {
            $(form.details).removeClass("invalid-input");
            $(form.details)
              .siblings(".invalid-input-msg")
              .removeClass("invalid-input-msg--visible");
          } else {
            $(form.details).addClass("invalid-input");
            $(form.details)
              .siblings(".invalid-input-msg")
              .addClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(form.details).removeClass("invalid-input");
        $(form.details)
          .siblings(".invalid-input-msg")
          .removeClass("invalid-input-msg--visible");
      }
      // pdf file input
      if (form.pdf.files.length === 0) {
        e.preventDefault();
        $(form.pdf)
          .siblings("#file-input-placeholder")
          .addClass("invalid-input");
        $("#file-input-invalid").addClass("invalid-input-msg--visible");
        $(form.pdf).change(function() {
          if (form.pdf.files.length === 1) {
            $(form.pdf)
              .siblings("#file-input-placeholder")
              .removeClass("invalid-input");
            $("#file-input-invalid").removeClass("invalid-input-msg--visible");
          } else {
            $(form.pdf)
              .siblings("#file-input-placeholder")
              .addClass("invalid-input");
            $("#file-input-invalid").addClass("invalid-input-msg--visible");
          }
        });
        //////////////////////
      } else {
        $(form.pdf)
          .siblings("#file-input-placeholder")
          .removeClass("invalid-input");
        $("#file-input-invalid").removeClass("invalid-input-msg--visible");
      }
      // date of interest
      if (form.dateOfInterest.value === "") {
        e.preventDefault();
        $(form.dateOfInterest).addClass("invalid-input");
        $("#interest-date-invalid").addClass("invalid-input-msg--visible");
        //////////////////////
      } else {
        $(form.dateOfInterest).removeClass("invalid-input");
        $("#interest-date-invalid").removeClass("invalid-input-msg--visible");
      }
      // querry date
      if (form.querryDate.value === "") {
        e.preventDefault();
        $(form.querryDate).addClass("invalid-input");
        $("#querry-date-invalid").addClass("invalid-input-msg--visible");
        //////////////////////
      } else {
        $(form.querryDate).removeClass("invalid-input");
        $("#querry-date-invalid").removeClass("invalid-input-msg--visible");
      }
      // final date
      if (form.finalDate.value === "") {
        e.preventDefault();
        $(form.finalDate).addClass("invalid-input");
        $("#final-date-invalid").addClass("invalid-input-msg--visible");
      } else {
        $(form.finalDate).removeClass("invalid-input");
        $("#final-date-invalid").removeClass("invalid-input-msg--visible");
      }
      // CATEGORY
      if (form.category.value === "-1") {
        e.preventDefault();
        $(form.category).addClass("invalid-input");
        $("#category-invalid").addClass("invalid-input-msg--visible");
        $(form.category).change(function() {
          if (form.category.value === "-1") {
            $(form.category).addClass("invalid-input");
            $("#category-invalid").addClass("invalid-input-msg--visible");
          } else {
            $(form.category).removeClass("invalid-input");
            $("#category-invalid").removeClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(form.category).removeClass("invalid-input");
        $("#category-invalid").removeClass("invalid-input-msg--visible");
      }
      // CLASSIFICATION
      if (form.classification.value === "-1") {
        e.preventDefault();
        $(form.classification).addClass("invalid-input");
        $("#classification-invalid").addClass("invalid-input-msg--visible");
        $(form.classification).change(function() {
          if (form.classification.value === "-1") {
            $(form.classification).addClass("invalid-input");
            $("#classification-invalid").addClass("invalid-input-msg--visible");
          } else {
            $(form.classification).removeClass("invalid-input");
            $("#classification-invalid").removeClass(
              "invalid-input-msg--visible"
            );
          }
        });
      } else {
        $(form.classification).removeClass("invalid-input");
        $("#classification-invalid").removeClass("invalid-input-msg--visible");
      }
      // companies checkbox
      let count = 0;
      $(".company-checkbox").each(function() {
        if ($(this)[0].checked) count++;
        $(this).change(function() {
          if ($(this)[0].checked)
            $("#companies-checkbox-invalid").removeClass(
              "invalid-input-msg--visible"
            );
        });
      });
      if (count === 0) {
        $("#companies-checkbox-invalid").addClass("invalid-input-msg--visible");
      } else {
        $("#companies-checkbox-invalid").removeClass(
          "invalid-input-msg--visible"
        );
      }
    });
  }
  ////////////////////////
  // Company Info Form //
  //////////////////////
  const companyForm = $("#company-info-form");
  if (companyForm.length > 0) {
    companyForm.submit(function(e) {
      $("input.input").each(function() {
        if ($(this)[0].value.length === 0) {
          e.preventDefault();
          $(this).addClass("invalid-input");
          $(this)
            .siblings(".invalid-input-msg")
            .addClass("invalid-input-msg--visible");
          $(this).keyup(function() {
            if ($(this)[0].value.length > 0) {
              $(this).removeClass("invalid-input");
              $(this)
                .siblings(".invalid-input-msg")
                .removeClass("invalid-input-msg--visible");
            } else {
              $(this).addClass("invalid-input");
              $(this)
                .siblings(".invalid-input-msg")
                .addClass("invalid-input-msg--visible");
            }
          });
        }
      });
      // classification select
      if (companyForm[0].classification.value === "-1") {
        e.preventDefault();
        $(companyForm[0].classification).addClass("invalid-input");
        $("#invalid-classification-msg").addClass("invalid-input-msg--visible");
        $(companyForm[0].classification).change(function() {
          if (companyForm[0].classification.value === "-1") {
            $(companyForm[0].classification).addClass("invalid-input");
            $("#invalid-classification-msg").addClass(
              "invalid-input-msg--visible"
            );
          } else {
            $(companyForm[0].classification).removeClass("invalid-input");
            $(companyForm[0].classification);
            $("#invalid-classification-msg").removeClass(
              "invalid-input-msg--visible"
            );
          }
        });
      }
      // category checkboxes
      let count = 0;
      $(".category-input").each(function() {
        if ($(this)[0].checked) count++;
        $(this).change(function() {
          if ($(this)[0].checked)
            $("#category-invalid-msg").removeClass(
              "invalid-input-msg--visible"
            );
        });
      });
      if (count === 0) {
        e.preventDefault();
        $("#category-invalid-msg").addClass("invalid-input-msg--visible");
      } else {
        $("#category-invalid-msg").removeClass("invalid-input-msg--visible");
      }
      // QUESTIONS
      $(".company-info__form-checkbox-q").each(function() {
        const $current = $(this);
        let count = 0;
        $current.find("input[type=radio]").each(function() {
          if ($(this)[0].checked) count++;
          $(this).change(function() {
            if ($(this)[0].checked) {
              $current
                .find("span.invalid-input-msg")
                .removeClass("invalid-input-msg--visible");
            }
          });
        });
        if (count === 0) {
          $current
            .find("span.invalid-input-msg")
            .addClass("invalid-input-msg--visible");
        } else {
          $current
            .find("span.invalid-input-msg")
            .removeClass("invalid-input-msg--visible");
        }
      });
      // logo file input
      if (companyForm[0].logo.files.length === 0) {
        $(companyForm[0].logo)
          .siblings("#file-input-placeholder")
          .addClass("invalid-input");
        $("#invalid-logo-msg").addClass("invalid-input-msg--visible");
        $(companyForm[0].logo).change(function() {
          if (companyForm[0].logo.files.length === 0) {
            $(companyForm[0].logo)
              .siblings("#file-input-placeholder")
              .addClass("invalid-input");
            $("#invalid-logo-msg").addClass("invalid-input-msg--visible");
          } else {
            $(companyForm[0].logo)
              .siblings("#file-input-placeholder")
              .removeClass("invalid-input");
            $("#invalid-logo-msg").removeClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(companyForm[0].logo)
          .siblings("#file-input-placeholder")
          .removeClass("invalid-input");
        $("#invalid-logo-msg").removeClass("invalid-input-msg--visible");
      }
      // license file
      if (companyForm[0].license.files.length === 0) {
        $(companyForm[0].license)
          .siblings("#file-input-placeholder")
          .addClass("invalid-input");
        $("#invalid-license-msg").addClass("invalid-input-msg--visible");
        $(companyForm[0].license).change(function() {
          if (companyForm[0].license.files.length === 0) {
            $(companyForm[0].license)
              .siblings("#file-input-placeholder")
              .addClass("invalid-input");
            $("#invalid-license-msg").addClass("invalid-input-msg--visible");
          } else {
            $(companyForm[0].license)
              .siblings("#file-input-placeholder")
              .removeClass("invalid-input");
            $("#invalid-license-msg").removeClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(companyForm[0].license)
          .siblings("#file-input-placeholder")
          .removeClass("invalid-input");
        $("#invalid-license-msg").removeClass("invalid-input-msg--visible");
      }
    });
  }
  //////////////////
  // querry form //
  ////////////////
  const querryForm = $("#querry-form");
  if (querryForm.length > 0) {
    querryForm.submit(function(e) {
      if (querryForm[0].querry.value === "") {
        e.preventDefault();
        $(querryForm[0].querry).addClass("invalid-input");
        $("#invalid-querry-msg").addClass("invalid-input-msg--visible");
        $(querryForm[0].querry).keyup(function() {
          if (querryForm[0].querry.value === "") {
            $(querryForm[0].querry).addClass("invalid-input");
            $("#invalid-querry-msg").addClass("invalid-input-msg--visible");
          } else {
            $(querryForm[0].querry).removeClass("invalid-input");
            $("#invalid-querry-msg").removeClass("invalid-input-msg--visible");
          }
        });
      }
    });
  }
  ///////////////
  // bid form //
  /////////////
  const bidForm = $("#bid-form");
  if (bidForm.length > 0) {
    bidForm.submit(function(e) {
      if (bidForm[0].bidDetails.value.length === 0) {
        e.preventDefault();
        $(bidForm[0].bidDetails)
          .addClass("invalid-input")
          .siblings(".invalid-input-msg")
          .addClass("invalid-input-msg--visible");
        $(bidForm[0].bidDetails).keyup(function() {
          if (bidForm[0].bidDetails.value.length === 0) {
            $(bidForm[0].bidDetails)
              .addClass("invalid-input")
              .siblings(".invalid-input-msg")
              .addClass("invalid-input-msg--visible");
          } else {
            $(bidForm[0].bidDetails)
              .removeClass("invalid-input")
              .siblings(".invalid-input-msg")
              .removeClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(bidForm[0].bidDetails)
          .removeClass("invalid-input")
          .siblings(".invalid-input-msg")
          .removeClass("invalid-input-msg--visible");
      }
      if (bidForm[0].bidAmount.value.length === 0) {
        e.preventDefault();
        $(bidForm[0].bidAmount)
          .addClass("invalid-input")
          .siblings(".invalid-input-msg")
          .addClass("invalid-input-msg--visible");
        $(bidForm[0].bidAmount).keyup(function() {
          if (bidForm[0].bidAmount.value.length === 0) {
            $(bidForm[0].bidAmount)
              .addClass("invalid-input")
              .siblings(".invalid-input-msg")
              .addClass("invalid-input-msg--visible");
          } else {
            $(bidForm[0].bidAmount)
              .removeClass("invalid-input")
              .siblings(".invalid-input-msg")
              .removeClass("invalid-input-msg--visible");
          }
        });
      } else {
        $(bidForm[0].bidAmount)
          .removeClass("invalid-input")
          .siblings(".invalid-input-msg")
          .removeClass("invalid-input-msg--visible");
      }
    });
  }
  ////////////////////
  // send doc form //
  //////////////////
  const sendDocForm = $("#send-doc-form");
  if(sendDocForm.length > 0) {
    sendDocForm.submit(function (e) {
      if (sendDocForm[0].docURL.value.length === 0) {
        e.preventDefault();
        $(sendDocForm[0].docURL).addClass("invalid-input").siblings(".invalid-input-msg").addClass("invalid-input-msg--visible");
        $(sendDocForm[0].docURL).keyup(function() {
          if (sendDocForm[0].docURL.value.length === 0) {
            $(sendDocForm[0].docURL)
              .addClass("invalid-input")
              .siblings(".invalid-input-msg")
              .addClass("invalid-input-msg--visible");
          } else {
            $(sendDocForm[0].docURL)
              .removeClass("invalid-input")
              .siblings(".invalid-input-msg")
              .removeClass("invalid-input-msg--visible");
          }
        });
      }
    });
  }
});
