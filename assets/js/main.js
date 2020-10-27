var apiKey;
var accountKey;
var userUuid;
var institutionUuid;
var selectedPatientOrderUuid = null;

var cloudApi;
var accountUserList;
var accountUserInstitutionList;

function ConnectToApi() {
  document.getElementById("upload_container").style.display = "none";

  if (document.getElementById("accountKey").value) {
    accountKey = document.getElementById("accountKey").value;
  } else {
    alert("Account Key must be filled");
  }
  if (document.getElementById("apiKey").value) {
    apiKey = document.getElementById("apiKey").value;
  } else {
    alert("Api Key must be filled");
  }

  if (accountKey && apiKey) {
    ShowLoading();
    cloudApi = new postDicomCloudApi(apiKey, accountKey);
    cloudApi.Initialize(function (result) {
      console.log(result);
      if (result.Success) {
        var apiStartScreen = document.getElementById(
          "api_description_text_area"
        );
        var apiSelectProcessTypeScreen = document.getElementById(
          "api_select_process_type_area"
        );

        apiStartScreen.style.display = "none";
        apiSelectProcessTypeScreen.style.display = "block";
      } else {
        document.getElementById("upload_container").style.display = "none";
      }
      HideLoading();
    });
  } else {
    alert("Please fill all blanks");
  }
}

function ReturnSelectScreen() {
  document.getElementById("upload_container").style.display = "none";
  document.getElementById("search_container").style.display = "none";
  document.getElementById("folder_container").style.display = "none";
  document.getElementById("api_select_process_type_area").style.display =
    "block";
  document.getElementById("UserSelectBox").innerHTML = "";
  document.getElementById("UserSearchSelectBox").innerHTML = "";
  document.getElementById("FolderUserSelectBox").innerHTML = "";

  document.getElementById("folder_result_container").innerHTML = "";
  document.getElementById("order_result_container").innerHTML = "";
  document.getElementById("folder_result_grid").style.display = "none";

  document.getElementById("search_result_tbody").innerHTML = "";
  document.getElementById("search_result_grid").style.display = "none";
}

function UploadProcessTypeOnClicked() {
  var selectedApp = document.getElementById("app_upload");
  var unselectedApp1 = document.getElementById("app_search");
  var unselectedApp2 = document.getElementById("app_folder");

  selectedApp.classList.add("selected_app");
  selectedApp.classList.remove("unselect_upload");
  selectedApp.classList.add("select_upload");

  document.getElementById("app_upload_t").style.color = "#38bfdd";
  document.getElementById("app_search_t").style.color = "#4a4a4a";
  document.getElementById("app_folder_t").style.color = "#4a4a4a";

  unselectedApp1.classList.remove("selected_app");
  unselectedApp1.classList.remove("select_search");
  unselectedApp1.classList.add("unselect_search");

  unselectedApp2.classList.remove("selected_app");
  unselectedApp2.classList.remove("select_folder");
  unselectedApp2.classList.add("unselect_folder");

  document.getElementById("upload_process_button").style.display = "initial";
  document.getElementById("search_process_button").style.display = "none";
  document.getElementById("folder_process_button").style.display = "none";
}

function SearchProcessTypeOnClicked() {
  var selectedApp = document.getElementById("app_search");
  var unselectedApp1 = document.getElementById("app_upload");
  var unselectedApp2 = document.getElementById("app_folder");

  selectedApp.classList.add("selected_app");
  selectedApp.classList.remove("unselect_search");
  selectedApp.classList.add("select_search");

  document.getElementById("app_search_t").style.color = "#38bfdd";
  document.getElementById("app_upload_t").style.color = "#4a4a4a";
  document.getElementById("app_folder_t").style.color = "#4a4a4a";

  unselectedApp1.classList.remove("selected_app");
  unselectedApp1.classList.remove("select_upload");
  unselectedApp1.classList.add("unselect_upload");

  unselectedApp2.classList.remove("selected_app");
  unselectedApp2.classList.remove("select_folder");
  unselectedApp2.classList.add("unselect_folder");

  document.getElementById("upload_process_button").style.display = "none";
  document.getElementById("search_process_button").style.display = "initial";
  document.getElementById("folder_process_button").style.display = "none";
}

