Các chức năng của final project:

-   Login(done)
-   Logout(done)
-   User List
-   Create new user
-   Update user
-   Delete user
-   Paging
-   Sorting
-   Filter

    User:

    -   ID : string
    -   First name : string
    -   Last name : string
    -   Address : string
    -   Age : number
    -   Department : string

1. Login page

-   validate form:

    -   bắt nhập đầy đủ thông tin, thiếu 1 trong 2 field thì hiện message thông báo (done)
    -   nếu account không đúng => hiện message thông báo(done)
    -   check thông tin username và password, nếu thông tin trùng với account mà ta có => set token vào local storage, redirect đến home page(done)
    -   nếu login thành công => đổi text từ login qua logout (done)
    -   nếu user đổi url trên trình duyệt sang /login => redirect về trang home(done)

    {key : userToken, value : "4G02zBeVAt2GMF5aV0P77PeDxoIGKpQhquQkohHcVfQPbVvPkisHs2qAkyq1lcq6"}

2. User List

-   gọi api get ra list user(axios)
-   hiển thị list user lên giao diện

3. xóa user

-   click button delete => hiển thị popover để hỏi user có chắc chắn
    muốn xóa không

    -   bấm ok => xóa
    -   cancel => ko xóa

-   scss
-   js
-   axios
-   react bootstrap, bootstrap
-   jsx
-   style module scss
-   axios
-   redux, react redux, redux toolkit, redux dev tools
-   create react app
-   react bootstrap, bootstrap / antd design, tailwincss / MUI
-   react router
-   Formik, yup, pure process
-   local storage
-   json-server
-   npm, yarn, nvm
-   cách dùng các đơn vị phổ biến trong css
