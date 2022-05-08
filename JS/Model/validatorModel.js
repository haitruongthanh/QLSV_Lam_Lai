var ValidatorSv = function () {
  this.kiemTraRong = function (idTarget, idError, errorMessage) {
    var valueTarget = document.getElementById(idTarget).value.trim();

    //valueTarget =  <=> !valueTarget
    if (!valueTarget) {
      document.getElementById(idError).innerText = errorMessage;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  };

  this.kiemTraIdHopLe = function (sinhVienThemMoi, danhSachSinhVien) {
    var viTriTrungMaSV = danhSachSinhVien.findIndex(function (item) {
      return item.maSV == sinhVienThemMoi.maSV;
    });
    if (viTriTrungMaSV == -1) {
      document.getElementById("spanMaSV").innerHTML = "";
      return true;
    }
    document.getElementById("spanMaSV").innerHTML =
      "Mã Sinh viên đã tồn tại, vui lòng nhập lại";
    return false;
  };

  this.kiemTraEmailHopLe = function (idTarget, idError) {
    var patern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var valueInput = document.getElementById(idTarget).value;
    if (patern.test(valueInput)) {
      document.getElementById(idError).innerText = "";
      return true;
    }
    document.getElementById(idError).innerText = "Email không hợp lệ";
    return false;
  };

  this.kiemTraTenHopLe = function (idTarget, idError) {
    var letters =
      /^[a-zA-Z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/;

    var valueInput = document.getElementById(idTarget).value;
    if (letters.test(valueInput)) {
      document.getElementById(idError).innerText = "";
      return true;
    }
    console.log("kiem tra ten", letters.test(valueInput));
    document.getElementById(idError).innerText = "Tên không hợp lệ";
    return false;
  };
  this.kiemTraDiem = function (idTarget, idError) {
    var number = /^[0-9]+$/;
    var valueInput = document.getElementById(idTarget).value;
    if (number.test(valueInput)) {
      document.getElementById(idError).innerText = "";
      return true;
    }
    document.getElementById(idError).innerText = "Tên không hợp lệ";
    return false;
  };
};