function FolderProcessTypeOnClicked() {
  var selectedApp = document.getElementById("app_folder");
  var unselectedApp1 = document.getElementById("app_search");
  var unselectedApp2 = document.getElementById("app_upload");

  selectedApp.classList.add("selected_app");
  selectedApp.classList.remove("unselect_folder");
  selectedApp.classList.add("select_folder");

  document.getElementById("app_folder_t").style.color = "#38bfdd";
  document.getElementById("app_search_t").style.color = "#4a4a4a";
  document.getElementById("app_upload_t").style.color = "#4a4a4a";

  unselectedApp1.classList.remove("selected_app");
  unselectedApp1.classList.remove("select_search");
  unselectedApp1.classList.add("unselect_search");

  unselectedApp2.classList.remove("selected_app");
  unselectedApp2.classList.remove("select_upload");
  unselectedApp2.classList.add("unselect_upload");

  document.getElementById("upload_process_button").style.display = "none";
  document.getElementById("search_process_button").style.display = "none";
  document.getElementById("folder_process_button").style.display = "initial";
}

function ShowUploadPage() {
  ShowLoading();
  cloudApi = new postDicomCloudApi(apiKey, accountKey);
  cloudApi.Initialize(function (result) {
    console.log(result);
    if (result.Success) {
      accountUserList = result.Account.UserList;
      document.getElementById("api_select_process_type_area").style.display =
        "none";

      document.getElementById("upload_container").style.display = "block";
      for (var i = 0; i < accountUserList.length; i++) {
        document.getElementById("UserSelectBox").innerHTML =
          document.getElementById("UserSelectBox").innerHTML +
          "<option value='&quot;" +
          accountUserList[i].UserUuid +
          "&quot;'>&quot;" +
          accountUserList[i].UserName +
          "&quot;</option>";
      }
      UserOnSelected();
    } else {
      document.getElementById("upload_container").style.display = "none";
    }
    HideLoading();
  });

  if (document.getElementById("progress_area_id").style.display == "block") {
    document.getElementById("upload_result_grid").style.animationName =
      "kill-animation";
  } else {
    document.getElementById("upload_result_grid").style.animationName =
      "showGrid";
  }
}

function ShowSearchPage() {
  ShowLoading();
  cloudApi = new postDicomCloudApi(apiKey, accountKey);
  cloudApi.Initialize(function (result) {
    console.log(result);
    if (result.Success) {
      accountUserList = result.Account.UserList;
      document.getElementById("api_select_process_type_area").style.display =
        "none";

      document.getElementById("search_container").style.display = "block";
      for (var i = 0; i < accountUserList.length; i++) {
        document.getElementById("UserSearchSelectBox").innerHTML =
          document.getElementById("UserSearchSelectBox").innerHTML +
          "<option value='&quot;" +
          accountUserList[i].UserUuid +
          "&quot;'>&quot;" +
          accountUserList[i].UserName +
          "&quot;</option>";
      }
      UserSearchOnSelected();
    }
    HideLoading();
  });
}

function ShowFolderPage() {
  ShowLoading();
  cloudApi = new postDicomCloudApi(apiKey, accountKey);
  cloudApi.Initialize(function (result) {
    console.log(result);
    if (result.Success) {
      accountUserList = result.Account.UserList;
      document.getElementById("api_select_process_type_area").style.display =
        "none";

      document.getElementById("folder_container").style.display = "block";
      for (var i = 0; i < accountUserList.length; i++) {
        document.getElementById("FolderUserSelectBox").innerHTML =
          document.getElementById("FolderUserSelectBox").innerHTML +
          "<option value='&quot;" +
          accountUserList[i].UserUuid +
          "&quot;'>&quot;" +
          accountUserList[i].UserName +
          "&quot;</option>";
      }
      FolderUserOnSelected();
    }
    HideLoading();
  });
}

