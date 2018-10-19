import $ from "jquery";

$(function() {
  // form file-input
  const fileInput = $("#pdf-input");
  const fileInputLabel = $("#pdf-input ~ label");
  const fileInputPlaceholder = $("#pdf-input-placeholder");


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
