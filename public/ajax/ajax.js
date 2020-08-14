let readRecordPasswordDetails;

$(document).ready(function () {
  //-------------------------->> READ OPERATION

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
        readRecordPasswordDetails();
      },
      error(err) {
        alert("Something Went Wrong");
      },
    });
  });

  //---------------------------->> UPDATE OPERATION
  $("#updatePasswordDetailsForm").on("submit", function (e) {
    e.preventDefault();

    let updateId = $("#updateId").val();
    let updateCategoryName = $("#updateCategoryName").val();
    let updatePasswordDetailsValue = CKEDITOR.instances.updatePasswordDetails.getData();

    $.ajax({
      url: "/updatePasswordDetails",
      type: "post",
      data: {
        updateId: updateId,
        updateCategoryName: updateCategoryName,
        updatePasswordDetailsValue: updatePasswordDetailsValue,
      },
      success(data) {
        $("#updatePasswordDetailsModal").modal("hide");
        readRecordPasswordDetails();
        alert(data);
      },
      error() {
        alert("Something Went Wrong");
      },
    });
  });
});

//---------------------------->> EDIT OPERATION

const editPasswordDetails = (id) => {
  let editId = id;

  $.ajax({
    url: "/editPasswordDetails",
    type: "post",
    data: {
      editId: editId,
    },
    success(data) {
      $("#updateCategoryName").val(data.categoryName);
      $("#updateId").val(data._id);
      CKEDITOR.instances["updatePasswordDetails"].setData(data.passwordDetails);
    },
    error() {
      alert("Something Went Wrong");
    },
  });

  $("#updatePasswordDetailsModal").modal("show");
};

//---------------------------->> VIEW OPERATION

const viewPasswordDetails = (id) => {
  let viewId = id;

  $.ajax({
    url: "/viewPasswordDetails",
    type: "post",
    data: {
      viewId: viewId,
    },
    success(data) {
      $("#viewDetails").html(data);
    },
    error() {
      alert("Something Went Wrong");
    },
  });

  $("#viewPasswordDetailsModal").modal("show");
};

//---------------------------->> DELETE OPERATION

const deletePasswordDetails = (id) => {
  let deleteId = id;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: "/deletePasswordDetails",
        type: "post",
        data: {
          deleteId: deleteId,
        },
        success(data) {
          alert(data);
          readRecordPasswordDetails();
        },
        error() {
          alert("Something Went Wrong");
        },
      });
    }
  });
};