function PatientOrderSearch() {
  var searchResultString = "";
  if (userUuid && institutionUuid) {
    ShowLoading();
    cloudApi.GetPatientOrderList(
      function (result) {
        console.log(result);
        if (result.Success == true) {
          for (i = 0; i < result.SearchResultList.length; ++i) {
            searchResultString +=
              `<tr>
                                                           <td>` +
              result.SearchResultList[i].PatientName +
              `</td>
                                                             <td>` +
              result.SearchResultList[i].OtherPatientId +
              `</td>
                                                             <td>` +
              result.SearchResultList[i].OrderModality +
              `</td>
                                                             <td>` +
              result.SearchResultList[i].PatientOrderUuid +
              `</td>
                                                             <td>` +
              result.SearchResultList[i].StudyDescription +
              `</td>
                                                             <td>` +
              result.SearchResultList[i].RequestingProcedureDescription +
              `</td>
                                                             <td style="min-width:180px;"><button class='table_button' onclick='GetViewUrl(&quot;` +
              result.SearchResultList[i].PatientOrderUuid +
              `&quot;)'>View</button>
                                                                 <button class='table_button' onclick='ShowAddDocumentForm(&quot;` +
              result.SearchResultList[i].PatientOrderUuid +
              `&quot;,&quot;` +
              result.SearchResultList[i].PatientName +
              `&quot;)'>Add Document</button></td>
                                                       </tr>`;
          }
          document.getElementById(
            "search_result_tbody"
          ).innerHTML = searchResultString;
          document.getElementById("search_result_grid").style.display = "block";
          HideLoading();
        } else {
          alert("Error while searching..");
          HideLoading();
        }
      },
      userUuid,
      [institutionUuid]
    );
  } else {
    alert("UserUuid and InstitutionUuid must be specified");
  }
}

var folderPath = "";
var selectedFolderParent = "";
function FolderSearchButtonOnClicked(selectedFolderUuid) {
  selectedFolderParent = selectedFolderUuid;
  if (selectedFolderUuid == "") {
    folderPath = "";
    document.getElementById("folder_path").innerHTML = folderPath;
  }
  if (userUuid) {
    var folderResultString = "";
    var orderResultString = "";
    ShowLoading();
    cloudApi.GetFolderList(userUuid, selectedFolderUuid, "", true, function (
      result
    ) {
      console.log(result);
      if (result.Success == true) {
        for (var i = 0; i < result.Folder.SubFolderList.length; i++) {
          var isShared = "";
          if (result.Folder.SubFolderList[i].IsShared) {
            isShared = " folder_unselect_shared";
          } else {
            isShared = " folder_unselect";
          }

          folderResultString +=
            `<div id="folderId_` +
            i +
            `" class="each_folder_container` +
            isShared +
            `" ondblclick='FolderOnDoubleClicked(&quot;` +
            result.Folder.SubFolderList[i].FolderUuid +
            `&quot;,&quot;` +
            result.Folder.SubFolderList[i].FolderName +
            `&quot;)'>
                                                            <div class="each_folder_name_class">
                                                             ` +
            result.Folder.SubFolderList[i].FolderName +
            `
                                                            </div>
                                                            <div class="each_folder_folder_description_class">
                                                             ` +
            result.Folder.SubFolderList[i].FolderDescription +
            `
                                                            </div>
                                                            <div class="each_folder_folder_counts_area_class">
                                                                <div class="each_counts_area_class" style="margin-left: 0px !important" title="Number of orders in current folder">
                                                                 ` +
            result.Folder.SubFolderList[i].OrderCount +
            `
                                                                </div>
                                                                <div class="each_counts_area_class" title="Number of orders in current folder and it's sub-folders">
                                                                 ` +
            result.Folder.SubFolderList[i].AllSubOrderCount +
            `
                                                                </div>
                                                                <div class="each_counts_area_class" title="Number of folders in current folder">
                                                                 ` +
            result.Folder.SubFolderList[i].SubFolderCount +
            `
                                                                </div>
                                                                <div class="each_counts_area_class" title="Number of folders in current folder and it's sub-folders">
                                                                 ` +
            result.Folder.SubFolderList[i].AllSubFolderCount +
            `
                                                                </div>
                                                            </div>
                                                       </div>`;
        }

        for (var j = 0; j < result.Folder.PatientOrderList.length; j++) {
          orderResultString +=
            `<div class="each_order_container_class unselect_order">
                                                            <div class="each_order_order_modality_class">
                                                                ` +
            result.Folder.PatientOrderList[j].OrderModality +
            `
                                                            </div>
                                                            <div class="each_order_patient_information_class" style="margin-top:10px;">
                                                                ` +
            result.Folder.PatientOrderList[j].PatientName +
            `
                                                            </div>
                                                            <div class="each_order_patient_information_class">
                                                                ` +
            result.Folder.PatientOrderList[j].OtherPatientId +
            `
                                                            </div>
                                                            <div class="each_order_patient_information_class">
                                                                ` +
            result.Folder.PatientOrderList[j].PerformedDatetime +
            `
                                                            </div>
                                                            <div class="each_order_patient_information_class">
                                                                ` +
            result.Folder.PatientOrderList[j].OrderSize +
            ` KB
                                                            </div>
                                                            <div class="each_order_order_counts_class">
                                                                <div class="patient_order_images_count_area_class" title="Number of dicom images">
                                                                    ` +
            result.Folder.PatientOrderList[j].ImagesCount +
            `
                                                                </div>
                                                                <div class="patient_order_documents_count_area_class" title="Number of documents">
                                                                    ` +
            result.Folder.PatientOrderList[j].DocumentsCount +
            `
                                                                </div>
                                                            </div>
                                                      </div>`;
        }

        document.getElementById(
          "folder_result_container"
        ).innerHTML = folderResultString;
        document.getElementById(
          "order_result_container"
        ).innerHTML = orderResultString;
        document.getElementById("folder_result_grid").style.display = "block";
        HideLoading();
      } else {
        alert("Unexpected error!");
        HideLoading();
      }
    });
  } else {
    alert("UserUuid must be specified");
    HideLoading();
  }
}

