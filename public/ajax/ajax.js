let readRecordPasswordDetails;

$(document).ready(function () {
  readRecordPasswordDetails = () => {
    let readRecord = "readRecord";
    $.ajax({
      url: "readPasswordDetails",
      type: "post",
      data: {
        readRecord: readRecord,
      },
      success(data) {
        let records = data;
        let tbody = $("tbody");
        tbody.html("");

        records.forEach((row) => {
          tbody.append(`
            <tr>
            <td>${row.categoryName}</td>
             <td><button class="btn btn-outline-info" onclick = "viewPasswordDetails('${row._id}')"><i class="fas fa-eye"></i></button>
            <td><button class="btn btn-outline-primary" onclick = "editPasswordDetails('${row._id}')"><i class="fas fa-pencil-alt"></i></button>
            <td><button class="btn btn-outline-danger" onclick = "deletePasswordDetails('${row._id}')"><i class="fas fa-trash"></i></button>
            </tr>
            `);
        });
      },
      error(err) {
        alert("Something Went Wrong");
      },
    });
  };

  readRecordPasswordDetails();

  // ------------------>> CREATE OPERATION
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
