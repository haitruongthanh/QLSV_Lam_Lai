/* 
1.  Tạo folder Model
    Tạo file SinhVienModel.js --> chứa construction SinhVien
    Tạo file ValidatorSv.js --> chứa construction Validator kiểm tra rỗng
      Trong file Validator, tạo các function kiểm tra hợp lệ của các trường input, trong đó
        Id: kiểm tra id rỗng, và kiểm tra id trùng
        Email: kiểm tra email rỗng và kiểm tra email hợp lệ với regex
        Tên: kiểm tra tên rỗng và tên là ký tự chữ
        Điểm: kiểm tra rỗng và điểm là ký tự số

2.  Tạo folder Controller
    Tạo file SinhVienController.js --> chứa hàm thực hiện nghiệp vụ
        Hàm layThongTinTuForm() --> lấy thông tin từ các ô input, lưu vào các biến. Các biến này này đối số của đối tượng SinhVien.
        Tạo instante của SinhVien
        var sinhVien = new SinhVien(thông tin lấy từ form);
        Hàm trả về đối tượng sinhVien


    
3.  Tạo file main.js --> Chứa luồn chính của file QuanLySinhVien
        Tạo một mảng lưu danh sách các đối tượng Sinh Viên. Mục đích, đối tượng sau khi thêm mới sẽ được lưu vào mảng này và dễ dàng trong việc tìm kiếm sinh viên thông qua các hàm của Mảng.

        Yêu cầu: mã sinh viên không được nhập trùng --> sử dụng findIndex() để tìm vị trí mà có 2 mã trùng nhau. Ý tưởng: trùng trả về vị trí, không trùng trả về -1, nếu trả về -1 thì cho nhập, khác -1 thì in ra thông báo đã tồn tại mã.

        Yêu cầu: các trường nhập vào không được rỗng. Thực hiện: tạo đối tượng validatorSV thuộc folder Model

        Yêu cầu: lưu danh sách nhập được vào local Storage
*/

var danhSachSinhVien = [];
var validatorSV = new ValidatorSv();
var DSSV_localStorage = "DSSV_localStorage";
var isValid = true;

var timKiemViTri = function (id, array) {
  return array.findIndex(function (sv) {
    return sv.maSV == id;
  });
};

var luuLocalStorage = function () {
  var dssvJson = JSON.stringify(danhSachSinhVien);
  localStorage.setItem(DSSV_localStorage, dssvJson);
};

var dssvJson = localStorage.getItem(DSSV_localStorage);

if (dssvJson) {
  danhSachSinhVien = JSON.parse(dssvJson);
  //lấy thông tin danhSachSinhVien từ local map với danhSachSinhVien hiện tại để lấy dữ liệu làm tham số cho function tinhDiemTrungBinh.
  //Nguyên nhân do khi lưu local, các function không được lưu lại
  danhSachSinhVien = danhSachSinhVien.map(function (item) {
    return new SinhVien(
      item.maSV,
      item.tenSV,
      item.emailSV,
      item.diemToan,
      item.diemLy,
      item.diemHoa
    );
  });
  xuatThongTinVaoBang(danhSachSinhVien);
}

function themSinhVien() {
  var sinhVienThemMoi = layThongTinTuForm();

  //validator các input
  var isValidMaSV =
    validatorSV.kiemTraRong(
      "txtMaSV",
      "spanMaSV",
      "Mã Sinh Viên không được để trống"
    ) && validatorSV.kiemTraIdHopLe(sinhVienThemMoi, danhSachSinhVien);

  var isValidEmail =
    validatorSV.kiemTraRong(
      "txtEmail",
      "spanEmailSV",
      "Email Sinh Viên không được để trống"
    ) && validatorSV.kiemTraEmailHopLe("txtEmail", "spanEmailSV");

  var isValidTen =
    validatorSV.kiemTraRong(
      "txtTenSV",
      "spanTenSV",
      "Tên Sinh Viên không được để trống"
    ) && validatorSV.kiemTraTenHopLe("txtTenSV", "spanTenSV");

  var idValidDiem =
    validatorSV.kiemTraRong(
      "txtDiemToan",
      "spanToan",
      "Điểm Toán không được để trống"
    ) &&
    validatorSV.kiemTraRong(
      "txtDiemLy",
      "spanLy",
      "Điểm Lý không được để trống"
    ) &&
    validatorSV.kiemTraRong(
      "txtDiemHoa",
      "spanHoa",
      "Điểm Hóa không được để trống"
    ) &&
    validatorSV.kiemTraDiem("txtDiemToan", "spanToan") &&
    validatorSV.kiemTraDiem("txtDiemLy", "spanLy") &&
    validatorSV.kiemTraDiem("txtDiemHoa", "spanHoa");

  isValid = isValidMaSV && isValidEmail && isValidTen && idValidDiem;

  if (isValid) {
    danhSachSinhVien.push(sinhVienThemMoi);
    luuLocalStorage();
    xuatThongTinVaoBang(danhSachSinhVien);
  }
}

function xoaSinhVien(id) {
  var viTri = timKiemViTri(id, danhSachSinhVien);
  //   console.log("vi tri xoaSinhVien", viTri);
  danhSachSinhVien.splice(viTri, 1);
  xuatThongTinVaoBang(danhSachSinhVien);
  luuLocalStorage();
}

function suaSinhVien(id) {
  var viTri = timKiemViTri(id, danhSachSinhVien);
  var sinhVien = danhSachSinhVien[viTri];
  //   console.log("vi tri sua", viTri);
  xuatThongTinLenForm(sinhVien);
}

function capNhatSinhVien() {
  var sinhVienEdit = layThongTinTuForm();
  var viTri = timKiemViTri(sinhVienEdit.maSV, danhSachSinhVien);
  //   console.log("vi trí", viTri);
  danhSachSinhVien[viTri] = sinhVienEdit;
  xuatThongTinVaoBang(danhSachSinhVien);
  luuLocalStorage();
}

function timSinhVien() {
  var tenSinhVienCanTim = document.getElementById("txtSearch").value.trim();
  var danhSachSinhVienTimKiem = [];

  var sinhVienTimThay = danhSachSinhVien.filter(function (item) {
    return item.tenSV.toUpperCase().includes(tenSinhVienCanTim.toUpperCase());
  });
  danhSachSinhVienTimKiem.push(sinhVienTimThay);
  /* var dssvtkJson = JSON.stringify(danhSachSinhVienTimKiem);
  localStorage.setItem("DSSVTK_localStorage", dssvtkJson);
  
  dssvtkJson = localStorage.getItem("DSSVTK_localStorage");

  if (dssvtkJson) {
    danhSachSinhVienTimKiem = JSON.parse(dssvtkJson);
    danhSachSinhVienTimKiem = danhSachSinhVienTimKiem.map(function (item) {
      return new SinhVien(
        item.maSV,
        item.tenSV,
        item.emailSV,
        item.diemToan,
        item.diemLy,
        item.diemHoa
      );
    });
    xuatThongTinVaoBang(danhSachSinhVienTimKiem);
  } */
  xuatThongTinVaoBang(danhSachSinhVienTimKiem);
}

function resetForm() {
  document.getElementById("formQLSV").reset();
}