function ShowFolderCreateForm() {
  document.getElementById("folder_create_form_container").style.display =
    "block";
  document.getElementById("folder_create_name").value = "";
  //document.getElementById("folder_create_description").value = "";
}

function CloseFolderCreateForm() {
  document.getElementById("folder_create_form_container").style.display =
    "none";
}

function FolderOnDoubleClicked(selectedFolderUuid, selectedFolderName) {
  //folderPath += `<span onclick='FolderSearchButtonOnClicked(&quot;` + selectedFolderUuid + `&quot;)'> /` + selectedFolderName + `</span>`;
  folderPath =
    `<span style="color:inherit!important; text-decoration:inherit!important; cursor:default!important;">/.. /` +
    selectedFolderName +
    `</span>`;
  document.getElementById("folder_path").innerHTML = folderPath;
  FolderSearchButtonOnClicked(selectedFolderUuid);
}

function CreateFolder() {
  var folderName = "";
  var folderDescription = "";
  folderName = document.getElementById("folder_create_name").value;
  folderDescription = document.getElementById("folder_create_description")
    .value;
  ShowLoading();
  if (folderName != "") {
    cloudApi.CreateFolder(userUuid, selectedFolderParent, folderName, function (
      result
    ) {
      console.log(result);
      CloseFolderCreateForm();
      HideLoading();
      FolderSearchButtonOnClicked(selectedFolderParent);
    });
  } else {
    alert("Please fill the required parameter!");
    HideLoading();
  }
}

var selectedDicomResultList = null;
function SelectFiles(event, type) {
  ShowLoading();
  var fileCount = event.target.files.length;

  cloudApi.ReadDicomFiles(event.target.files, function (result) {
    selectedDicomResultList = result;
    var uploadResultString = "";

    if (result.Progress == 100) {
      for (var i = 0; i < result.StudyList.length; i++) {
        if (
          result.StudyList[i].ImageList.length > 0 &&
          result.StudyList[i].SeriesList.length > 0
        ) {
          uploadResultString +=
            `<tr>
                                                           <td>` +
            result.StudyList[i].PatientName +
            `</td>
                                                             <td>` +
            result.StudyList[i].Modality +
            `</td>
                                                             <td>` +
            result.StudyList[i].PatientId +
            `</td>
                                                             <td>` +
            result.StudyList[i].StudyDescription +
            `</td>
                                                             <td>` +
            result.StudyList[i].SeriesList.length +
            `</td>
                                                             <td>` +
            result.StudyList[i].ImageList.length +
            `</td>
                                                             <td style="min-width:240px;"><button class='table_button' onclick='UploadFilesDirectly(&quot;` +
            i +
            `&quot;)'>Upload</button>
                                                                 <button class='table_button' onclick='ShowAnonymizeForm(&quot;` +
            i +
            `&quot;)'>Anonymize and Upload</button></td>
                                                       </tr>`;
        }
      }
      document.getElementById(
        "upload_result_tbody"
      ).innerHTML = uploadResultString;
      document.getElementById("upload_result_grid").style.display = "block";
      HideLoading();
    }
  });

  if (type == 1) {
    document.getElementById("upload_file_count_text").innerText =
      fileCount + " file(s) selected";
  } else {
    document.getElementById("upload_folder_count_text").innerText =
      fileCount + " file(s) selected";
  }
}

