$(document).ready(function () {
  $("#passwordDetailsForm").on("submit", function (e) {
    e.preventDefault();

    let categoryName = $("#categoryName").val();
    let passwordDetails = CKEDITOR.instances.passwordDetails.getData();

    $.ajax({
      url: "/addPasswordDetails",
      method: "post",
      data: {
        categoryName: categoryName,
        passwordDetails: passwordDetails,
      },
      success(data) {
        $("#passwordDetailsModal").modal("hide");
        $("#passwordDetailsForm").trigger("reset");
        CKEDITOR.instances["passwordDetails"].setData(null);
        alert("Data Successfully Inserted");
      },
      error(err) {
        alert("Something Went Wrong");
      },
    });
  });
});
