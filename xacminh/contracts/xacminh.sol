// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.2;
pragma experimental ABIEncoderV2;
contract xacminh {
  // Khai báo biến và ánh xạ
  address private owner; // Địa chỉ của chủ sở hữu hợp đồng (trường đại học)
  mapping(bytes32 => bool) studentAdded; // Lưu trữ địa chỉ đã thêm sinh viên
  mapping(bytes32 => Student) students; // Lưu trữ danh sách sinh viên đã được thêm
  mapping(bytes32 => address) verifiedAddresses; // Lưu trữ địa chỉ đã thực hiện xác thực
  mapping(bytes32 => address) lookupAddresses; // Lưu trữ địa chỉ đã tra cứu

  // Cấu trúc thông tin sinh viên
  struct Student {
    string truong; // Tên trường
    string msvv; // Mã số sinh viên
    string bang; // Bằng cấp
    string fullName; // Họ và tên
    string ngaySinh; // Ngày sinh
    string nganh; // Ngành học
    string nam; // Năm sinh
    string loai; // Loại bằng cấp
    string hinhThuc; // Hình thức đào tạo
    string soHieu; // Số hiệu sinh viên
    string ht; // Hiệu trưởng trường
  }

  // Kiểm tra người gọi có phải chủ sở hữu không
  modifier isOwner() {
    require(msg.sender == owner, "Nguoi goi khong phai chu so huu");
    _;
  }

  // Hàm khởi tạo để thiết lập người triển khai hợp đồng làm chủ sở hữu
  constructor() public {
    owner = msg.sender;
  }

  // Hàm tạo hash từ các thông tin sinh viên
  function generateHash(Student memory student) private pure returns (bytes32) {
    return keccak256(abi.encode(student.truong, student.msvv, student.bang, student.fullName, student.ngaySinh, student.nganh, student.nam, student.loai, student.hinhThuc, student.soHieu));
  }

  // Hàm thêm sinh viên (chỉ trường đại học có thể truy cập)
  function addStudent(Student memory student) public isOwner {
    bytes32 hash = generateHash(student);
    require(!studentAdded[hash], "Sinh vien da duoc them");
    students[hash] = student;
    studentAdded[hash] = true;
  }

  // Hàm xác minh tính hợp lệ của sinh viên (bất kỳ ai cũng có thể truy cập)
  function verifyStudent(Student memory student) public view returns (bool) {
    bytes32 hash = generateHash(student);
    return studentAdded[hash];
  }

  // Hàm xác thực bằng cấp (chỉ trường đại học có thể truy cập)
  function verifyDiploma(Student memory student, address verifier) public isOwner {
    bytes32 hash = generateHash(student);
    require(studentAdded[hash], "sinh vien chua duoc them");
    verifiedAddresses[hash] = verifier;
  }

  // Hàm kiểm tra xác thực bằng cấp (bất kỳ ai cũng có thể truy cập)
  function checkDiplomaVerification(Student memory student) public view returns (bool, address) {
    bytes32 hash = generateHash(student);
    return (studentAdded[hash], verifiedAddresses[hash]);
  }

  // Hàm lưu trữ địa chỉ tra cứu (bất kỳ ai cũng có thể truy cập)
  function recordLookupAddress(Student memory student, address lookupAddress) public {
    bytes32 hash = generateHash(student);
    lookupAddresses[hash] = lookupAddress;
  }

  // Hàm lấy địa chỉ tra cứu (bất kỳ ai cũng có thể truy cập)
  function getLookupAddress(Student memory student) public view returns (address) {
    bytes32 hash = generateHash(student);
    return lookupAddresses[hash];
  }

  // Hàm trả về địa chỉ của chủ sở hữu hợp đồng (trường đại học)
  function getOwner() external view returns (address) {
    return owner;
  }
}