function UploadFilesDirectly(resultIndex) {
  document.getElementById("progress_area_id").style.display = "block";
  var fileList = selectedDicomResultList.StudyList[resultIndex].FileList;

  cloudApi.UploadDicomFiles(userUuid, institutionUuid, fileList, function (
    progress
  ) {
    console.log(progress);

    if (progress.State == "Sending") {
      if (progress.Progress >= 100) {
        document.getElementById("progress_total_inner").style.width = 100 + "%";
        document.getElementById("progress_total_text").innerHTML =
          "Upload Completed";
      } else {
        document.getElementById("progress_total_inner").style.width =
          Math.round(progress.Progress) + "%";
        document.getElementById("progress_total_text").innerHTML =
          Math.round(progress.Progress).toString() + "%";
      }
    } else if (progress.State == "Reading") {
      if (progress.Progress >= 100) {
        document.getElementById("progress_inner").style.width = 100 + "%";
        document.getElementById("progress_text").innerHTML = "Read Completed";
      } else {
        document.getElementById("progress_inner").style.width =
          Math.round(progress.Progress) + "%";
        document.getElementById("progress_text").innerHTML =
          Math.round(progress.Progress).toString() + "%";
      }
    }

    if (progress.State == "File Upload Completed") {
      document.getElementById("progress_inner").style.width = 100 + "%";
      document.getElementById("progress_text").innerHTML = "Read Completed";
      document.getElementById("progress_total_inner").style.width = 100 + "%";
      document.getElementById("progress_total_text").innerHTML =
        "Upload Completed";
      document.getElementById("upload_container").style.height = "180px";
    }
  });
}

var selectedAnonimizedStudyIndex = 0;
function ShowAnonymizeForm(resultIndex) {
  selectedAnonimizedStudyIndex = resultIndex;
  var selectedStudy = selectedDicomResultList.StudyList[resultIndex];
  if (selectedStudy.TransferSyntaxUid == "") {
    alert(
      "Anonymization cannot be performed because there is no 'TransferSyntaxUID' value in the DICOM file."
    );
  } else {
    document.getElementById("anonymize_form_container").style.display = "block";

    document.getElementById("anonymize_patient_name_row").style.display =
      "block";
    document.getElementById("anonymize_patient_id_row").style.display = "block";
    document.getElementById("anonymize_patient_other_id_row").style.display =
      "block";
    document.getElementById("anonymize_accession_no_row").style.display =
      "block";
    document.getElementById("anonymize_study_date_row").style.display = "block";
    document.getElementById("anonymize_study_description_row").style.display =
      "block";
    document.getElementById("anonymize_institution_name_row").style.display =
      "block";

    if (selectedStudy.PatientName === undefined) {
      document.getElementById("anonymize_patient_name_row").style.display =
        "none";
    }
    if (selectedStudy.PatientId === undefined) {
      document.getElementById("anonymize_patient_id_row").style.display =
        "none";
    }
    if (selectedStudy.OtherPatientId === undefined) {
      document.getElementById("anonymize_patient_other_id_row").style.display =
        "none";
    }
    if (selectedStudy.AccessionNumber === undefined) {
      document.getElementById("anonymize_accession_no_row").style.display =
        "none";
    }
    if (selectedStudy.StudyDate === undefined) {
      document.getElementById("anonymize_study_date_row").style.display =
        "none";
    }
    if (selectedStudy.StudyDescription === undefined) {
      document.getElementById("anonymize_study_description_row").style.display =
        "none";
    }
    if (selectedStudy.InstitutionName === undefined) {
      document.getElementById("anonymize_institution_name_row").style.display =
        "none";
    }

    var dateArray = [];
    dateArray = selectedStudy.StudyDate.split("");
    var year = "";
    year = dateArray[0] + dateArray[1] + dateArray[2] + dateArray[3];
    var month = "";
    month = dateArray[4] + dateArray[5];
    var day = "";
    day = dateArray[6] + dateArray[7];

    document.getElementById("selected_study_patient_name").innerHTML =
      selectedStudy.PatientName;
    document.getElementById("selected_study_patient_id").innerHTML =
      selectedStudy.PatientId;
    document.getElementById("selected_study_patient_other_id").innerHTML =
      selectedStudy.OtherPatientId;
    document.getElementById("selected_study_accession_no").innerHTML =
      selectedStudy.AccessionNumber;
    document.getElementById("selected_study_study_date").innerHTML =
      selectedStudy.StudyDate;
    document.getElementById("selected_study_study_description").innerHTML =
      selectedStudy.StudyDescription;
    document.getElementById("selected_study_institution_name").innerHTML =
      selectedStudy.InstitutionName;

    document.getElementById("selected_study_patient_name_tb").value =
      selectedStudy.PatientName;
    document.getElementById("selected_study_patient_id_tb").value =
      selectedStudy.PatientId;
    document.getElementById("selected_study_patient_other_id_tb").value =
      selectedStudy.OtherPatientId;
    document.getElementById("selected_study_accession_no_tb").value =
      selectedStudy.AccessionNumber;
    document.getElementById("selected_study_study_date_tb").value =
      year + "-" + month + "-" + day;
    document.getElementById("selected_study_study_description_tb").value =
      selectedStudy.StudyDescription;
    document.getElementById("selected_study_institution_name_tb").value =
      selectedStudy.InstitutionName;
  }
}

