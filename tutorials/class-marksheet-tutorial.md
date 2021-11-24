Đây là tutorial mô tả chức năng và hoạt động của các hàm và biến theo từng bước, được chia thành 3 phần.

Phần 1 - Tạo HTML với một số Elements cần thiết (form, buttons,...), sử dụng Bootstrap và Boostrap Icons

Phần 2 - Tạo một service giả API có đầy đủ các chức năng: đọc, thêm, sửa, xóa (từ dòng 1 - 124)
1. Tạo một class làm template cho data tên là TestScore với 4 properties name, mathScore, physicalScore, chemistryScore.
2. Khỏi tạo data students là [] để chứa những student object con.
2. Khởi tạo một function closure để tạo ID cho mỗi student object mỗi khi object này được thêm vào data students.
3. Khai báo funtion getStudents() và getStudentById() để lấy data.
4. Khai báo function addStudent() để thêm student object mới vào data.
5. Khai báo function updateStudent() để cập nhật student object dã tồn tại trong data.
6. Khai báo function deleteStudent() để xóa một student object dã tồn tại trong data.
7. Khai báo function formatScore() để format lại định dạng số cho phù hợp, dùng để hỗ trợ 2 functions addStudent() và updateStudent().
8. Khai báo function seeds() để tự động thêm 9 object có sẵn vào data, sử dụng để test.

Phần 3 - Thao tác trên DOM (từ dòng 131 - 516)
1. Khởi tạo một object config chứa các properties với giá trị là nội dung động và các class động của trang. Giúp dễ thay đổi nội dung trang.
2. Chèn một số nọi dung dộng cho một số element.
3. Invoke function updateTable() dể ẩn bảng khi chưa có data. 
4. Gán sự kiện cho các nút bấm và form.
5. Khai báo function setNotify() đế set nội dung default cho các thông báo nằm bên dưới mỗi input.
6. Khai báo function formReset() để reset lại các input cũng như các thông báo trong form mỗi khi submit thành công.
7. Khai báo validateForm() làm một trung gian để nhận vào list nhiều input, sau đó dùng validateInput để validate từng input.
8. Khai báo validateInput() để validate từng input, sau đó chèn notify nếu validate thành công hay thất bại.
9. Khai báo validateScores() nhận vào một list các number hoặc number dạng string để validate nếu danh sách là danh sách điểm số hợp lệ.
10. Khai báo addSuccessMessage() để chèn nội dung và style cho notify(bên dưới input) khi validate thành công.
11. Khai báo addErrorMessage() để chèn nội dung và style cho notify(bên dưới input) khi validate thất bại.
12. Khai báo toggleShowScoreAverage() cho sự kiện mà user click vào nút 'Tính điểm trung bình', sau đó invoke function toggleCalculateAverage để tính và chèn điểm trung bình vào mỗi row.
13. Khai báo toggleCalculateAverage() để tính toán điểm trung bình và chèn vào row.
14. Khai báo addErrorMessage() để chèn nội dung và style cho notify(bên dưới input) khi validate thất bại.
15. Khai báo toggleFindExellent() cho sự kiện mà user click vào nút 'Xác định học sinh giỏi', sau đó invoke function markRow để đánh dấu row có học sinh giỏi.
16. Khai báo markRow() để so sánh điểm trung bình, nếu >= 8 nghĩa là học sinh giỏi, sau đó dánh dấu row có học sinh giỏi này.
17. Khai báo toggleBtnText() để toggle thay đổi text trong button.
18. Khai báo updateTable() để cập nhật dữ liệu và thêm row vào table body, dùng khi thêm hoặc xóa data dể refresh bảng.
19. Khai báo addTableRows() dùng trong function updateTable() để chèn row vào table body cũng như thêm sự kiện click cho row.
20. Khai báo addEventToRow() dùng trong function addTableRows() để chèn sự kiện click cho row.
21. Khai báo openEditingForm() để cho phép user edit dữ liệu trực tiếp trên row.
22. Khai báo closeEditingForm() để tắt chức năng edit dữ liệu trực tiếp trên row.
23. Khai báo replaceButton() để chuyển đổi hiển thị giữa 2 button.
24. Khai báo saveEditingForm() để lưu dữ liệu vào data.
25. Khai báo deleteRow() để xóa row và xóa dữ liệu khỏi data, sau đó refresh lại bảng.