var anonymousData = [];
function UploadFilesWithAnonymousValue() {
  var selectedStudy =
    selectedDicomResultList.StudyList[selectedAnonimizedStudyIndex];

  anonymousData = [];
  var patientName = document.getElementById("selected_study_patient_name_tb")
    .value;
  var patientId = document.getElementById("selected_study_patient_id_tb").value;
  var otherPatientId = document.getElementById(
    "selected_study_patient_other_id_tb"
  ).value;
  var accessionNumber = document.getElementById(
    "selected_study_accession_no_tb"
  ).value;
  var studyDate = document.getElementById("selected_study_study_date_tb").value;
  var studyDescription = document.getElementById(
    "selected_study_study_description_tb"
  ).value;
  var institutionName = document.getElementById(
    "selected_study_institution_name_tb"
  ).value;

  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.PatientName,
    Value: patientName,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.PatientId,
    Value: patientId,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.OtherPatientId,
    Value: otherPatientId,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.AccessionNumber,
    Value: accessionNumber,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.StudyDate,
    Value: studyDate,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.StudyDescription,
    Value: studyDescription,
  });
  anonymousData.push({
    Tag: cloudApi.DicomTagsEnum.InstitutionName,
    Value: institutionName,
  });

  cloudApi.UploadDicomFilesWithAnonymization(
    userUuid,
    institutionUuid,
    selectedStudy.FileList,
    anonymousData,
    function (progress) {
      document.getElementById("progress_area_id").style.display = "block";
      console.log(progress);
      CloseAnonymizeForm();

      if (progress.State == "Sending") {
        if (progress.Progress >= 100) {
          document.getElementById("progress_total_inner").style.width =
            100 + "%";
          document.getElementById("progress_total_text").innerHTML =
            "Upload Completed";
        } else {
          document.getElementById("progress_total_inner").style.width =
            Math.round(progress.Progress) + "%";
          document.getElementById("progress_total_text").innerHTML =
            Math.round(progress.Progress).toString() + "%";
        }
      } else if (progress.State == "Reading") {
        if (progress.Progress >= 100) {
          document.getElementById("progress_inner").style.width = 100 + "%";
          document.getElementById("progress_text").innerHTML = "Read Completed";
        } else {
          document.getElementById("progress_inner").style.width =
            Math.round(progress.Progress) + "%";
          document.getElementById("progress_text").innerHTML =
            Math.round(progress.Progress).toString() + "%";
        }
      }

      if (progress.State == "File Upload Completed") {
        document.getElementById("progress_inner").style.width = 100 + "%";
        document.getElementById("progress_text").innerHTML = "Read Completed";
        document.getElementById("progress_total_inner").style.width = 100 + "%";
        document.getElementById("progress_total_text").innerHTML =
          "Upload Completed";
        document.getElementById("upload_container").style.height = "180px";
      }
    }
  );
}

function CloseAnonymizeForm() {
  document.getElementById("anonymize_form_container").style.display = "none";
}

function GetViewUrl(patientOrderUuid) {
  cloudApi.GetViewUrl(userUuid, patientOrderUuid, function (progress) {
    var url = progress.Result;
    var iframe = document.getElementById("view_iframe");
    iframe.src = url;
    document.getElementById("view_url_text").innerHTML = url;
    ShowIframe();
  });
}

function ShowIframe() {
  document.getElementById("view_container").style.display = "block";
  document.getElementById("body").style.overflow = "hidden";
}

function HideIframe() {
  document.getElementById("view_container").style.display = "none";
  var iframe = document.getElementById("view_iframe");
  if (iframe) {
    iframe.src = "";
  }
  document.getElementById("view_url_text").innerHTML = "";
  document.getElementById("body").style.overflow = "";
}

function UserOnSelected() {
  document.getElementById("InstitutionSelectBox").innerHTML = "";
  userUuid = RemoveChar(document.getElementById("UserSelectBox").value);
  findInstutionList(userUuid);
}

function UserSearchOnSelected() {
  document.getElementById("InstitutionSearchSelectBox").innerHTML = "";
  userUuid = RemoveChar(document.getElementById("UserSearchSelectBox").value);
  findInstutionSearchList(userUuid);
}

function FolderUserOnSelected() {
  userUuid = RemoveChar(document.getElementById("FolderUserSelectBox").value);
}

function findInstutionSearchList(userUuid) {
  for (var i = 0; i < accountUserList.length; i++) {
    if (accountUserList[i].UserUuid == userUuid) {
      accountUserInstitutionList = accountUserList[i].InstitutionList;
      for (var j = 0; j < accountUserInstitutionList.length; j++) {
        document.getElementById("InstitutionSearchSelectBox").innerHTML =
          document.getElementById("InstitutionSearchSelectBox").innerHTML +
          "<option value='&quot;" +
          accountUserInstitutionList[j].InstitutionUuid +
          "&quot;'>&quot;" +
          accountUserInstitutionList[j].InstitutionName +
          "&quot;</option>";
      }
      InstitutionSearchOnSelected();
    }
  }
}

function findInstutionList(userUuid) {
  for (var i = 0; i < accountUserList.length; i++) {
    if (accountUserList[i].UserUuid == userUuid) {
      accountUserInstitutionList = accountUserList[i].InstitutionList;
      for (var j = 0; j < accountUserInstitutionList.length; j++) {
        document.getElementById("InstitutionSelectBox").innerHTML =
          document.getElementById("InstitutionSelectBox").innerHTML +
          "<option value='&quot;" +
          accountUserInstitutionList[j].InstitutionUuid +
          "&quot;'>&quot;" +
          accountUserInstitutionList[j].InstitutionName +
          "&quot;</option>";
      }
      InstitutionOnSelected();
    }
  }
}

function InstitutionOnSelected() {
  institutionUuid = RemoveChar(
    document.getElementById("InstitutionSelectBox").value
  );
}

function InstitutionSearchOnSelected() {
  institutionUuid = RemoveChar(
    document.getElementById("InstitutionSearchSelectBox").value
  );
}

function RemoveChar(text) {
  return text.replace('"', "").replace('"', "");
}

function ShowAddDocumentForm(patientOrderUuid, patientName) {
  selectedPatientOrderUuid = patientOrderUuid;
  document.getElementById("add_document_header_text").innerHTML =
    'Add Document to "' + patientName + '"';
  document.getElementById("add_document_form").style.display = "block";
  document.getElementById("document_progress_inner").style.width = "0%";
  document.getElementById("document_progress_text").innerHTML = "0%";
  document.getElementById("document_progress_description").innerHTML =
    "Please select files(.pdf, .mp4, .jpeg, .jpg, .png)";
}

function CloseAddDocumentForm() {
  selectedPatientOrderUuid = null;
  document.getElementById("add_document_form").style.display = "none";
}

function SelectDocumentFileInputOnChanged(event) {
  if (selectedPatientOrderUuid) {
    cloudApi.UploadDocumentFiles(
      userUuid,
      institutionUuid,
      selectedPatientOrderUuid,
      event.target.files,
      function (result) {
        document.getElementById("document_progress_inner").style.width =
          result.Progress + "%";
        document.getElementById("document_progress_text").innerHTML =
          Math.round(result.Progress).toString() + "%";
        document.getElementById("document_progress_description").innerHTML =
          result.State;
      }
    );
  } else {
    document.getElementById("document_progress_description").innerHTML =
      "Please select order!";
  }
}

function ShowLoading() {
  document.getElementById("loading_container").style.display = "block";
}

function HideLoading() {
  document.getElementById("loading_container").style.display = "none";
}
